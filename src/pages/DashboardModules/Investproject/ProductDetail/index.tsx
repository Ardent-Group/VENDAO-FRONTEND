import React from 'react'
import {Box, 
    Button, 
    Flex, 
    HStack, 
    Text,
    Image,
    useDisclosure,
  } from '@chakra-ui/react'
import { ProductDetail, productsDetail } from '../../../../utils/products';
import { VENDAO_SVG } from '../../../../assets/svg';
import InvestProject from '../../../../components/Modals/InvestinaProject';

const ProductListDetail = ({setSelectedIndex}: any) => {

    const {isOpen, onClose, onOpen} = useDisclosure();

    const detail: ProductDetail | undefined = productsDetail.find((item: ProductDetail) => item.id === `${item.id}`);

    if (!detail) {
      // Handle case when detail is not found
      return <div>Detail not found</div>;
   }
    
  return (
    <Box>
      <Flex justify="start" flexDir="column">
       
       <HStack cursor="pointer"
        onClick={() => setSelectedIndex(0)}
       >
        <Flex>
        {VENDAO_SVG().arrowBackDashboard()}
        </Flex>
       </HStack>

      <Flex gap={10} flexDir="column-reverse" mt="30px">
         
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
      

        <Flex>
       <Flex
       flex="1 1"
       w="400px"
       h="400px"
       bg="rgba(217, 217, 217, 0.1)"
       backdropFilter="blur(5px)"
       borderRadius="20px"
       >
         <Text>Video display here</Text>
        </Flex>  
        </Flex> 

        <>
        {detail && (
        <Flex flexDir="column" flex="1 1">
           <HStack gap={20}>
         
            <Flex gap={10}>
             <Text color="#171717" fontFamily="Gopher" fontSize="48px" fontWeight="700">{detail.name}</Text>
             <Image src={detail.productLogo} alt=""  />
            </Flex>

           </HStack>
          <Text
           fontFamily="Gopher"
           fontSize="16px"  
           fontWeight="500"
           lineHeight="20px"
           mt="20px"
          >
           NFT Nexus is a cutting-edge web3 platform that revolutionizes the way digital assets are created, traded, and collected. Harnessing the power of non-fungible tokens (NFTs), NFT Nexus provides a seamless and secure ecosystem for artists, collectors, and enthusiasts to connect and engage with unique digital creations.
          </Text>

          <Flex justify="space-between">
            <Flex flexDir="column">
              <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Equity offered</Text>
              <Text fontSize="48px" fontFamily="Gopher2" fontWeight={700} color="#171717" mt="4px">{detail.equityOffered}</Text>
            </Flex>

            <Flex flexDir="column">
              <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Funding Amount</Text>
              <Text fontSize="48px" fontFamily="Gopher2" fontWeight={600} color="#171717" mt="4px">$200,00</Text>
            </Flex>

          </Flex>

        </Flex>
        )}
        </>
      </Flex>

      </Flex>

         <InvestProject 
          isOpen={isOpen}
          onClose={onClose}
         />
    </Box>
  )
}

export default ProductListDetail
