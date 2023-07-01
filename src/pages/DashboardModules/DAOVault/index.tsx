import {
    Box,
    Text,
    Flex,
  } from '@chakra-ui/react';
import useCallVendao from '../../../hooks/contract/useCallVendao';
import usdcABI from "../../../hooks/constants/abi/usdc.abi.json"
import usdtABI from "../../../hooks/constants/abi/usdt.abi.json"
import { vendaoCA } from '../../../hooks/contract/useCallVendao';
import { useContractRead } from 'wagmi';
import { useCallback, useEffect, useState } from 'react';
import { hexToDecimal } from '../../../hooks/constants/helpers';
import { vaultTypes } from './types';


const DAOVault = () => {
  const USDTCA = "0xAd280B60cA089625E9d38612710301852f879050"
  const USDCCA = "0x8d22Ee5dAF1C81bF5953D5f4A093E1847f708AdD"

  const [vault, setVault] = useState<vaultTypes>({
    usdt_bal: 0,
    ftm_bal: 0,
    usdc_bal: 0
  })

  const { data } = useCallVendao({
    functionName: "DAO_FTM_BALANCE"
  })
  

  const { data:getUSDT } = useContractRead({
    address: USDTCA,
    abi: usdtABI,
    functionName: "balanceOf",
    args: [
      vendaoCA
    ]
  })

  const { data:getUSDC } = useContractRead({
    address: USDCCA,
    abi: usdcABI,
    functionName: "balanceOf",
    args: [
      vendaoCA
    ]
  })

  const getPrice = async (ids:string) => {

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    const respond = await fetch(url);
    const res = await respond.json();
    const price = res[ids]?.usd;

    return price;
  }
  
  const vaultData = useCallback(async () => {
    if(data || getUSDT || getUSDC ) {
      const price:any = await getPrice("tether");
      const ftmPrice:any = await getPrice("fantom")
      const usd:any = await getPrice("usd-coin")

      console.log(await ftmPrice, "ftm");
      

      setVault({
        usdt_bal: ((Number(getUSDT) / 1e18) * price),
        ftm_bal: ((Number(data) / 1e18) * ftmPrice),
        usdc_bal: ((Number(getUSDC) / 1e18) * usd)
      })
    }
  }, [data, getUSDC, getUSDT])

  console.log(vault.ftm_bal, "jdks");
  

  useEffect(() => {
    vaultData();
  }, [vaultData])
  
  return (
    <Box flex="1" bg="white">
    <Flex flexDir="column">
        <Text fontSize="48px" fontWeight="700" fontFamily="Gopher2">DAO Vault</Text>
        <Text color="#404040"
        maxWidth="700px"
        fontSize="16px"
        mt="10px"
        >
          VEN DAO holds a variety of crypto assets to invest in innovative web3 projects
      </Text>
    </Flex>

    <Flex 
    mt="30px"
    h="187px"
    borderRadius="20px"
    bg="#F8F8F8"
    justify="space-between"
    p="30px 40px"
    >
      <Flex flexDir="column" align="center">
        <Text color="#171717" fontSize="18px" fontWeight="500">USDT Balance</Text>
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">${vault.usdt_bal.toFixed(2)}</Text>
      </Flex>

      <Box border="0.1px solid #404040"></Box>

      <Flex flexDir="column" align="center">
        <Text color="#171717" fontSize="18px" fontWeight="500">FTM Balance</Text>
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">${vault.ftm_bal.toFixed(2)}</Text>
      </Flex>

      <Box border="0.1px solid #404040"></Box>
      
      <Flex flexDir="column" align="center">
        <Text color="#171717" fontSize="18px" fontWeight="500">USDC Balance</Text>
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">${vault.usdc_bal.toFixed(2)}</Text>
      </Flex>
    </Flex>

    <Flex justify="space-between" flexDir="column" mt="40px">
     
     <Flex>
        <Text fontSize="20px" fontFamily="Gopher2" fontWeight={700}>Other Tokens</Text>
     </Flex>
  
    <Flex mt="7px" mb="20px">
      <Flex
      w="100%"
      h="100px"
      borderRadius="20px"
      bg="#F8F8F8"
      p="20px 40px"
      justify="space-between"
    >
     {/* <Flex flexDir="column">
       <Text color="#404040">Name</Text>
       <HStack mt="5px">
        <Text color="#404040">1.</Text>
        <Text color="#404040">Blessing DAO</Text>
      </HStack> 
     </Flex> */}


      {/* <Flex flexDir="column">
       <Text color="#404040">Balance</Text>
       <HStack mt="5px">
        <Text color="#404040">$556</Text>
      </HStack> 
     </Flex>  */}
    </Flex>
    </Flex>
    </Flex>
    
</Box>
  )
}

export default DAOVault
