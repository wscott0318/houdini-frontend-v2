import { useState } from "react";
import { MaxUint256 } from "@uniswap/sdk-core";
import humanizeDuration from "humanize-duration";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const StakeForm = ({ user, token, staker, approved, timeLeft }: any) => {
  const [inputAmount, setInputAmount] = useState("0");
  const [balance, setBalance] = useState("0");
  const { address } = useAccount();

  useBalance({
    address,
    token: token?.address,
    watch: true,
    onSuccess(data: any) {
      console.log("Success", data);
      setBalance(data.formatted);
    },
  } as any);

  const { writeAsync: writeStake, isLoading: stakeLoading } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "stake",
    args: [parseEther(inputAmount)],
    onBlockConfirmation: (txnReceipt: { blockHash: any; contractAddress: any }) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash, txnReceipt);
      setInputAmount("0");
    },
  } as any);

  const { writeAsync: writeApprove, isLoading: approveLoading } = useScaffoldContractWrite({
    contractName: "Houdini",
    functionName: "approve",
    args: [staker?.address, MaxUint256],
    onBlockConfirmation: (txnReceipt: { blockHash: any; contractAddress: any }) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash, txnReceipt);
    },
  } as any);

  const { writeAsync: writeRequestExit, isLoading: requestExitLoading } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "requestUnlock",
    args: [],
    onBlockConfirmation: (txnReceipt: { blockHash: any; contractAddress: any }) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash, txnReceipt);
    },
  } as any);

  const { writeAsync: writeExit, isLoading: exitLoading } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "exit",
    args: [],
    onBlockConfirmation: (txnReceipt: { blockHash: any; contractAddress: any }) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash, txnReceipt);
    },
  } as any);

  const { writeAsync: writeEmergencyExit, isLoading: emergencyExitLoading } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "emergencyWithdraw",
    args: [user?.balance ?? 0],
    onBlockConfirmation: (txnReceipt: { blockHash: any; contractAddress: any }) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash, txnReceipt);
    },
  } as any);

  const handleApprove = () => {
    writeApprove();
  };

  const handleStakePool = () => {
    if (parseFloat(inputAmount) > 0) {
      writeStake();
    }
  };

  const handleRequestExit = () => {
    writeRequestExit();
  };
  const handleExit = () => {
    writeExit();
  };

  const handleEmergencyExit = () => {
    writeEmergencyExit();
  };

  if (!staker) {
    return <>Please switch to correct chain...</>;
  }

  return (
    <div className="">
      <h2>Stake Form</h2>
      {!approved || BigInt(approved) === 0n ? (
        <button className="btn btn-primary" onClick={() => handleApprove()}>
          Approve
        </button>
      ) : (
        <>
          <div>
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Stake Amount {token?.symbol}
            </label>
            <div className="join">
              <input
                type="text"
                id="amount"
                className="stake-amount join-item input-bordered 0 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                onChange={e => {
                  setInputAmount(e.target.value);
                }}
                value={inputAmount}
                max={balance}
                min="0.0"
                disabled={parseFloat(balance) == 0}
                required
              ></input>
              <button
                disabled={parseFloat(balance) == 0}
                className="btn join-item"
                onClick={() => {
                  setInputAmount(balance?.toString());
                }}
              >
                {" "}
                Max
              </button>
            </div>

            <button
              disabled={parseInt(inputAmount, 10) <= 0}
              className="btn btn-success m-2"
              onClick={() => handleStakePool()}
            >
              Stake
            </button>
          </div>
          {parseFloat(formatEther(user?.balance ?? 0)) > 0 && (
            <>
              <button className="btn btn-error m-2" onClick={() => handleEmergencyExit()}>
                Emergency Withdraw
              </button>{" "}
              <small>
                <em>* this will apply the Fallen Wizard tax</em>
              </small>
            </>
          )}
          {parseFloat(formatEther(user?.balance ?? 0)) > 0 && !user?.unlockRequested && (
            <button className="btn btn-warning m-2" onClick={() => handleRequestExit()}>
              Request Unstake
            </button>
          )}
          {user?.unlockRequested && (
            <button disabled={timeLeft} className="btn btn-error m-2" onClick={() => handleExit()}>
              {timeLeft === 0 ? "Unstake" : "Unstake in " + humanizeDuration(timeLeft * 1000)}
            </button>
          )}
        </>
      )}
    </div>
  );
};
