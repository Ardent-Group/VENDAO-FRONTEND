import { useContractRead } from "wagmi";
import vendaoABI from "../constants/abi/vendao.abi.json"


export interface callVendaoProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const vendaoCA = "0x2e593f6Bb054bc428d8B98b106b32e3514573116"

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