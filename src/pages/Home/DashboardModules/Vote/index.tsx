import React from 'react'
import {
    Box,
    Text,
    Flex,
    HStack,
    Button,
  } from '@chakra-ui/react';
import PopoverWithMouseover from '../../../../components/PopoverContent';
import VoteCard from './VoteCard';

const Vote = () => {
  return (
    <Box flex="1" bg="white">
    <Flex flexDir="column">
        <Text fontSize="48px" fontWeight="700" fontFamily="Gopher2">Vote</Text>
        <Text color="#404040"
        maxWidth="700px"
        fontSize="16px"
        mt="10px"
        >
          Your vote determines the future of each proposal. Show your confidence in a project idea by voting
      </Text>
    </Flex>

      <Flex justify="space-between" mt="30px">
         <Button
          borderRadius="10px"
          bg="#B5FF45"
          _hover={{ bg: "#8AE400" }}
          p="10px 16px"
          w="114px"
          h="40px"
          >
            Reset Vote
          </Button>

          <HStack gap={0}>
            <Text fontWeight="700">Max of 4 votes</Text>
            <PopoverWithMouseover popoverContent="Participants can cast up to four votes. This limit ensures that each participant has a restricted number of votes and prevents excessive influence or manipulation by any single participant." />
            </HStack>
        </Flex>
        
        <VoteCard />
    </Box>
  )
}

export default Vote
