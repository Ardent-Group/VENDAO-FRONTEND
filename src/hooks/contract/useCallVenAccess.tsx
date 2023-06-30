import { useContractRead } from 'wagmi';
import venAccessABI from "../constants/abi/venAccess.abi.json"
import { callVendaoProps } from './useCallVendao';


export const venAccessCA = "0x48fb4A83c7328c63C6eb8500e1293A05E94d4746";

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