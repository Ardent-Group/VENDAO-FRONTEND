import {
    Button, 
    Flex, 
    Image,
    Text,
    SimpleGrid, 
    useDisclosure,
    Skeleton
  } from '@chakra-ui/react'
import { nanoid } from '@reduxjs/toolkit'
import { projectsfundeddetail } from '../../../utils/products'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from 'react-router-dom';
import useCallVendao from '../../../hooks/contract/useCallVendao';
import { FundedTemplate } from '../../FundedTemplate';
import { setLimit } from '../../../hooks/constants/helpers';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProjectsFunded = () => {
  const limit = 8;

  const { ref, inView } = useInView({
      triggerOnce: true,
  });
  let navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/projects');
    window.scrollTo(0, 0); // Scroll to top
  };

  const { data:getLength }:any = useCallVendao({
    functionName: "getLength"
  })

  let getFundedLength:any;

  if(getLength) getFundedLength = Number(getLength[2])


  const getFundedProjects = () => {
    if(!getFundedLength) return null;

    const fundedProject:any[] = [];
    for(let i = getFundedLength - 1; i >= setLimit(getFundedLength, limit); i--){
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
        getFundedLength > 0 ?
        getFundedProjects() :

        projectsfundeddetail.map((e: any) => (
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
           <Skeleton h={"48px"} borderRadius={"20px"}>
             <Image src={e.projectLogo} alt="" h="48px" w="100px" />
           </Skeleton>
           <Skeleton h={"10px"} mt={"20px"}>
             <Text color="#404040"
             fontSize="14px"
             fontWeight="500"
             fontFamily="Gopher"
             mt="10px"
             >
              {e.name}
             </Text>
           </Skeleton>
           <Skeleton mt={"16px"} h={"25px"}>
             <Text color="#404040"
             fontSize="16px"
             fontWeight="500"
             fontFamily="Gopher2"
             mt="16px"
             >
              {e.desc}
             </Text>
           </Skeleton>
             
     
             <Button
             mt="12px"
             borderRadius="10px"
             bg="#B5FF45"
             _hover={{ bg: "#D9D9D9" }}
             _focus={{ bg: "#8AE400" }}
             opacity={0.2}
             disabled={true}
             >
                 <Text color="#171717" fontWeight="700" fontSize="16px">Claim</Text>
             </Button>
          
         </Flex>
         </motion.div>
         ))
      }
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
    </Flex>
  )
}

export default ProjectsFunded
