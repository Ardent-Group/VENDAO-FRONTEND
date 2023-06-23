import { useContractRead } from "wagmi";
import vendaoABI from "../constants/abi/vendao.abi.json"


interface callVendaoProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const vendaoCA = "0x7F375107DD01Dd834Aa4690EBAFBAa3f634219Af"

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