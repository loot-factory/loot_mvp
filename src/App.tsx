import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { LootBox } from "./components/LootBox";
import { lootAbi } from "./abi/lootmvp";

interface IAppState {
  fetching: boolean;
  address: string;
  provider?: ethers.providers.Web3Provider;
  connected: boolean;
  chainId: number;
  networkName: string;
  showModal: boolean;
  pendingRequest: boolean;
  result: any | null;
  contract?: ethers.Contract;
  mintedToken: number[];
  walletToken: number;
  nextToken: number;
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: "",
  connected: false,
  chainId: 1,
  networkName: "mainnet",
  showModal: false,
  pendingRequest: false,
  result: null,
  mintedToken: [],
  walletToken: 0,
  nextToken: 0,
};

class App extends Component {
  web3Modal: Web3Modal;
  state: IAppState;
  walletMeta?: string;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };

    this.web3Modal = new Web3Modal({
      network: this.state.networkName || "mainnet",
      cacheProvider: true,
      providerOptions: this.getProviderOptions(),
    });
  }

  async componentDidMount() {
    this.setState({ nextToken: this._getNextRandom() });
    await this.setup();
  }

  subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }

    provider.on("close", () => {
      this.resetApp(false);
    });

    provider.on("disconnect", () => {
      this.resetApp(false);
    });

    provider.on("accountsChanged", async (accounts: string[]) => {
      if (accounts[0] !== this.state.address) {
        this.setState({ address: ethers.utils.getAddress(accounts[0]) });
      }
    });

    provider.on("chainChanged", async (chainId: number) => {
      this.resetApp(false);
      await this.setup();
    });

    provider.on("networkChanged", async () => {
      if (this.state.provider) {
        const network = await this.state.provider.getNetwork();
        if (network.chainId !== this.state.chainId) {
          this.setState({
            chainId: network.chainId,
            networkName: network.name,
          });
        }
      }
    });
  };

  getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID,
        },
      },
    };
    return providerOptions;
  };

  setup = async () => {
    const web3Provider = await this.web3Modal.connect();
    await this.subscribeProvider(web3Provider);
    const provider = new ethers.providers.Web3Provider(web3Provider);

    const accounts = await provider.listAccounts();
    const address = ethers.utils.getAddress(accounts[0]);
    const network = await provider.getNetwork();
    const chainId = network.chainId;
    const networkName = network.name;

    const contract = new ethers.Contract(
      "0xd6a4e574a3cfd9d50143085d84b9176fe4b80c94",
      lootAbi,
      provider.getSigner(0)
    );

    await this.setState({
      provider,
      connected: true,
      address,
      chainId,
      networkName,
      contract,
    });
    this._fillMintedToken(address, contract);
  };

  resetApp = async (clearCache: boolean) => {
    this.state.provider?.removeAllListeners();
    if (clearCache) {
      await this.web3Modal.clearCachedProvider();
    }
    this.setState({ ...INITIAL_STATE });
  };

  _shortAddress(): string {
    const { address, networkName } = this.state;
    return address !== ""
      ? address.substring(0, 6) +
          "..." +
          address.substring(address.length - 4, address.length) +
          " (" +
          networkName +
          ")"
      : "CONNECT WALLET";
  }

  _fetcher = async (tokenId: number, cb: (meta: string) => void) => {
    if (tokenId === 20000 && this.walletMeta) {
      cb(this.walletMeta);
    } else if (this.state.contract) {
      const meta = (await this.state.contract.tokenURI(tokenId)).substr(29);
      if (tokenId === 0) {
        this.walletMeta = meta;
      }
      cb(meta);
    }
  };

  _getNextRandom = (): number => {
    const minted = window.localStorage
      .getItem("mintedCustom")
      ?.split(",")
      .map((i) => parseInt(i));
    const all: number[] = [];
    let mintedPos = 0;
    for (let i = 0; i < 7778; ++i) {
      if (!minted || minted[mintedPos] !== i) {
        all.push(i);
      } else {
        ++mintedPos;
      }
    }
    return 10000 + all[Math.floor(Math.random() * all.length)];
  };

  async _fillMintedToken(address: string, contract: ethers.Contract) {
    const mt = [];
    let walletToken = 0;

    if (contract) {
      try {
        const num = (await contract.balanceOf(address)).toNumber();
        for (let i = 0; i < num; ++i) {
          mt.push((await contract.tokenOfOwnerByIndex(address, i)).toNumber());
          if (mt[mt.length - 1] >= 20000) walletToken = mt[mt.length - 1];
        }
      } catch (e) {
        console.log(e);
      }
    }
    this.setState({ mintedToken: mt, walletToken });
  }

  async _mint(tokenId: number) {
    const { contract, address } = this.state;
    if (contract) {
      if (tokenId === 20000) {
        await contract.walletClaim(address);
      } else {
        await contract.customClaim(tokenId);
      }
    }
  }

  render() {
    const { connected, mintedToken, walletToken, nextToken } = this.state;
    return (
      <div className="App">
        <div className="App-nav">
          <button
            className="App-connect LOOT_BTN"
            onClick={connected ? () => this.resetApp(true) : () => this.setup()}
          >
            {this._shortAddress()}
          </button>
        </div>
        <header className="App-header">
          <LootBox
            tokenId={connected ? 20000 : 0}
            fetcher={this._fetcher}
            disableText={walletToken ? "TokenId: " + walletToken : undefined}
            mint={this._mint.bind(this)}
          />
          <img src={logo} className="App-logo" alt="logo" />
          <LootBox
            tokenId={connected ? nextToken : 0}
            fetcher={this._fetcher}
            disableText={mintedToken.length >= 5 ? "You minted Max" : undefined}
            newToken={() => {
              this.setState({ nextToken: this._getNextRandom() });
            }}
            mint={this._mint.bind(this)}
          />
        </header>
      </div>
    );
  }
}

export default App;
