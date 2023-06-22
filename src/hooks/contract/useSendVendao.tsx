import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from "wagmi";
import { vendaoCA } from "./useCallVendao";
import vendaoABI from "../constants/abi/vendao.abi.json"

interface sendParamsProps {
    functionName: string;
    args?: Array<any>;
    value?: bigint
}


const useSendVendao = ({functionName, args, value}: sendParamsProps) => {
    // Prepare write to smart contract
    
    const {config} = usePrepareContractWrite({
        address: vendaoCA,
        abi: vendaoABI,
        functionName,
        args,
        value
    })

    // Write to the smart contract using the prepared config

    const {data:venData, isLoading:venLoading, write: venWrite} = useContractWrite(config);

    const {isError:waitError, isSuccess:waitSuccess, isLoading:waitLoading} = useWaitForTransaction({
        hash: venData?.hash
    })

    return { venLoading, venWrite, waitError, waitSuccess, waitLoading};
}

export default useSendVendao;