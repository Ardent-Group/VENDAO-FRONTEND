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


interface dashboardTypes {
  projectFunded: number;
  shareCount: number;
  amountSpent: number
}

const Dashboard = () => {

  const { address } = useAccount();
  const [dashboard, setdashboard] = useState<dashboardTypes | null >(null);

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
    <Flex
      w="100%"
      h="100%"
      borderRadius="20px"
      bg="#F8F8F8"
      p="20px 40px"
      // maxH="120px" 
      // overflowY="scroll"
      justify="space-between"
    >
     <Flex flexDir="column">
       <Text color="#404040">Name</Text>
       <HStack mt="5px">
        <Text color="#404040">1.</Text>
        <Text color="#404040">Blessing DAO</Text>
      </HStack> 
     </Flex>


      <Flex flexDir="column">
       <Text color="#404040">Amount</Text>
       <HStack mt="5px">
        <Text color="#404040">$556</Text>
      </HStack> 
     </Flex>
    </Flex>
    </Flex>
    </Flex>
    
</Box>
  )
}

export default Dashboard
