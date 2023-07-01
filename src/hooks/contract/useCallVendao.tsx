import { useContractRead } from "wagmi";
import vendaoABI from "../constants/abi/vendao.abi.json"


export interface callVendaoProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const vendaoCA = "0x08EEb8E642C5A169E6E46fDC4DcFB3F71e1ac95F"

const useCallVendao = ({functionName, args, watch}: callVendaoProps) => {

    const data = useContractRead({
        address: vendaoCA,
        abi: vendaoABI,
        functionName,
        args,
        watch,
        onError: (err) => {
           console.log({ err })
        }
    })

    return data
}

export default useCallVendao;