import { useContractRead } from "wagmi";
import vendaoABI from "../constants/abi/vendao.abi.json"


export interface callVendaoProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const vendaoCA = "0x3232E43d840671473c4067972601274Ad45145B4"

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