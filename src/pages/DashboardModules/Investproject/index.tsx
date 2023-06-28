import React from 'react'
import {Box, 
  Flex, 
  Text,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ProductListSingle from './ProductLists'

interface ProductListSingleProps {
  setSelectedIndex: (index: number) => void;
}

const Invest:React.FC<ProductListSingleProps> = ({ setSelectedIndex }) => {
  
  return (
    <Box flex="1" bg="white">
       <Flex flexDir="column">
        <Text fontSize="48px" fontWeight={700} 
          lineHeight="60.48px" fontFamily="Gopher2" 
          mb="20px"
          >
           Invest in a project
          </Text>
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.8 }}
          >
           <Text 
            fontSize="18px" 
            fontWeight="500"
            maxWidth="700px"
            textAlign="start"
            color="#404040"
            mb="40px"
           >
            Explore and invest in promising projects that align with your vision. Shape the future and grow your portfolio
            with informed investment decisions.
           </Text>
         </motion.div>
        </Flex>
         
        <ProductListSingle 
         //@ts-ignore
         setSelectedIndex={setSelectedIndex}  
        />
    </Box>
  )
}

export default Invest
