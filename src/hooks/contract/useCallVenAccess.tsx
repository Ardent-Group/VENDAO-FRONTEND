import { useContractRead } from 'wagmi';
import venAccessABI from "../constants/abi/venAccess.abi.json"


interface venAccessParams {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const venAccessCA = "0xb52274208f79244ACD3117fD50feE279fBdaFd15";

const useCallVenAccess = ({functionName, args, watch}: venAccessParams) => {

    const data = useContractRead({
        address: venAccessCA,
        abi: venAccessABI,
        functionName,
        args,
        watch,
        onError: (err) => {
            console.log({ err })
        }
    })

    return data;
}

export default useCallVenAccess;