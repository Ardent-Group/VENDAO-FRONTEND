import { useCallback, useEffect, useState } from 'react';
import { VENDAO_SVG } from "../assets/svg";
import { getStatusColor, getStatusColorText, getStatusLabel, makeUrl } from "../hooks/constants/helpers";
import {
    Button,
    Divider,
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import useCallVendao from '../hooks/contract/useCallVendao';
import { useNavigate } from 'react-router-dom';


interface proposalProps {
    id: number;
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
    const navigate = useNavigate()


    const handleClickView = (id: number) => {
        navigate(`/product/${id}`);
        // Scroll back to top
        window.scrollTo(0, 0);
    };


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

    console.log(data);
    

    const getProjectProposals = useCallback(async () => {
        if(data){
            const url = makeUrl(data[0]);
            const respond = await fetch(url);
            const metadata = await respond.json();

            setProposalData({
                status: Number(data[5]),
                name: metadata.name,
                logo: makeUrl(metadata.image),
                description: metadata.description,
                equity_offered: Number(data[7]) / 10e18,
                funding_request: Number(data[6]) / 10e18,
                approval_count: Number(data[4])
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
                {(proposalData.description).slice(0, 200)} .....
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
                 onClick={() => handleClickView(props.id)}
                >
                    {VENDAO_SVG().arrowRight()}
                </Button>
            </Flex>
        </Flex>
    );
}

export default ProposalTemplate;