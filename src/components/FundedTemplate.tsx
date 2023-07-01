import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    Button,
    Flex,
    Image,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import Claim from "./Modals/Claim";
import useCallVendao from "../hooks/contract/useCallVendao";
import { useCallback } from "react";
import { hexToDecimal, makeUrl } from '../hooks/constants/helpers';

interface productProps {
    id: number;
}

interface projectDataTypes {
    logo: any;
    name: string;
    amount_funded: number;
}

export const FundedTemplate = (props:productProps) => {

    const {isOpen, onClose, onOpen} = useDisclosure();

    const [projectData, setProjectData] = useState<projectDataTypes>({
        logo: "",
        name: "",
        amount_funded: 0
    }) 

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const { inView } = useInView({
        triggerOnce: true
    })

    const { data }:any = useCallVendao({
        functionName: "projectFunded",
        args: [
            props.id
        ]
    })
    

    const getFundedProject = useCallback( async () => {
        if(data){
            const url = makeUrl(data[0]);
            const respond = await fetch(url);
            const metadata = await respond.json();

            setProjectData({
                logo: makeUrl(metadata.image),
                name: metadata.name,
                amount_funded: hexToDecimal(data[1]?._hex)
            })
        }

    }, [data])

    useEffect(() => {
        getFundedProject();

    }, [getFundedProject]) 

    return (
        <>
            <motion.div
             variants={fadeIn}
             initial="hidden"
             animate={inView ? "visible" : "hidden"}
             transition={{duration: 0.5 }}
            >
                <Flex
                 background="#F8F8F8"
                 borderRadius="20px"
                 p="20px 40px"
                 w="100%"
                 h="100%"
                 flexDir="column"
                 justify="center"
                 alignItems="center"
                >
                    <Image src={projectData.logo} alt="" h="48px" w="100px" />
                    <Text
                     color="#404040"
                     fontSize="14px"
                     fontWeight="500"
                     fontFamily="Gopher"
                     mt="10px"
                    >
                        {projectData.name}
                    </Text>
                    <Text
                     color="#404040"
                     fontSize="16px"
                     fontWeight="500"
                     fontFamily="Gopher2"
                     mt="10px"
                    >
                        Amount funded ${Number((projectData.amount_funded).toFixed()).toLocaleString()}
                    </Text>
                    <Button
                     mt="12px"
                     borderRadius="10px"
                     bg="#B5FF45"
                     _hover={{ bg: "#D9D9D9" }}
                     _focus={{ bg: "#8AE400" }}
                     onClick={onOpen}
                    >
                        <Text color="#171717" fontWeight="700" fontSize="16px">Claim</Text>
                    </Button>
                </Flex>
            </motion.div>

            <Claim
             isOpen={isOpen}
             onClose={onClose}
             claimId = {props.id}
            />
        </>
    );
}