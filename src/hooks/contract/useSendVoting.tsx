import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import VenVotingABI from "../constants/abi/voting.abi.json"
import { sendParamsProps } from "./useSendVendao";


export const votingCA = "0x83f60F50a6EFae17340575a8DD14BCcD1d0b9924"; 

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
