import { useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { hexToDecimal } from '../constants/helpers';
import tokenABI from "../constants/abi/erc20.abi.json";
import vendaoABI from "../constants/abi/vendao.abi.json";
import { vendaoCA } from './useCallVendao';
import { parseEther } from 'viem';


interface approveParamsTypes {
    user?: string;
    functionName: string;
    contractArgs?: Array<any>;
    price: `${number}`;
    equityCA: `0x${string}`;
}

export const useApproveToken = ({equityCA, price, user, functionName, contractArgs}: approveParamsTypes) => {

    
    const {config} = usePrepareContractWrite({
        address: equityCA,
        abi: tokenABI,
        functionName: "approve",
        args: [
            vendaoCA,
            parseEther(price)
        ]
    })

    const {data:writeData, isLoading:approveTokenLoading, write:tokenWrite } = useContractWrite(config)
    
    const {isError:approveError, isSuccess:approveSuccess, isLoading:approveLoading } = useWaitForTransaction({
        hash: writeData?.hash,
        onSuccess() {
            tokenWrite?.()
        }
    })

    const {config:contractConfig} = usePrepareContractWrite({
        address: vendaoCA,
        abi: vendaoABI,
        functionName,
        args:contractArgs
    })

    const {data:contractData, isLoading:writeLoading, write} = useContractWrite(contractConfig)

    const {isError:waitError, isSuccess:waitSuccess, isLoading:waitLoading} = useWaitForTransaction({
        hash: contractData?.hash
    })

    const {data:tokenRead} = useContractRead({
        address: equityCA,
        abi: tokenABI,
        functionName: "allowance",
        args: [
            user,
            vendaoCA
        ]
    })

    const tokenAuthorization = () => {
        const priceInput = parseEther(price)
        // @ts-ignore
        if(hexToDecimal(tokenRead?._hex) > hexToDecimal(priceInput?._hex)) {
            write?.();
        }else {
            tokenWrite?.();
        }
    }

    return { approveTokenLoading, approveError, approveSuccess, approveLoading, tokenAuthorization, writeLoading, waitError, waitSuccess, waitLoading }
}
