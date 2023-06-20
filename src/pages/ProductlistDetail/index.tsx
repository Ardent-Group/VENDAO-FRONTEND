import React from 'react'
import {Box, 
    Button, 
    Flex, 
    HStack, 
    Text,
    Image
  } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import ContainerWrapper from '../../components/ContainerWrapper'
import Footer from '../../components/Footer'
import { VENDAO_SVG } from '../../assets/svg'
import { useNavigate } from 'react-router-dom'
import {ProductDetail, productsDetail} from '../../utils/products'

const ProjectListDetail = () => {

    const {root} = useProductListStyles();
    let navigate = useNavigate();

    const getStatusColor = (status: any) => {
      switch (status) {
        case "approved":
          return "#D9FFD6";
        case "rejected":
          return "#FFD6D6";
        case "pending":
          return "#FEFFD6";
        default:
          return "gray";
      }
    };
  
    const getStatusColorText = (status: any) => {
      switch (status) {
        case "approved":
          return "#4CDC3F";
        case "rejected":
          return "#F42C2C";
        case "pending":
          return "#D1D600";
        default:
          return "black";
      }
    };
    
    const getStatusLabel = (status: any) => {
      switch (status) {
        case "approved":
          return "Approved";
        case "rejected":
          return "Rejected";
        case "pending":
          return "Pending";
        default:
          return "Unknown";
      }
    };

    const detail: ProductDetail | undefined = productsDetail.find((item: ProductDetail) => item.id === `${item.id}`);

    if (!detail) {
      // Handle case when detail is not found
      return <div>Detail not found</div>;
   }
  
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

      <HStack gap={10} mt="30px">
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
            <Button
              bg={getStatusColor(detail.status)}
              _hover={{ bg: getStatusColor(detail.status) }}
              borderRadius="10px"
              color={getStatusColorText(detail.status)}
              w="96px"
              h="40px"
             >
            <Text fontSize="16px" fontWeight="500" fontFamily="Gopher">
             {getStatusLabel(detail.status)}
            </Text>
          </Button>
           </HStack>
          <Text
           fontFamily="Gopher"
           fontSize="16px"  
           fontWeight="700"
           lineHeight="20px"
           mt="20px"
           maxW="600px"
          >
          {detail.description}
          </Text>

          <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Equity offered</Text>

          <Text fontSize="48px" fontWeight={700} color="#171717" mt="4px">{detail.equityOffered}</Text>
        </Flex>
        )}
        </>
      </HStack>

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