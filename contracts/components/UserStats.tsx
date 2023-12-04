import { formatEther } from "viem";

export const UserStats = ({ user, apy, earned, timeLeft }: any) => {
  return (
    <div className="">
      <h2>User Stats</h2>
      <ul>
        <li>
          <b>User APY</b> {apy.toString() || 0}%
        </li>
        <li>
          <b>Staked</b> {formatEther(user?.balance ?? 0) || 0} $HDNI
        </li>
        <li>
          <b>Earned</b> {formatEther(earned ?? 0) || 0} $HDNI
        </li>
        <li>
          <b>Multiplier</b>{" "}
          {((BigInt(user?.multiplier ?? 0n) > 0n ? BigInt(user?.multiplier) : 10000n) / 10000n).toString()}x
        </li>
        <li>
          <hr></hr>
        </li>
        <li>
          <b>RewardPerTokenPaid</b> {formatEther(user?.rewardPerTokenPaid ?? 0) || 0} - internal
        </li>
        <li>
          <hr></hr>
        </li>
        <li>
          <h4>Can exit pool? {user?.unlockRequested ? "☑" : "☒"}</h4>
        </li>
        <li>
          <b>unlockRequested</b> {user?.unlockRequested ? "true" : "false"}
        </li>
        <li>
          <b>TimeLeft to unlock</b> {timeLeft.toString() || 0}s
        </li>
        <li>
          <b>unlockRequestedTime</b> {user?.unlockRequestedTime?.toString() || 0}s - internal
        </li>
        <li>
          <b>unlockTime</b> {user?.unlockTime?.toString() || 0}s - internal
        </li>
      </ul>
    </div>
  );
};
