import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import VenVotingABI from "../constants/abi/voting.abi.json"
import { sendParamsProps } from "./useSendVendao";


export const votingCA = "0xC84793298E9d362cf346b7D8fcF800692314dE10"; 

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
