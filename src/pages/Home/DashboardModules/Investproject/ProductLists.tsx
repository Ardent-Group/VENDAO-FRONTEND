import {useState} from 'react'
import {
    Button, 
    Flex, 
    Image,
    Text,
    SimpleGrid, 
    Divider,
    HStack
  } from '@chakra-ui/react'
import { VENDAO_SVG } from '../../../../assets/svg'
import { productsDetail2 } from '../../../../utils/products'

const ProductListSingle = ({setSelectedIndex}: any) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;

  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll back to top
    window.scrollTo(0, 0); 
  };

  const startIndex = (currentPage - 1) * productsPerPage;
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

  const totalPages = Math.ceil(productsDetail2.length / productsPerPage);

  const handleClickView = () => {
    setSelectedIndex(1);
    // Scroll back to top
    window.scrollTo(0, 0);
  };
  
  return (
    <Flex flexDir="column" mt="20px">
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
    {visibleProducts.map((e: any) => (
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
            <Text fontFamily="Gopher" fontSize="18px" fontWeight="700">{e.name}</Text>
             <Image src={e.productLogo} alt=""  />
          </Flex>

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

                   <Text
                     fontFamily="Gopher2" 
                     fontSize="20px"  
                     fontWeight="700"
                     lineHeight="60px" 
                     mt="4px"
                    >
                     {e.equityOffered}
                    </Text>
                </Flex>

                <Button
                 borderRadius="10px"
                 bg="#B5FF45"
                 _hover={{bg: "#8AE400" }}
                 w="56px"
                 h="50px"
                 onClick={() => handleClickView()}
                >
                  {VENDAO_SVG().arrowRight()}
                </Button>

            </Flex>
        </Flex> 
       ))}
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
