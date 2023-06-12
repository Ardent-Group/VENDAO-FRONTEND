import {
    Button, 
    Flex, 
    Image,
    Text,
    SimpleGrid, 
  } from '@chakra-ui/react'
import { nanoid } from '@reduxjs/toolkit'
import { projectsfundeddetail } from '../../utils/products'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProjectsFunded = () => {

    const { ref, inView } = useInView({
        triggerOnce: true,
    });

  return (
    <>
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={5}
     ref={ref}
     style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s" }}    
    >
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
        _hover={{ bg:"#B5FF45" }}
        >
            <Text color="#171717" fontWeight="700" fontSize="16px">Claim</Text>
        </Button>
     
    </Flex>
    </motion.div>
    ))}
    </SimpleGrid>
    </>
  )
}

export default ProjectsFunded
