import { useContractRead } from 'wagmi';
import venAccessABI from "../constants/abi/venAccess.abi.json"
import { callVendaoProps } from './useCallVendao';


export const venAccessCA = "0xa2403e57454A0ec16376f0de968962328FA39F97";

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