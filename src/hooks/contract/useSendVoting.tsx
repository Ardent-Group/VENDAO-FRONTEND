import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import VenVotingABI from "../constants/abi/voting.abi.json"
import { sendParamsProps } from "./useSendVendao";


export const votingCA = "0xcEAB2452A87eF3FC674789D70ee94a9064E485f0"; 

const useSendVoting = ({functionName, args, value}: sendParamsProps) => {

    const {config} = usePrepareContractWrite({
        address: votingCA,
        abi: VenVotingABI,
        functionName,
        args,
        value
    })

    const {data:votingData, isLoading:votingLoading, write:votingWrite} = useContractWrite(config);

    const {isError:waitError, isSuccess:waitSuccess, isLoading:waitLoading} = useWaitForTransaction({
        hash: votingData?.hash
    })

    return { votingLoading, votingWrite, waitError, waitSuccess, waitLoading};
}

export default useSendVoting;
