import {useEffect} from 'react'
import {Box, 
  Button, 
  Flex, 
  HStack, 
  Text,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import ContainerWrapper from '../../components/ContainerWrapper'
// import { animateScroll as scroll } from 'react-scroll';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { missiondetails } from '../../utils/missions';
import ProductListHome from '../../components/ProductListCard/ProductListHome'
import ProjectsFunded from '../../components/ProjectsFundedCard/ProjectsFunded';
import CustomAccordion from '../../components/CustomAccordion';
import ContactForm from '../../components/ContactUsForm';
import Footer from '../../components/Footer';
import JoinDAO from '../../components/Modals/JoinDAO';

const AnimatedButton = motion(Button);
const AnimatedText = motion(Box);

const Home = () => {

    const {root, root2} = useHomeStyles();
    const controls = useAnimation();
    const {isOpen, onClose, onOpen} = useDisclosure();
    let navigate = useNavigate();


    useEffect(() => {
      const handleScroll = () => {
        const scrollOffset = window.innerHeight * 0.7; 
        if (window.pageYOffset > scrollOffset) {
          controls.start({ opacity: 1, y: 0 });
        } else {
          controls.start({ opacity: 0, y: 20 });
        }
      };
    
      const handleScrollListener = () => {
        handleScroll();
      };
    
      window.addEventListener('scroll', handleScrollListener);
    
      return () => {
        window.removeEventListener('scroll', handleScrollListener);
      };
    }, [controls]);

    const { scrollYProgress } = useViewportScroll();

    useEffect(() => {
      const element = document.getElementById('animated-heading');
  
      const updateOpacity = () => {
        //@ts-ignore
        const scrollPosition = scrollYProgress.current;
        if (element) {
          element.style.opacity = scrollPosition <= 0.2 ? '1' : '0';
        }
      };
  
      updateOpacity();
  
      const unsubscribe = scrollYProgress.onChange(updateOpacity);
  
      return () => {
        unsubscribe();
      };
    }, [scrollYProgress]);

    const handleViewProposalpage = () => {
      navigate('/makeaproposal');
      // Scroll to top
      window.scrollTo(0, 0); 
    };

  return (
    <Box>
     {/* --------------------------------------NAVBAR------------------------------------- */}
      <Navbar />
     {/* --------------------------------------END-TAG-of-NAVBAR---------------------------  */}
       
      {/* --------------------------------------HERO-SECTION--------------------------------*/}
       <Flex {...root}
         bgColor="#D9D9D9"
         bgRepeat="no-repeat"
         bgSize="cover"
         bgImage="url('/images/homeImage.svg')"
         pb="187px"
       >
          <ContainerWrapper>
          <Flex justify="center" alignItems="center" flexDir="column" textAlign="center">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
         >
          <>
          {/* --------------------------- Text Title One ------------------------------ */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Text fontSize="72px" fontWeight={900}
          lineHeight="91px"
          fontFamily="Gopher2"
           >
            Unlocking Opportunities
        </Text>
        </motion.div>
        {/* ============================================================================== */}

        {/* --------------------------- Text Title two ------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
        <Text fontSize="72px" fontWeight={900}
        lineHeight="91px"
        fontFamily="Gopher2"
        textAlign="center"
         >
            In Web3 Ventures
        </Text>
        </motion.div>
         {/* ============================================================================== */}
        </>
        </motion.div>

        {/* --------------------------- Text Title three ------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
         >
           <Text 
            fontSize="18px" 
            mt="32px" 
            fontWeight="500"
            maxWidth="530px"
            textAlign="center"
            color="#404040"
           >
            We invests in teams building revolutionary products for the web3 ecosystem.
           </Text>
           </motion.div>
            {/* ============================================================================== */}

           <HStack gap="6" pt="32px">
           <AnimatedButton
            bg="#B5FF45"
            borderRadius="10px"
            w="102px"
            p="10px 16px"
            h="40px"
            _hover={{  bg: "#D9D9D9" }}
            _focus={{ bg: "#8AE400" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onOpen}
           >
           Join DAO
          </AnimatedButton>

             <AnimatedButton
               borderRadius="10px"
               border="2px solid #B5FF45"
               bg="transparent"
               w="146px"
               h="40px"
               p="10px 16px"
               whileHover={{ y: -2 }}
               whileTap={{ scale: 0.95 }}
               _focus={{ bg: "#8AE400", border: "0px" }}
               _hover={{ bg: "transparent", border: "2px solid #B5FF45" }}
               onClick={() => navigate("/makeaproposal")}
             >
              Make proposal
             </AnimatedButton>
           </HStack>
          </Flex>
          </ContainerWrapper>
       </Flex>
       {/* -----------------------------------END-TAG-OF-HERO-SECTION-------------------------*/}

        {/* ------------------------------------OUR-MISSION-SECTION-------------------------- */}
       <Flex {...root}
         pb="100px"
       >
          <ContainerWrapper>
          <Flex justify="center" alignItems="center" flexDir="column" textAlign="center"  id="about">
          
        <Box height="10px" /> 
       <AnimatedText
        opacity={0}
        y={20}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="48px" fontWeight={700}
          lineHeight="60.48px"
          fontFamily="Gopher2"
          mb="20px"
          >
            Our Mission
        </Text>
      </AnimatedText>

       <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
           <Text 
            fontSize="18px" 
            fontWeight="500"
            maxWidth="800px"
            textAlign="center"
            color="#404040"
           >
            Empowering web3 is our mission. We invest in and support
            founders while building public goods to grow the ecosystem. 
            Our work spans three key areas.
           </Text>
           </motion.div>
      
        <Flex mt="58px">
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
          {missiondetails.map((e: { num: string; title: string; subTitle: string }) => (
          <Flex
           border="0.5px solid #CFCFCF"
           background=""
           borderRadius="20px"
           p="20px 40px"
           backgroundColor="white"
           w="100%"
           h="353px"
           alignItems="start"
           justify="center"
           flexDir="column"
          >
            <Flex bg="#B5FF45" 
            borderRadius="20px"
            w="70px"
            h="70px"
            justifyContent="center"
            alignItems="center"
            >
              <Text fontFamily="Gopher" fontSize="20px" fontWeight="700">{e.num}</Text>
            </Flex>

            <Text fontFamily="Gopher2" fontSize="20px" fontWeight="700"
            lineHeight="25px" mt="50px"
            >
              {e.title}
            </Text>

            <Text fontFamily="Gopher" fontSize="16px" fontWeight="500"
            lineHeight="25px" mt="16px"
            textAlign="start"
            >
             {e.subTitle}
            </Text>
          </Flex>
           ))}
        </SimpleGrid>
        </Flex>

          </Flex>
          </ContainerWrapper>
       </Flex>
       {/* ----------------------------------END-TAG-OF-OUR-MISSION-SECTION--------------------*/}
       
       {/* ------------------------------------PRODUCT-LISTS-SECTION-------------------------- */}
       <Flex {...root2}
         pb="100px"
       >
          <ContainerWrapper>
          <Flex justify="center" alignItems="center" flexDir="column" textAlign="center">
          
        <Box height="20px" /> 
       <AnimatedText
        opacity={0}
        y={20}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="48px" fontWeight={700}
          lineHeight="60.48px"
          fontFamily="Gopher2"
          mb="20px"
          >
            Product lists
        </Text>
      </AnimatedText>

         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
         >
           <Text 
            fontSize="18px" 
            fontWeight="500"
            maxWidth="800px"
            textAlign="center"
            color="#404040"
           >
           Explore our Web3 product offerings - from DeFi 
           platforms to NFT marketplaces. Experience the future 
           of decentralized applications and digital assets.
           </Text>
           </motion.div>
      
        <Flex mt="58px">
          <ProductListHome />
        </Flex>

          </Flex>
          </ContainerWrapper>
          </Flex>
       {/* ------------------------------END-TAG-OF-PRODUCT-LISTS-SECTION---------------------- */}

        {/* ----------------------------------PROJECTS-FUNDED-SECTION-------------------------- */}
       <Flex {...root2}
         pb="100px"
         id="projects"
       >
          <ContainerWrapper>
          <Flex justify="center" alignItems="center" flexDir="column" textAlign="center">
          
        <Box height="20px" /> 
       <AnimatedText
        opacity={0}
        y={20}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="48px" fontWeight={700}
          lineHeight="60.48px"
          fontFamily="Gopher2"
          mb="20px"
          >
            Product Funded
        </Text>
      </AnimatedText>

       <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
           <Text 
            fontSize="18px" 
            fontWeight="500"
            maxWidth="800px"
            textAlign="center"
            color="#404040"
           >
          Explore our funded projects, driving Web3 innovation 
          with talented teams and transformative ideas. 
          our venture capital DAO supports groundbreaking ventures.
           </Text>
           </motion.div>
      
        <Flex mt="58px">
          <ProjectsFunded />
        </Flex>

          </Flex>
          </ContainerWrapper>
       </Flex>
       {/* ------------------------------END-TAG-OF-PROJECTS-FUNDED-SECTION---------------------- */}
       
       {/* ---------------------------------MAKE-A-PROPOSAL---------------------------- */}
       <Flex {...root2}
       pb="100px"
       bgColor="#171717"
       >
        <ContainerWrapper>
        <Flex justify="center" alignItems="center" flexDir="column" textAlign="center">
          
        <Box height="20px" /> 
       <AnimatedText
        opacity={0}
        y={20}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="48px" 
          fontWeight={700}
          color="white"
          lineHeight="60.48px"
          fontFamily="Gopher2"
          mb="20px"
          >
            Make a proposal
        </Text>
      </AnimatedText>

        <Text
        color="white"
        fontWeight="500"
        fontSize="16px"
        fontFamily="Gopher"
        >
        Welcome to the opportunity of a lifetime! We invite you to dive into
        the exciting realm of project proposals and unleash your innovative spirit. 
        This is your chance to grab the spotlight and captivate our community with your
        groundbreaking ideas. Take the stage and paint a vivid picture of the problem you're tackling, 
        the ingenious solution you've crafted, and the potential impact it can have on the world. 
        We want to see your vision shine through as you share your goals, milestones, 
        and the role our esteemed DAO can play in bringing your dreams to life. 
        So, roll up your sleeves, let your creativity run wild, and get ready to make waves 
        in the realm of decentralized innovation!
        </Text>

        <Button
        mt="32px"
        borderRadius="10px"
        bg="#B5FF45"
        _hover={{  bg: "#D9D9D9" }}
        _focus={{ bg: "#8AE400" }}
        onClick={handleViewProposalpage}
        >
            <Text color="#171717" fontWeight="700" fontSize="16px">Make a Proposal</Text>
        </Button>
      </Flex>
      </ContainerWrapper>
       </Flex>
       {/* ---------------------------------END-TAG-OF-MAKE-A-PROPOSAL---------------------------- */}

       {/* ------------------------------------FAQ-SECTION--------------------------------- */}
       <Flex {...root2}
       pb="100px"
       id="faq"
       >
        <ContainerWrapper>
        <Flex justify="center" alignItems="center" flexDir="column" textAlign="center">
          
        <Box height="20px" /> 
       <AnimatedText
        opacity={0}
        y={20}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="48px" 
          fontWeight={700}
          color="black"
          lineHeight="60.48px"
          fontFamily="Gopher2"
          mb="40px"
          >
           FAQs
        </Text>
      </AnimatedText>

        <>
        <CustomAccordion />
        </>

       </Flex>
       </ContainerWrapper>
       </Flex>
       {/* ------------------------------------END-TAG-OF-FAQ-SECTION--------------------------- */}

       <Flex {...root2}
        pb="100px"
        id="contactUs"
       >
         <ContainerWrapper>
        <Flex justify="center" alignItems="center" flexDir="column" textAlign="center">
          
        <Box height="20px" /> 
       <AnimatedText
        opacity={0}
        y={20}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="48px" 
          fontWeight={700}
          color="black"
          lineHeight="60.48px"
          fontFamily="Gopher2"
          mb="40px"
          maxW="400px"
          >
          Any question?
          We got you
        </Text>
      </AnimatedText>
         
       <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
           <Text 
            fontSize="18px" 
            fontWeight="500"
            maxWidth="800px"
            textAlign="center"
            color="#404040"
           >
            Reach out to us for any inquiries, partnership opportunities, 
            or to discuss how we can collaborate. We're here to listen, assist, 
            and provide the support you need.
           </Text>
           </motion.div>
        <>
        <ContactForm />
        </>
      
      </Flex>
      </ContainerWrapper>  
       </Flex>

       <Footer />

       {/* ------------------- JOINDAO MODAL ------------------------- */}
       <JoinDAO 
        isOpen={isOpen}
        onClose={onClose}
       />

    </Box>
  )
}

export default Home

const useHomeStyles = () => {
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
