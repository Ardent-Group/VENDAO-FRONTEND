import { VENDAO_SVG } from "../../assets/svg";
import InvestProject from "../../components/Modals/InvestinaProject";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box, 
    Flex, 
    HStack,
    Button,
    useDisclosure,
    Text,
    Image
} from "@chakra-ui/react";
import useCallVendao from "../../hooks/contract/useCallVendao";
import Navbar from "../../components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { makeUrl } from "../../hooks/constants/helpers";

interface investorTypes {
    name: string;
    description: string;
    equity_offered: number;
    funding_amount: number;
    logo: any;
}

const InvestorDetails = () => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const navigate = useNavigate();
    const {id} = useParams();

    const [investor, setInvestor] = useState<investorTypes>({
        name: "",
        description: "",
        equity_offered: 0,
        funding_amount: 0,
        logo: ""
    })
    

    const { data }:any = useCallVendao({
        functionName: "proposalsToInvest",
        args: [
            id
        ]
    })

    const getInvestor = useCallback(async () => {
        if(data){
            const url = makeUrl(data[0])
            const respond = await fetch(url);
            const metadata = await respond.json();

            setInvestor({
                name: metadata.name,
                description: metadata.description,
                equity_offered: Number(data[6]),
                funding_amount: Number(data[5]),
                logo: makeUrl(metadata.image)

            })
        }
    }, [data])

    useEffect(() => {
        getInvestor();
    }, [getInvestor])

    return (
        <Box>
            <Navbar />
            <Flex justify="start" flexDir="column" m={"5%"}>
                <HStack cursor={"pointer"} onClick={() => navigate(-1)}>
                    <Flex>
                    {VENDAO_SVG().arrowBackDashboard()}
                    </Flex>
                </HStack>
                <Flex gap={10} flexDir="column" mt="30px">
                    <Flex justify="center" alignItems="center">
                        <Button
                        borderRadius="10px"
                        bg="#B5FF45"
                        _hover={{ bg: "#8AE400" }}
                        p="10px 16px"
                        w="186px"
                        h="40px"
                        onClick={onOpen}
                        >
                            Invest in this project
                        </Button>
                    </Flex>
                </Flex>
                <Flex flexDir={"column"} flex={"1 1"}>
                    <HStack gap={20}>
                        <Flex gap={10}>
                            <Text color="#171717" fontFamily="Gopher" fontSize="48px" fontWeight="700">{investor.name}</Text>
                            <Image src={investor.logo} alt=""  />
                        </Flex>
                    </HStack>
                    <Text
                    fontFamily="Gopher"
                    fontSize="16px"  
                    fontWeight="500"
                    lineHeight="20px"
                    mt="20px"
                    >
                        {investor.description}
                    </Text>
                    <Flex justify="space-between">
                        <Flex flexDir="column">
                            <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Equity offered</Text>
                            <Text fontSize="48px" fontFamily="Gopher2" fontWeight={700} color="#171717" mt="4px">{Number(investor.equity_offered.toFixed()).toLocaleString()}</Text>
                        </Flex>
                        <Flex flexDir="column">
                            <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Funding Amount</Text>
                            <Text fontSize="48px" fontFamily="Gopher2" fontWeight={600} color="#171717" mt="4px">${Number(investor.funding_amount.toFixed()).toLocaleString()}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <InvestProject
            isOpen={isOpen}
            onClose={onClose}
            />
        </Box>
    );
}

export default InvestorDetails;