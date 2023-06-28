import { useContractRead } from "wagmi";
import vendaoABI from "../constants/abi/vendao.abi.json"


export interface callVendaoProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const vendaoCA = "0xf2B6447Ca572c7986D9E0674060Eb454c26E4b2C"

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