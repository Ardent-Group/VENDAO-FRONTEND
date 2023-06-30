import { useCallback, useEffect, useState } from 'react';
import { VENDAO_SVG } from "../assets/svg";
import { getStatusColor, getStatusColorText, getStatusLabel, hexToDecimal, makeUrl } from "../hooks/constants/helpers";
import {
    Button,
    Divider,
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import useCallVendao from '../hooks/contract/useCallVendao';


interface proposalProps {
    id: number;
    clickView: any;
}

interface proposalTypes {
    status: number | null;
    name: string;
    logo:any;
    description: string;
    equity_offered: number;
    funding_request: number;
    approval_count: number;
}


const ProposalTemplate = (props:proposalProps) => {

    const [proposalData, setProposalData] = useState<proposalTypes>({
        status: null,
        name: "",
        logo: "",
        description: "",
        equity_offered: 0,
        funding_request: 0,
        approval_count: 0,
    })

    const { data }:any = useCallVendao({
        functionName: "projectProposals",
        args: [
            props.id.toString()
        ]
    })

    const getProjectProposals = useCallback(async () => {
        if(data){
            const url = makeUrl(data[0]);
            const respond = await fetch(url);
            const metadata = await respond.json();

            setProposalData({
                status: hexToDecimal(data[5]?._hex),
                name: metadata.name,
                logo: makeUrl(metadata.image),
                description: metadata.description,
                equity_offered: hexToDecimal(data[7]?._hex),
                funding_request: hexToDecimal(data[6]?._hex),
                approval_count: hexToDecimal(data[4]?._hex)
            })
        }
    }, [data])

    useEffect(() => {
        getProjectProposals();
    }, [getProjectProposals])


    return (
        <Flex
         border="0.5px solid #CFCFCF"
         _hover={{ border: "1.3px solid #84DB00" }}
         background=""
         borderRadius="20px"
         p="20px 40px"
         backgroundColor="white"
         w="100%"
         h="100%"
         flexDir="column"
        >
            {/* --------- status button --------- */}
            <Button
             bg={getStatusColor(proposalData.status)}
             _hover={{ bg: getStatusColor(proposalData.status) }}
             borderRadius="10px"
             color={getStatusColorText(proposalData.status)}
             w="96px"
             h="40px"
            >
                <Text fontSize="16px" fontWeight="500" fontFamily="Gopher">
                    {getStatusLabel(proposalData.status)}
                </Text>
            </Button>
            <Flex
             mt="20px"
             justify="space-between"
             alignItems="center"
            >
                <Text fontFamily="Gopher" fontSize="20px" fontWeight="700">{proposalData.name}</Text>
                <Image src={proposalData.logo} alt="" />
            </Flex>
            <Text
             fontFamily="Gopher"
             fontSize="16px"
             fontWeight="700"
             lineHeight="20px"
             mt="20px"
             maxW="600px"
             textAlign="start"
            >
                {(proposalData.description).slice(0, 200)}
            </Text>
            <Divider border="0.5px solid #404040" mt="15px" />
            <Flex
             mt="20px"
             alignItems="center"
             justifyContent="space-between"
            >
                <Flex flexDir="column">
                    <Text
                     fontFamily="Gopher"
                     fontSize="16px"
                     fontWeight="500"
                     lineHeight="20px"
                    >
                        Equity offered
                    </Text>
                    <Text
                     fontFamily="Gopher2"
                     fontSize="48px"
                     fontWeight="700"
                     lineHeight="60px"
                     mt="4px"
                    >
                        {proposalData.equity_offered.toLocaleString()}
                    </Text>
                </Flex>
                <Button
                 borderRadius="10px"
                 bg="#B5FF45"
                 _hover={{ bg: "#8AE400" }}
                 w="56px"
                 h="50px"
                 onClick={() => props.clickView}
                >
                    {VENDAO_SVG().arrowRight()}
                </Button>
            </Flex>
        </Flex>
    );
}

export default ProposalTemplate;