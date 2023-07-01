import {useState, useMemo} from 'react'
import {
    Button, 
    Flex, 
    Text,
    SimpleGrid, 
    HStack
  } from '@chakra-ui/react'
import { VENDAO_SVG } from '../../../assets/svg'
import useCallVendao from '../../../hooks/contract/useCallVendao'
import ProposalTemplate from '../../ProposalTemplate'

const ProductListSingle = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll back to top
    window.scrollTo(0, 0); 
  };
  const { data:getLength }:any = useCallVendao({
    functionName: "getLength"
  })

  let getProductLength:any;

  if(getLength) getProductLength = Number(getLength[0])
  

  const startIndex = (currentPage - 1) * productsPerPage;

  const visibleProposals = useMemo(() => {
    if(getProductLength <= productsPerPage){
      return startIndex + getProductLength
    } else {
      if((startIndex + productsPerPage) > getProductLength){
        return getProductLength
      }else {
        return startIndex + productsPerPage
      }
    }
  },
  [startIndex, getProductLength])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
       // Scroll back to top
      window.scrollTo(0, 0); 
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
       // Scroll back to top
      window.scrollTo(0, 0); 
    }
  };

  const totalPages = Math.ceil(getProductLength / productsPerPage);

  console.log(visibleProposals, "lo");
  

  const getProposalData = () => {
    if(!visibleProposals) return null;

    const proposeProject:any[] = [];

    for(let i = visibleProposals - 1; i >= startIndex; i-- ){
      proposeProject.push(
        <ProposalTemplate
         key={i}
         id={i}
        />
      )
    }

    return proposeProject;
  }
  
  
  return (
    <Flex flexDir="column" mt="20px">
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
      {
        getProposalData()
      }
     </SimpleGrid>

       {/* --------------------- Pagination ---------------------- */}
      <Flex justify="center" alignItems="center" mt="60px">
        <HStack alignItems="center">
          <Button
            bg="transparent"
            _hover={{ bg: '#D9D9D9', color: 'white' }}
            borderRadius="10px"
            w="50px"
            h="50px"
            p="10px 16px"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <HStack>{VENDAO_SVG().arrowLeft()}</HStack>
          </Button>

          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index + 1}
              bg="transparent"
              _hover={{ bg: '#171717', color: 'white' }}
              _focus={{ bg: '#171717', color: 'white' }}
              borderRadius="10px"
              w="50px"
              h="50px"
              p="10px 16px"
              onClick={() => handlePageChange(index + 1)}
              isActive={currentPage === index + 1}
            >
              <Text fontSize="16px" fontWeight="700" fontFamily="Gopher">
                {index + 1}
              </Text>
            </Button>
          ))}

          <Button
            bg="transparent"
            _hover={{ bg: '#D9D9D9', color: 'white' }}
            borderRadius="10px"
            w="50px"
            h="50px"
            p="10px 16px"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <HStack>{VENDAO_SVG().arrowRight2()}</HStack>
          </Button>
        </HStack>
      </Flex>

    </Flex>
  )
}

export default ProductListSingle
