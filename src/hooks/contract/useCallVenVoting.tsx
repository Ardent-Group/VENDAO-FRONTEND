import { useContractRead } from "wagmi"
import VenVotingABI from "../constants/abi/voting.abi.json"
import { callVendaoProps } from "./useCallVendao"
import { votingCA } from "./useSendVoting"


const useCallVenVoting = ({functionName, args, watch}: callVendaoProps) => {

    const data = useContractRead({
        address: votingCA,
        abi: VenVotingABI,
        functionName,
        args,
        watch,
        onError: (err) => {
            console.log({err})
        }
    })

    return data
}

export default useCallVenVoting;

