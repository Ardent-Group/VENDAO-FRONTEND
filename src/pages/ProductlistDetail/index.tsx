import React from 'react'
import {Box, 
    // Button, 
    Flex, 
    HStack, 
    Text,
  } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import ContainerWrapper from '../../components/ContainerWrapper'
import Footer from '../../components/Footer'
import { VENDAO_SVG } from '../../assets/svg'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProjectListDetail = () => {

    const {root} = useProductListStyles();
    let navigate = useNavigate();

  return (
    <Box>
    {/* --------------------------------------NAVBAR------------------------------------- */}
      <Navbar />
    {/* --------------------------------------END-TAG-of-NAVBAR---------------------------  */}
    <Flex {...root}
     pb="100px"
     >
      <ContainerWrapper>
      <Flex justify="start" flexDir="column">
       
       <HStack cursor="pointer"
        onClick={() => navigate(-1)}
       >
        <Flex border="1px dashed">
        {VENDAO_SVG().arrowLeft()}
        </Flex>
        <Text fontSize="16px">Back</Text>
       </HStack>

      <Flex flexDir="column" mt="20px">
        <Text fontSize="48px" fontWeight={700} 
          lineHeight="60.48px" fontFamily="Gopher2" 
          mb="20px"
          >
           Product list
          </Text>
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.8 }}
          >
           <Text 
            fontSize="18px" 
            fontWeight="500"
            maxWidth="900px"
            textAlign="start"
            color="#404040"
            mb="40px"
           >
             Browse our product list below to learn more about each offering and how it can enhance your Web3 journey. Unleash the power of the decentralized web with our Web3 product suite.
           </Text>
         </motion.div>
        </Flex>

      </Flex>
      </ContainerWrapper>
      </Flex>
    <Footer />
   </Box>
  )
}

export default ProjectListDetail

const useProductListStyles = () => {
    return {
      root: {
        w: "100%",
        h: "100%",
        pt: "149px",
        px: {
          base: "0%",
          md: "5%",
        },
      },
      root2: {
        w: "100%",
        h: "100%",
        pt: "110px",
        px: {
          base: "0%",
          md: "5%",
        },
      },
    };
  };