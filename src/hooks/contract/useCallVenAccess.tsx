import { useContractRead } from 'wagmi';
import venAccessABI from "../constants/abi/venAccess.abi.json"
import { callVendaoProps } from './useCallVendao';


export const venAccessCA = "0xF95530D2EA061929539E1ab19CbAd494240e562a";

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