import { useCallback, useEffect, useState } from 'react'
import {
    Box,
    Text,
    Flex,
    HStack,
    Button,
  } from '@chakra-ui/react';
import PopoverWithMouseover from '../../../components/PopoverContent';
import VoteCard from './VoteCard';
import useSendVoting from '../../../hooks/contract/useSendVoting';
import useCallVenVoting from '../../../hooks/contract/useCallVenVoting';
import { useAccount } from 'wagmi';
import { hexToDecimal } from '../../../hooks/constants/helpers';
import { useToast, Spinner } from '@chakra-ui/react';




const Vote = () => {

  const [limitData, setlimitData] = useState<number>(0);

  const { address } = useAccount();

  const toast = useToast();

  const { data } = useCallVenVoting({
    functionName: "voteLimit",
    args: [
      address
    ]
  })

  const getLimitData = useCallback(() => {
    if(!data) return null;
    setlimitData(hexToDecimal(data))
  }, [data])

  const {votingLoading, votingWrite, waitError, waitSuccess, waitLoading} = useSendVoting({
    functionName: "resetVoteLimit",
  })

  const handleReset = (e:any) => {
    e.preventDefualt()

    votingWrite?.();
  }

  useEffect(() => {
    getLimitData()

    let rerun:boolean = true;

    if(waitError && rerun){
      toast({
        title: "Error",
        description: "Error resetting vote limit",
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }

    if(waitSuccess && rerun){
      toast({
        title: "Successful",
        description: "Successfully reset vote limit",
        status: "success",
        duration: 5000,
        isClosable: true
      })
    }

    return () => {
      if(waitError || waitSuccess) rerun = false
    }

  }, [getLimitData, waitError, waitSuccess, toast])
  

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
          onClick={handleReset}
          disabled={votingLoading || waitLoading}
          >
            {
              (votingLoading || waitLoading) ? <>Loading <Spinner ml={"10px"} size={"sm"} /></>: "Reset Vote"
            }
          </Button>

          <HStack gap={0}>
            <Text fontWeight="700">Max of {limitData} votes</Text>
            <PopoverWithMouseover popoverContent="Participants can cast up to four votes. This limit ensures that each participant has a restricted number of votes and prevents excessive influence or manipulation by any single participant." />
            </HStack>
        </Flex>
        
        <VoteCard />
    </Box>
  )
}

export default Vote
