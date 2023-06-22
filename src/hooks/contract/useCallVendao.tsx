import { useContractRead } from "wagmi";
import vendaoABI from "../constants/abi/vendao.abi.json"


interface callVendaoProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
}


export const vendaoCA = "0x86ebcD733D1A9bBf155E94877335db2b645106D7"

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