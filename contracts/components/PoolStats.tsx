import { formatEther } from "viem";

export const PoolStats = ({ apy, pool, supply, weightedSupply, rewardForDuration, rewardRemaining }: any) => {
  return (
    <div className="">
      <h2>Pool Stats</h2>
      <ul>
        <li>
          <b>Pool APY</b> {apy.toString() || 0}%
        </li>
        <li>
          <b>Supply</b> {formatEther(supply) || 0} $HDNI
        </li>
        <li>
          <b>Weighted Supply</b> {formatEther(weightedSupply) || 0} $HDNI
        </li>
        <li>
          <b>Reward For Duration</b> {parseFloat(formatEther(rewardForDuration)).toFixed(2) || 0} $HDNI
        </li>
        <li>
          <b>Reward remaining</b> {parseFloat(formatEther(rewardRemaining)).toFixed(2) || 0} $HDNI
        </li>
        <li>
          <hr></hr>
        </li>
        <li>
          <b>minWithdrawCooldown</b> {(Number(pool?.minWithdrawCooldown || 0n) / 60 / 60 / 24).toString() || 0} day(s)
        </li>
        <li>
          <b>Locked</b> {pool?.locked ? "true" : "false"}
        </li>
        <li>
          <b>rewardsEnabled</b> {pool?.rewardsEnabled ? "true" : "false"}
        </li>
        <li>
          <b>earlyUnstakeFee</b> {Number(pool?.earlyUnstakeFee) / 100}%
        </li>
        <li>
          <b>rewardPerTokenStored</b> {parseFloat(formatEther(pool?.rewardPerTokenStored ?? 0)).toFixed(2) || 0} $HDNI
        </li>

        <li>
          <b>rewardRate</b> {parseFloat(formatEther(pool?.rewardRate ?? 0)).toFixed(2) || 0} $HDNI
        </li>

        <li>
          <b>rewardsDuration</b> {pool?.rewardsDuration || 0}s
        </li>

        <li>
          <b>totalRewardFunds</b> {parseFloat(formatEther(pool?.totalRewardFunds ?? 0)).toFixed(2) || 0} $HDNI
        </li>
      </ul>
    </div>
  );
};
