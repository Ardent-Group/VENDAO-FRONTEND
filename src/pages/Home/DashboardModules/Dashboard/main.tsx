import React from 'react'
import {
    Box,
    Text,
    Flex,
    HStack,
  } from '@chakra-ui/react';

const Dashboard = () => {
  return (    
    <Box flex="1" bg="white">
    <Flex flexDir="column">
        <Text fontSize="48px" fontWeight="700" fontFamily="Gopher2">Welcome, Michael</Text>
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
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">0</Text>
      </Flex>
      
      <Box border="0.1px solid #404040"></Box>

      <Flex flexDir="column" align="center">
        <Text color="#171717" fontSize="18px" fontWeight="500">Amount Spent</Text>
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">$0.00</Text>
      </Flex>

      <Box border="0.1px solid #404040"></Box>

      <Flex flexDir="column" align="center">
        <Text color="#171717" fontSize="18px" fontWeight="500">Share withdrawn</Text>
        <Text color="#171717" fontSize="48px" fontFamily="Gopher2" fontWeight="700">0</Text>
      </Flex>
    </Flex>

    <Flex justify="space-between" flexDir="column" mt="40px">
     
     <Flex justify="space-between">
        <Text fontSize="20px" fontFamily="Gopher2" fontWeight={700}>Project invested</Text>
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

    <Flex
      w="100%"
      h="100%"
      borderRadius="20px"
      bg="#F8F8F8"
      p="20px 40px"
      // maxH="120px" 
      // overflowY="scroll"
      flexDir="column"
    >
     <Text mt="4px">184747474743738383835</Text>
    </Flex>
    </Flex>
    </Flex>
    
</Box>
  )
}

export default Dashboard
