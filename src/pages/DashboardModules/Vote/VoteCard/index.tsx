import {useMemo, useState} from 'react'
import {
    Button, 
    Flex, 
    Text,
    SimpleGrid, 
    HStack,
    Skeleton
  } from '@chakra-ui/react'
 import { VENDAO_SVG } from '../../../../assets/svg';
import useCallVenVoting from '../../../../hooks/contract/useCallVenVoting';
import ContestantTemplate from '../../../../components/ContestantTemplate';

const VoteCard = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const votesPerPage = 9;

    const votelists = [
        {
            name: "Sophia Wilson",
            address: "0x1d9c6Fa4b235E5dA8C56304b18f99C08bDd94f90"
        },
        {
            name: "Sophia Wilson",
            address: "0x1d9c6Fa4b235E5dA8C56304b18f99C08bDd94f90"
        },
        {
            name: "Sophia Wilson",
            address: "0x1d9c6Fa4b235E5dA8C56304b18f99C08bDd94f90"
        },

    ]

    const { data:getLength }:any = useCallVenVoting({
      functionName: "contestantLength"
    })

    let getContestantLength:any;
    if(getLength) getContestantLength = Number(getLength)

    const startIndex = (currentPage - 1) * votesPerPage;
    const visibleContestant = useMemo(() => {
      if(getContestantLength <= votesPerPage){
        return startIndex + getContestantLength
      } else {
        if((startIndex + votesPerPage) > getContestantLength){
          return getContestantLength
        }else {
          return startIndex + votesPerPage
        }
      }
    }, [startIndex, getContestantLength])


    const visibleVotes = votelists.slice(
      startIndex,
      startIndex + votesPerPage
    );
  

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      // Scroll back to top
      window.scrollTo(0, 0); 
    };
  
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
    console.log(visibleContestant,getContestantLength, getLength, "sdk");
    
    const totalPages = getContestantLength > 0 ? Math.ceil(getContestantLength / votesPerPage) : 1;

    const getContestantData = () => {
      if(!visibleContestant) return null;

      const contestantList:any[] = [];

      for(let i = visibleContestant - 1; i >= startIndex; i--){
        contestantList.push(
          <ContestantTemplate
          key={i}
          id={i}
          />
        )
      }

      return contestantList;
    }

  return (
    <Flex flexDir="column" mt="20px">
     <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
      {
        getContestantLength > 0 ?
        getContestantData() :
        visibleVotes.map((e: any) => (
          <Flex
             border="0.5px solid #CFCFCF"
             _hover={{ border: "1.3px solid #84DB00" }}
             background=""
             borderRadius="20px"
             p="40px"
             alignItems="center"
             backgroundColor="white"
             w="289px"
             h="100%"
             flexDir="column"
             key={e.id}
            > 
              <Skeleton>
                <Text color="#171717" fontSize="20px" fontFamily="Gopher2" fontWeight="700">{e.name}</Text>
              </Skeleton> 
              <Skeleton mt={8}>
              <Text maxW="230px" textAlign="center" mt="20px">
               {e.address}
              </Text>
              </Skeleton>
     
              <Button
               borderRadius="10px"
               bg="#B5FF45"
               _hover={{ bg: "#8AE400" }}
               p="10px 16px"
               w="68px"
               h="40px"
               mt="30px"
               opacity={0.3}
               >
                 Vote
               </Button>
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
               ))
      }

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

export default VoteCard
