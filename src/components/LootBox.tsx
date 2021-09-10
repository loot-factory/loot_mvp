import "./LootBox.css";

import React, { useEffect, useState } from "react";

type PROPS = {
  tokenId: number;
  fetcher: (tokenId: number, cb: (meta: string) => void) => void;
  newToken?: () => void;
  mint: (tokenId: number) => void;
  disableText?: string;
};

type OSMTT = {
  trait_type: string;
  value: number;
};

type OSM = {
  image: string;
  attributes: OSMTT[];
};

function LootBox({
  tokenId,
  fetcher,
  newToken,
  mint,
  disableText,
}: PROPS): JSX.Element {
  const [metaJson, setMetaJson] = useState({} as OSM);

  useEffect(() => {
    const setMetaData = (meta: string): void => {
      const clearText = Buffer.from(meta, "base64").toString("ascii");
      setMetaJson(JSON.parse(clearText));
    };
    fetcher(tokenId, setMetaData);
    //Cleanup
    return () => {};
  }, [fetcher, tokenId]);

  return (
    <div className="lb_container">
      {metaJson.image ? (
        <>
          <div>{tokenId >= 20000 ? "WALLET MINT" : "FREE MINT"}</div>
          <img alt={tokenId.toString()} src={metaJson.image} />
          <div className="lb_control">
            <div>
              {metaJson.attributes[7].trait_type} :{" "}
              {metaJson.attributes[7].value}
            </div>
            {disableText ? (
              disableText
            ) : (
              <button
                className="lb_button LOOT_BTN"
                onClick={() => mint(tokenId)}
              >
                Mint
              </button>
            )}
            {tokenId < 20000 && (
              <button className="lb_button LOOT_BTN" onClick={newToken}>
                {tokenId} (reload)
              </button>
            )}
          </div>
        </>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}

export { LootBox };
