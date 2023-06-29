import { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Box,
    Text,
    Flex,
    HStack,
  } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import useCallVendao from '../../../hooks/contract/useCallVendao';
import { hexToDecimal } from '../../../hooks/constants/helpers';
import { dashboardTypes, transactionSummary } from './types';


const Dashboard = () => {

  const { address } = useAccount();
  const [dashboard, setdashboard] = useState<dashboardTypes | null >(null);
  const [transactionSummary, setTransactionSummary] = useState<transactionSummary | null>(null);

  const { data:dashboardData }:any = useCallVendao({
    functionName: "investorDetails",
    args: [
      address
    ]
  })
  
  const getDashboardData = useCallback(() => {
    if(!dashboardData) return null;

    setdashboard({
      projectFunded: hexToDecimal(dashboardData[0]),
      shareCount: hexToDecimal(dashboardData[1]),
      amountSpent: hexToDecimal(dashboardData[2])
    })

  }, [dashboardData])


  const username = useMemo(() => {
    return `${address?.slice(0, 4)}....${address?.slice(38, 42)}`
  }, [address])

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData])

  //-------- COVALENT API TO GET TRANSACTION SUMMARY -----------------
  useEffect(() => {
    const fetchTransactionSummary = async () => {
      try {
        const chainName = "fantom-mainnet";
        const apiKey = `cqt_rQKdFYkBvYbh7WRTdykMQkvbpr9p`;
        const url = `https://api.covalenthq.com/v1/${chainName}/address/${address}/transactions_summary/?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setTransactionSummary(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactionSummary();
  }, [address]);
  

  return (    
    <Box flex="1" bg="white">
    <Flex flexDir="column">
        <Text fontSize="48px" fontWeight="700" fontFamily="Gopher2">Welcome, {username}</Text>
        <Text color="#404040"
        maxWidth="700px"
        fontSize="16px"
        mt="10px"
        >
          Take charge of our decentralized autonomous organization. 
          Manage voting, governance, tokens, and discussions. 
          Shape the future of web3 with ease and influence.
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
        <Text color="#171717" fontSize="18px" fontWeight="500">Project funded</Text>
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">{dashboard?.projectFunded}</Text>
      </Flex>
      
      <Box border="0.1px solid #404040"></Box>

      <Flex flexDir="column" align="center">
        <Text color="#171717" fontSize="18px" fontWeight="500">Amount Spent</Text>
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">${(dashboard?.amountSpent)?.toFixed(2)}</Text>
      </Flex>

      <Box border="0.1px solid #404040"></Box>

      <Flex flexDir="column" align="center">
        <Text color="#171717" fontSize="18px" fontWeight="500">Share withdrawn</Text>
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">{dashboard?.shareCount}</Text>
      </Flex>
    </Flex>

    <Flex justify="space-between" flexDir="column" mt="40px">
     
     <Flex justify="space-between">
        <Text fontSize="20px" fontFamily="Gopher2" fontWeight={700}>Recent transactions</Text>
     </Flex>
  
     <Flex mt="7px" mb="20px" gap={5}>
      {transactionSummary && (
        <Flex
          w="100%"
          h="100%"
          borderRadius="20px"
          bg="#F8F8F8"
          p="20px 40px"
          justify="space-between"
        >
          <Flex flexDir="column">
            <Text color="#404040">Total Transactions</Text>
            <HStack mt="5px">
              <Text color="#404040">{transactionSummary.total_transactions}</Text>
            </HStack>
          </Flex>

          <Flex flexDir="column">
            <Text color="#404040">Total Value</Text>
            <HStack mt="5px">
              <Text color="#404040">{transactionSummary.total_value}</Text>
            </HStack>
          </Flex>
        </Flex>
      )}
    </Flex>
    </Flex>
    
</Box>
  )
}

export default Dashboard
