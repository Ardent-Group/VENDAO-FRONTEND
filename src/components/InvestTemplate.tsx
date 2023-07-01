import {
    Button,
    Divider,
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import { VENDAO_SVG } from "../assets/svg";
import useCallVendao from "../hooks/contract/useCallVendao";
import { useCallback, useEffect, useState } from "react";
import { makeUrl } from "../hooks/constants/helpers";
import { useNavigate } from "react-router-dom";


interface investorTypes {
    name: string;
    logo: string;
    description: string;
    equity_offered: number;
}

const InvestTemplate = ({id}:any) => {
    const navigate = useNavigate();
    const [investor, setInvestor] = useState<investorTypes>({
        name: "",
        logo: "",
        description: "",
        equity_offered: 0,
    })

    const handleClickView = () => {
        navigate(`/investor/${id}`)
        // Scroll back to top
        window.scrollTo(0, 0);
    }

    const { data }:any = useCallVendao({
        functionName: "proposalsToInvest",
        args: [
            id.toString()
        ]
    })

    const getInvestorData = useCallback( async () => {
        if(data){
            const url = makeUrl(data[0])
            const respond = await fetch(url);
            const metadata = await respond.json();

            setInvestor({
                name: metadata.name,
                logo: makeUrl(metadata.image),
                description: metadata.description,
                equity_offered: Number(data[6]) / 1e18,
            })

        }
    }, [data])

    useEffect(() => {
        getInvestorData();

    }, [getInvestorData])
    

    return (
        <Flex
        border="0.5px solid #CFCFCF"
        _hover={{ border: "1.3px solid #84DB00" }}
        background=""
        borderRadius="20px"
        p="20px"
        backgroundColor="white"
        w="289px"
        h="100%"
        flexDir="column"
        >
            <Flex
            justify="space-between"
            alignItems="center"
            >
                <Text fontFamily="Gopher" fontSize="18px" fontWeight="700">{investor.name}</Text>
                <Image src={investor.logo} alt="" />
            </Flex>
            <Text
            fontFamily="Gopher"
            fontSize="16px"  
            fontWeight="600"
            lineHeight="20px" 
            mt="10px"
            textAlign="start"
            >
            </Text>
            <Divider border="0.5px solid #404040" mt="15px" />
            <Flex>
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
                    fontSize="20px"  
                    fontWeight="700"
                    lineHeight="60px" 
                    mt="4px"
                    >
                        {Number(investor.equity_offered.toFixed()).toLocaleString()}
                    </Text>
                </Flex>
                <Button
                borderRadius="10px"
                bg="#B5FF45"
                _hover={{bg: "#8AE400" }}
                w="56px"
                h="50px"
                onClick={() => handleClickView()}
                >
                    {VENDAO_SVG().arrowRight()}
                </Button>
            </Flex>
        </Flex>
    );
}

export default InvestTemplate;