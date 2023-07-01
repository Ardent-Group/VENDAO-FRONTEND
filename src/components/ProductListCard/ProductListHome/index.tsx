import React from 'react'
import {
    Button, 
    Flex, 
    Image,
    Text,
    SimpleGrid, 
    Divider,
    Skeleton
  } from '@chakra-ui/react'
import { VENDAO_SVG } from '../../../assets/svg'
import { productsDetail } from '../../../utils/products'
import { useNavigate } from 'react-router-dom'
import useCallVendao from '../../../hooks/contract/useCallVendao'
import { setLimit } from '../../../hooks/constants/helpers'
import ProposalTemplate from '../../ProposalTemplate'

const ProductListHome = () => {
  const limit = 3;


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

  const handleViewMore = () => {
    navigate('/productlist');
    window.scrollTo(0, 0); // Scroll to top
  };

  const handleClickView = (id: number) => {
    navigate(`/product/${id}`);
    // Scroll back to top
    window.scrollTo(0, 0);
  };

  const {data:getLength}:any = useCallVendao({
    functionName: "getLength"
  })
  let getPropLen:any;
  if(getLength) getPropLen = Number(getLength[0])
  
  const getProposalProjects = () => {
    if(!getPropLen) return null;

    const proposalProjects:any[] = [];

    for(let i = getPropLen - 1; i >= setLimit(getPropLen, limit); i--){
      proposalProjects.push(
        <ProposalTemplate
         key={i}
         id={i}
        />
      )
    }

    return proposalProjects;
  }
  
  return (
    <Flex flexDir="column">
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
      {
        getPropLen > 0 ?
        getProposalProjects() :
        productsDetail.map((e: any, id:any) => (
          <Flex
            border="0.5px solid #CFCFCF"
            _hover={{ border: "1.3px solid #84DB00" }}
            background=""
            borderRadius="20px"
            p="20px 40px"
            backgroundColor="white"
            w="100%"
            h="100%"
            flexDir="column"
            key={id}
           >
            {/* --------- status button ---------- */}
              <Button
               bg={getStatusColor(e.status)}
               _hover={{ bg: getStatusColor(e.status) }}
               borderRadius="10px"
               color={getStatusColorText(e.status)}
               w="96px"
               h="40px"
              >
                <Skeleton>
                  <Text fontSize="16px" fontWeight="500" fontFamily="Gopher">
                  {getStatusLabel(e.status)}
                  </Text>
                </Skeleton>
               
              </Button>
    
              <Flex
              mt="10px"
              justify="space-between"
              alignItems="center"
              >
                <Skeleton>
                  <Text fontFamily="Gopher" fontSize="20px" fontWeight="700">{e.name}</Text>
                  <Image src={e.productLogo} alt=""  />
                </Skeleton>
              </Flex>
              <Skeleton>
              <Text 
                fontFamily="Gopher"
                fontSize="16px"  
                fontWeight="700"
                lineHeight="20px" mt="20px"
                // maxW="600px"
                textAlign="start"
                >
                  {e.description}
                </Text>
              </Skeleton>
                <Divider border="0.5px solid #404040" mt="15px" />
    
               <Flex
                mt="20px"
                alignItems="center"
                justifyContent="space-between"
                >
                    <Flex flexDir="column">
                       <Text
                        fontFamily="Gopher" 
                        fontSize="16px"  
                        fontWeight="500"
                        lineHeight="20px" 
                        textAlign="start"
                       >
                        Equity offered
                       </Text>
                       <Skeleton>
                       <Text
                         fontFamily="Gopher2" 
                         fontSize="48px"  
                         fontWeight="700"
                         lineHeight="60px" 
                         mt="4px"
                        >
                         {e.equityOffered}
                        </Text>
                       </Skeleton>
                    </Flex>
    
                    <Button
                     borderRadius="10px"
                     bg="#B5FF45"
                     _hover={{bg: "#8AE400" }}
                     w="56px"
                     h="50px"
                     opacity={0.3}
                    >
                      {VENDAO_SVG().arrowRight()}
                    </Button>
    
                </Flex>
            </Flex> 
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

export default ProductListHome
