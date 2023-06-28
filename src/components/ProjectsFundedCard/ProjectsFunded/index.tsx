import {
    Button, 
    Flex, 
    Image,
    Text,
    SimpleGrid, 
    useDisclosure
  } from '@chakra-ui/react'
import { nanoid } from '@reduxjs/toolkit'
import { projectsfundeddetail } from '../../../utils/products'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from 'react-router-dom';
import Claim from '../../Modals/Claim';
import useCallVendao from '../../../hooks/contract/useCallVendao';
import { hexToDecimal } from '../../../hooks/constants/helpers';
import { FundedTemplate } from '../../FundedTemplate';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProjectsFunded = () => {
  const projectFundedLimit = 8;

  const { ref, inView } = useInView({
      triggerOnce: true,
  });
  const {isOpen, onClose, onOpen} = useDisclosure();
  let navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/projects');
    window.scrollTo(0, 0); // Scroll to top
  };

  const { data:getLength }:any = useCallVendao({
    functionName: "getLength"
  })

  let getFundedLength:any;

  if(getLength) getFundedLength = hexToDecimal(getLength[2])


  const getFundedProjects = () => {
    if(!getFundedLength) return null;

    const fundedProject:any[] = [];

    let setLimit = Math.abs(getFundedLength - projectFundedLimit);
    for(let i = getFundedLength - 1; i >= setLimit; i--){
      fundedProject.push(
        <FundedTemplate
          key={i}
          id={i}
        />
      )
    }

    return fundedProject;

  }

  return (
    <Flex flexDir="column">
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={5}
     ref={ref}
     style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s" }}    
    >
      {
        getFundedProjects()
      }
    {projectsfundeddetail.map((e: any) => (
     <motion.div
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5 }}
      key={nanoid()}
     >
    <Flex
      background="#F8F8F8"
      borderRadius="20px"
      p="20px 40px"
      w="100%"
      h="100%"
      flexDir="column"
      key={nanoid()}
      justify="center"
      alignItems="center"
     >
        <Image src={e.projectLogo} alt="" h="48px" w="100px" />

        <Text color="#404040"
        fontSize="14px"
        fontWeight="500"
        fontFamily="Gopher"
        mt="10px"
        >
         {e.name}
        </Text>

        <Text color="#404040"
        fontSize="16px"
        fontWeight="500"
        fontFamily="Gopher2"
        mt="16px"
        >
         {e.desc}
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
    ))}
    </SimpleGrid>


    <Flex justify="center" alignItems="center" mt="32px">
     <Button
       bg="#B5FF45"
       _hover={{  bg: "#D9D9D9" }}
       _focus={{ bg: "#8AE400" }}
       borderRadius="10px"
       w="113px"
       h="40px"
       p="10px 16px"
       onClick={handleViewMore}
     >
        <Text fontSize="16px" fontWeight="700" fontFamily="Gopher">View more</Text>
      </Button>
     </Flex>
       
       {/* ------------------- Claim Modal ------------------- */}
      <Claim 
       isOpen={isOpen}
       onClose={onClose}
      />
    </Flex>
  )
}

export default ProjectsFunded
