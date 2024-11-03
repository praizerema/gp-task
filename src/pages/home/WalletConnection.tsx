import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { Button } from "../../components";
import { _copyToClipboard, showToast } from "../../utils";
import { CopyIcon } from "../../assets";

export const WalletConnection = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      globalThis.localStorage.setItem("wallet-number", accounts?.[0] as string);
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("Failed to connect..", err);
      showToast("Failed to connect..", "error");
    }
  };
  return (
    <div className="col-span-12 lg:col-span-4 bg-white/70 rounded-3xl border p-8 overflow-hidden h-52">
      <Button text="Connect Your Wallet" onClick={connect} className="btn-gp" />
      <div className="mt-5 text-gray-700">
        {connected && (
          <>
            {chainId && `Wallet Chain: ${chainId}`}

            <div className="flex gap-x-2 mt-3">
              {account && `Wallet Account: ${account.slice(0, 12)}...`}
              <span
                onClick={() => _copyToClipboard(account as string)}
                className="cursor-pointer"
              >
                <CopyIcon />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
