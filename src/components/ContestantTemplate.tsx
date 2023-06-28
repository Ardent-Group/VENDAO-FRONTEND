import { Button, Flex, Text, useToast, Spinner, HStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import useCallVenVoting from "../hooks/contract/useCallVenVoting";
import { hexToDecimal } from "../hooks/constants/helpers";
import useSendVoting from "../hooks/contract/useSendVoting";


interface contestantTypes {
    name: string;
    voteCount: number;
    address: string;
}

interface contestantProps {
    id: number
}

const ContestantTemplate = (props:contestantProps) => {
    
    const toast = useToast();

    const [contestant, setContestant] = useState<contestantTypes>({
        name: "",
        voteCount: 0,
        address: ""
    })

    const {votingLoading, votingWrite, waitError, waitSuccess, waitLoading} = useSendVoting({
        functionName: "voteAdmin",
        args: [
            props.id.toString()
        ]
    })

    const handleVote = (e:any) => {
        e.preventDefault();

        votingWrite?.();
    }

    const { data }:any = useCallVenVoting({
        functionName: "contestant",
        args: [
            props.id.toString()
        ]
    })

    const getContestantData = useCallback(() => {
        if(!data) return null;

        setContestant({
            name: data[0],
            voteCount: hexToDecimal(data[1]),
            address: data[2]
        })
    }, [data])

    useEffect(() => {
        getContestantData()

        let rerun:boolean = true;

        if(waitError && rerun){
            toast({
                title: "Error",
                description: "Error encountered while trying to vote for an Admin",
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
        if(waitSuccess && rerun){
            toast({
                title: "Successful",
                description: "Successfully voted for an admin",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        }

        return () => {
            if(waitError || waitSuccess) rerun = false;
        }
    }, [getContestantData, waitError, waitSuccess, toast])


    return (
        <Flex
        border="0.5px solid #CFCFCF"
        _hover={{ border: "1.3px solid #84DB00" }}
        background=""
        borderRadius="20px"
        p="40px"
        alignItems="center"
        backgroundColor="white"
        w="289px"
        h="100%"
        flexDir="column"
        >
            <Text color="#171717" fontSize="20px" fontFamily="Gopher2" fontWeight="700">{contestant.name}</Text>
            <Text maxW="230px" textAlign="center" mt="20px">
                {contestant.address}
            </Text>

            <HStack mt="10px">
                <Text fontWeight={"bold"}>Vote Count:</Text>
                <Text>{contestant.voteCount}</Text>
            </HStack>
            
            <Button
            borderRadius="10px"
            bg="#B5FF45"
            _hover={{ bg: "#8AE400" }}
            p="10px 16px"
            w="68px"
            h="40px"
            mt="30px"
            onClick={handleVote}
            disabled={votingLoading || waitLoading}
            >
                {
                    (votingLoading || waitLoading) ? <>Loading <Spinner ml={"10px"} size={"sm"} /></>: "Vote"
                }
            </Button>
        </Flex>
    )
}

export default ContestantTemplate;