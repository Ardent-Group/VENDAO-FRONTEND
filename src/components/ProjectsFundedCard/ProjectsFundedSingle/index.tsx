import { useState, useMemo, memo } from 'react';
import {
    Button, 
    Flex, 
    Image,
    Text,
    SimpleGrid, 
    HStack,
    Skeleton
  } from '@chakra-ui/react'
import { nanoid } from '@reduxjs/toolkit'
import { VENDAO_SVG } from '../../../assets/svg';
import { projectsfundeddetail } from '../../../utils/products'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useCallVendao from '../../../hooks/contract/useCallVendao';
import { FundedTemplate } from '../../FundedTemplate';

const ProjectsFunded = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const { ref, inView } = useInView({
      triggerOnce: true,
  });

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

  let getFundedLength:any;

  if(getLength) getFundedLength = Number(getLength[2])
  

  const startIndex = (currentPage - 1) * productsPerPage;

  const visibleProposals = useMemo(() => {
    if(getFundedLength <= productsPerPage){
      return startIndex + getFundedLength
    } else {
      if((startIndex + productsPerPage) > getFundedLength){
        return getFundedLength
      }else {
        return startIndex + productsPerPage
      }
    }
  }, [startIndex, getFundedLength])

  const getFundedProjects = () => {
    if (!visibleProposals) return null;

    const fundedProject:any[] = [];

    for(let i = visibleProposals - 1; i >= startIndex; i--){
      fundedProject.push(
        <FundedTemplate
         key={i}
         id={i}
        />
      )
    }

    return fundedProject;
  }
  


  const visibleProjects = projectsfundeddetail.slice(
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

  const totalPages = getFundedLength > 0 ? Math.ceil(getFundedLength / productsPerPage) : 1;

  return (
    <>
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={5}
     ref={ref}
     style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s" }}    
    >
      {
        getFundedLength > 0 ?
        getFundedProjects() :
        visibleProjects.map((e: any) => (
          <motion.div
           variants={fadeIn}
           initial="hidden"
           animate={inView ? "visible" : "hidden"}
           transition={{ duration: 0.5 }}
           key={nanoid()}
          >
         <Flex
           background="#F8F8F8"
           borderRadius="20px"
           p="20px 40px"
           w="100%"
           h="100%"
           flexDir="column"
           key={nanoid()}
           justify="center"
           alignItems="center"
          >
            <Skeleton h={"48px"} borderRadius={"20px"}>
             <Image src={e.projectLogo} alt="" h="48px" w="100px" />
            </Skeleton>
            <Skeleton h={"10px"} mt={"20px"}>
              <Text color="#404040"
              fontSize="14px"
              fontWeight="500"
              fontFamily="Gopher"
              mt="10px"
              >
                {e.name}
              </Text>
            </Skeleton>
            <Skeleton mt={"16px"} h={"25px"}>
              <Text color="#404040"
              fontSize="16px"
              fontWeight="500"
              fontFamily="Gopher2"
              mt="16px"
              >
                {e.desc}
              </Text>
            </Skeleton>    
             
     
             <Button
             mt="12px"
             borderRadius="10px"
             bg="#B5FF45"
             _hover={{ bg: "#D9D9D9" }}
             _focus={{ bg: "#8AE400" }}
             opacity={0.2}
             >
                 <Text color="#171717" fontWeight="700" fontSize="16px">Claim</Text>
             </Button>
          
         </Flex>
         </motion.div>
         ))
      }
    </SimpleGrid>

          {/* --------------------- Pagination ---------------------- */}
      <Flex justify="center" alignItems="center" mt="80px">
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

    </>
  )
}

export default memo(ProjectsFunded);
