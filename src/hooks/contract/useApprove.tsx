
import { usePrepareContractWrite } from 'wagmi';
import tokenABI from "../constants/abi/erc20.abi.json";
import { parseEther } from 'viem';
import { vendaoCA } from './useCallVendao';
import { useContractWrite } from 'wagmi';
import { useWaitForTransaction } from 'wagmi';


interface approveTypes {
    price: `${number}`;
    equityCA:`0x${string}`;
}


const useApprove = ({equityCA, price}: approveTypes) => {

    const { config } = usePrepareContractWrite({
        address: equityCA,
        abi: tokenABI,
        functionName: "approve",
        args: [
            vendaoCA,
            parseEther(price)
        ]
    })

    const { data:writeData, isLoading:approveTokenLoading, write:tokenWrite } = useContractWrite(config)
    const { isError:approveError, isSuccess:approveSuccess, isLoading:approveLoading } = useWaitForTransaction({
        hash: writeData?.hash,
    })

    return { approveTokenLoading, tokenWrite, approveError, approveSuccess, approveLoading}
}

export default useApprove;