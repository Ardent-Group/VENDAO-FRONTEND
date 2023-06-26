import { useContractRead } from 'wagmi';
import venAccessABI from "../constants/abi/venAccess.abi.json"


interface venAccessParams {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const venAccessCA = "0x56B94B906605635Fe3fB2e4F5b88737B40ad9Ef7";

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