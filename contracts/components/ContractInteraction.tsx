import { useCallback, useEffect, useState } from "react";
import { StakingDashboard } from "./StakingDashboard";
import { http } from "viem";
import { createTestClient } from "viem";
import { hardhat } from "viem/chains";
import { usePublicClient } from "wagmi";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const ContractInteraction = () => {
  const [block, setBlock] = useState(0n);
  const [blockTime, setBlockTime] = useState(0n);

  const localProvider = createTestClient({
    chain: hardhat,
    mode: "hardhat",
    transport: http(),
  });

  const publicClient = usePublicClient();

  const updateBlock = useCallback(async () => {
    const blockNumber = await publicClient.getBlockNumber();
    setBlock(blockNumber);
    const blockinfo = await publicClient.getBlock({ blockNumber });
    setBlockTime(blockinfo.timestamp);
  }, [publicClient]);

  useEffect(() => {
    updateBlock();
  }, []);

  const increaseWorldTimeInSeconds = async (seconds: number, mine = false) => {
    await localProvider.increaseTime({ seconds });
    if (mine) {
      await localProvider.mine({ blocks: 1 });
    }

    updateBlock();
  };

  return (
    <div className="pb-10">
      <StakingDashboard></StakingDashboard>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div>
          <div className="flex-col">
            <h3>
              Debug Info <small className="text-xs">*will not be visible in production</small>
            </h3>
            <p>Block: {block.toString()}</p>
            <p>
              BlockTime: {new Date(Number(blockTime) * 1000).toTimeString()},
              {new Date(Number(blockTime) * 1000).toDateString()}
            </p>
            <button
              className={`btn btn-secondary btn-sm px-2 rounded-full`}
              onClick={() => {
                increaseWorldTimeInSeconds(1000, true);
              }}
            >
              Increase block
            </button>
            &nbsp;
            <button
              className={`btn btn-secondary btn-sm px-2 rounded-full`}
              onClick={() => {
                increaseWorldTimeInSeconds(60 * 60 * 24, true);
              }}
            >
              Increase day
            </button>
            &nbsp;
            <button
              className={`btn btn-secondary btn-sm px-2 rounded-full`}
              onClick={() => {
                increaseWorldTimeInSeconds(Math.round(60 * 60), true);
              }}
            >
              Increase 1h
            </button>
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};
