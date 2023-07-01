import { useContractRead } from "wagmi";
import vendaoABI from "../constants/abi/vendao.abi.json"


export interface callVendaoProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const vendaoCA = "0x6D213862E0152FC9476a7dEEd53a4FD4646d92eE"

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