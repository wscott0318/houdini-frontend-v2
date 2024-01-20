import { useEffect, useState } from "react";
import { useIsMounted } from "usehooks-ts";
import { usePublicClient } from "wagmi";
import scaffoldConfig from "@/contracts/scaffold.config";
import { Contract, ContractCodeStatus, ContractName, contracts } from "@/contracts/utils/scaffold-eth/contract";

/**
 * Gets the matching contract info from the contracts file generated by `yarn deploy`
 * @param contractName - name of deployed contract
 */
export const useDeployedContractInfo = <TContractName extends ContractName>(contractName: TContractName) => {
  const isMounted = useIsMounted();
  const deployedContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[
    contractName as ContractName
  ] as Contract<TContractName>;
  const [status, setStatus] = useState<ContractCodeStatus>(ContractCodeStatus.LOADING);
  const publicClient = usePublicClient({ chainId: scaffoldConfig.targetNetwork.id });

  useEffect(() => {
    const checkContractDeployment = async () => {
      if (!deployedContract) {
        setStatus(ContractCodeStatus.NOT_FOUND);
        return;
      }
      const code = await publicClient.getBytecode({
        address: deployedContract.address,
      });

      if (!isMounted()) {
        return;
      }
      // If contract code is `0x` => no contract deployed on that address
      if (code === "0x") {
        setStatus(ContractCodeStatus.NOT_FOUND);
        return;
      }
      setStatus(ContractCodeStatus.DEPLOYED);
    };

    checkContractDeployment();
  }, [isMounted, contractName, deployedContract, publicClient]);

  return {
    data: status === ContractCodeStatus.DEPLOYED ? deployedContract : undefined,
    isLoading: status === ContractCodeStatus.LOADING,
  };
};
