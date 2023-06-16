import React from 'react'
import {Box, 
  Flex, 
  Text,
} from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import ContainerWrapper from '../../components/ContainerWrapper'
import Footer from '../../components/Footer'
import ProjectsFunded from '../../components/ProjectsFundedCard/ProjectsFundedSingle'
import { motion } from 'framer-motion'

const Projects = () => {

  const {root} = useProjectsStyles();

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
      <Flex flexDir="column">
        <Text fontSize="48px" fontWeight={700} 
          lineHeight="60.48px" fontFamily="Gopher2" 
          mb="20px"
          >
           Projects
          </Text>
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.8 }}
          >
           <Text 
            fontSize="18px" 
            fontWeight="500"
            maxWidth="900px"
            textAlign="start"
            color="#404040"
            mb="40px"
           >
            Explore our funded projects, driving Web3 innovation with talented teams and transformative ideas. 
             our venture capital DAO supports groundbreaking ventures.
           </Text>
         </motion.div>
        </Flex>
          <ProjectsFunded />
      </Flex>
      </ContainerWrapper>
      </Flex>

    <Footer />
    </Box>
  )
}

export default Projects

const useProjectsStyles = () => {
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
