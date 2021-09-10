import React, { Component } from 'react';
import logo  from './logo.png';
import './App.css';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { LootBox } from './components/LootBox';

const lootAbi = [{"inputs":[{"internalType":"address","name":"proxyRegistryAddress_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"}],"name":"OperatorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"addOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"customClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getKeys","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"keyId","type":"uint256"}],"name":"getList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"lootClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxyRegistryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenValues","outputs":[{"internalType":"uint256[6][7]","name":"values","type":"uint256[6][7]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"walletClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}];

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
  networkName: 'mainnet',
  showModal: false,
  pendingRequest: false,
  result: null,
  mintedToken: [],
  walletToken: 0,
  nextToken: 0
};

class App extends Component {
  web3Modal: Web3Modal;
  state: IAppState;
  walletMeta?: string;
  
  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };

    this.web3Modal = new Web3Modal({
      network: this.state.networkName || 'mainnet',
      cacheProvider: true,
      providerOptions: this.getProviderOptions()
    });
  }

  async componentDidMount() {
    this.setState({nextToken: this._getNextRandom()})
    await this.setup()
  }
  
  subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }

    provider.on('close', () => {
      this.resetApp(false);
    });

    provider.on('disconnect', () => {
      this.resetApp(false);
    });

    provider.on('accountsChanged', async (accounts: string[]) => {
      if (accounts[0] !== this.state.address) {
        this.setState({address : ethers.utils.getAddress(accounts[0])});
      }
    });

    provider.on('chainChanged', async (chainId: number) => {
      this.resetApp(false);
      await this.setup();
    });

    provider.on('networkChanged', async () => {
      if (this.state.provider) {
        const network = await this.state.provider.getNetwork();
        if (network.chainId !== this.state.chainId) {
          this.setState({chainId: network.chainId, networkName: network.name})
        }
      }
    });
  };
  
  getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      }
    }
    return providerOptions
  }
  
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
      provider
    );

    await this.setState({
      provider,
      connected: true,
      address,
      chainId,
      networkName,
      contract
    });
  }

  resetApp = async (clearCache: boolean) => {
    this.state.provider?.removeAllListeners();
    if (clearCache) {
      await this.web3Modal.clearCachedProvider();
    }
    this.setState({ ...INITIAL_STATE });
  };

  _shortAddress(): string {
    const { address, networkName } = this.state;
    return address !== ''
      ? address.substring(0, 6) +
          '...' +
          address.substring(address.length - 4, address.length) +
          ' (' +
          networkName +
          ')'
      : 'CONNECT WALLET';
  }

  _fetcher = async (tokenId: number, cb: (meta:string)=>void) => {
    if (tokenId === 20000 && this.walletMeta) {
      cb(this.walletMeta);
    } else if (this.state.contract) {
      const meta = (await this.state.contract.tokenURI(tokenId)).substr(29);
      if (tokenId === 0) {
        this.walletMeta = meta;
      }
      cb(meta);
    }
  }
  
  _getNextRandom = () : number => {
    const minted = window.localStorage.getItem('mintedCustom')?.split(',').map((i) => parseInt(i));
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
  }

  async _fillMintedToken() {
    const { contract, address } = this.state;
    const mt = [];
    let walletToken = 0;

    if (contract) {
      try {
        for(let i = 0; i < 10; ++i) {
          mt.push((await contract.tokenOfOwnerByIndex(address, i)).toNumber());
          if (mt[mt.length - 1] >= 20000)
            walletToken = mt[mt.length - 1];
        }
      } catch(e) {}
    }
    this.setState({mintedToken: mt, walletToken});
  }

  render() {
    const {connected, mintedToken, walletToken, nextToken } = this.state; 
    return (
      <div className="App">
        <div className="App-nav">
          <button
            className = "App-connect LOOT_BTN"
            onClick = {connected ? () => this.resetApp(true) : () => this.setup()}
          >
            {this._shortAddress()}
          </button>
        </div>
        <header className="App-header">
          <LootBox
            tokenId={connected ? 20000 : 0}
            fetcher={this._fetcher}
            disableText={walletToken ? 'TokenId: ' + walletToken : undefined}
          />
          <img src={logo} className="App-logo" alt="logo" />
          <LootBox
            tokenId={connected ? nextToken : 0}
            fetcher={this._fetcher}
            disableText = {mintedToken.length >= 5 ? 'You minted Max' : undefined}
            newToken = {()=>{this.setState({nextToken: this._getNextRandom()})}}
          />
        </header>
      </div>
    );
  }
}

export default App;
