import { useContractRead } from 'wagmi';
import venAccessABI from "../constants/abi/venAccess.abi.json"
import { callVendaoProps } from './useCallVendao';


export const venAccessCA = "0x7bb8A3a367a6b159F7971A0D8aC79CBB2ae14869";

const useCallVenAccess = ({functionName, args, watch}: callVendaoProps) => {

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