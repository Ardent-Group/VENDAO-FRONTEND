import React from 'react'
import {Box, 
  Flex, 
  Text,
} from '@chakra-ui/react'
import ContainerWrapper from '../../components/ContainerWrapper'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductListSingle from '../../components/ProductListCard/ProductListSingle'
import { motion } from 'framer-motion'

const ProductList = () => {

  const {root} = useProductListStyles();

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
      <Flex flexDir="column">
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

        <ProductListSingle />
      </Flex>
      </ContainerWrapper>
      </Flex>
     <Footer />
    </Box>
  )
}

export default ProductList

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