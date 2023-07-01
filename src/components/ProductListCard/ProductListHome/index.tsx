import React from 'react'
import {
    Button, 
    Flex,
    Text,
    SimpleGrid
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import useCallVendao from '../../../hooks/contract/useCallVendao'
import { setLimit } from '../../../hooks/constants/helpers'
import ProposalTemplate from '../../ProposalTemplate'

const ProductListHome = () => {
  const limit = 3;
  let navigate = useNavigate();


  const handleViewMore = () => {
    navigate('/productlist');
    window.scrollTo(0, 0); // Scroll to top
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
        getProposalProjects()
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
