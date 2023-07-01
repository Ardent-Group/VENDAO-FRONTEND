import {useMemo, useState} from 'react'
import {
    Button, 
    Flex, 
    Image,
    Text,
    SimpleGrid, 
    Divider,
    HStack,
    Skeleton
  } from '@chakra-ui/react'
import { VENDAO_SVG } from '../../../assets/svg'
import { productsDetail2 } from '../../../utils/products'
import useCallVendao from '../../../hooks/contract/useCallVendao'
import InvestTemplate from '../../../components/InvestTemplate'

const ProductListSingle = ({setSelectedIndex}: any) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;

  const handleClickView = () => {
    setSelectedIndex(1);
  }

  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll back to top
    window.scrollTo(0, 0); 
  };

  const { data:getLength }:any = useCallVendao({
    functionName: "getLength"
  })

  let getInvestorsLength:any;
  if(getLength) getInvestorsLength = Number(getLength[1])

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleInvestors = useMemo(() => {
    if(getInvestorsLength <= productsPerPage){
      return startIndex + getInvestorsLength
    } else {
      if((startIndex + productsPerPage) > getInvestorsLength){
        return getInvestorsLength
      }else {
        return startIndex + productsPerPage
      }
    }
  }, [startIndex, getInvestorsLength])



  const visibleProducts = productsDetail2.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
       // Scroll back to top
      window.scrollTo(0, 0); 
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
       // Scroll back to top
      window.scrollTo(0, 0); 
    }
  };

  const totalPages = getInvestorsLength > 0 ? Math.ceil(getInvestorsLength / productsPerPage) : 1;

  const getInvestors = () => {
    if(!visibleInvestors) return null;

    const investors:any[] = [];

    for(let i = visibleInvestors - 1; i >= startIndex; i--){
      investors.push(
        <InvestTemplate
        key={i}
        id={i}
        />
      )
    }
  }
  
  return (
    <Flex flexDir="column" mt="20px">
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
      {
        getInvestorsLength > 0 ?
        getInvestors() :
        visibleProducts.map((e: any) => (
          <Flex
            border="0.5px solid #CFCFCF"
            _hover={{ border: "1.3px solid #84DB00" }}
            background=""
            borderRadius="20px"
            p="20px"
            backgroundColor="white"
            w="289px"
            h="100%"
            flexDir="column"
            key={e.id}
           >   
            <Flex
            justify="space-between"
            alignItems="center"
            >
              <Skeleton h={"30px"}>
                <Text fontFamily="Gopher" fontSize="18px" fontWeight="700">{e.name}</Text>
              </Skeleton>
              <Skeleton borderRadius={"20px"}>
                <Image src={e.productLogo} alt=""  />
              </Skeleton>
            </Flex>
            <Skeleton mt={"10px"}>
              <Text fontFamily="Gopher"
              fontSize="16px"  
              fontWeight="600"
              lineHeight="20px" 
              mt="10px"
              // maxW="800px"
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
                  <Flex flexDir="column"
                  >
                      <Text
                      fontFamily="Gopher" 
                      fontSize="16px"  
                      fontWeight="500"
                      lineHeight="20px" 
                      >
                      Equity offered
                      </Text>
                      <Skeleton h={"20px"} mt={"20px"}>
                      <Text
                        fontFamily="Gopher2" 
                        fontSize="20px"  
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
                    onClick={() => handleClickView()}
                  >
                    {VENDAO_SVG().arrowRight()}
                  </Button>
  
              </Flex>
          </Flex> 
          ))
      }
     </SimpleGrid>

       {/* --------------------- Pagination ---------------------- */}
      <Flex justify="center" alignItems="center" mt="40px" mb="20px">
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
