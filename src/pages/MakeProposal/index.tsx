import React, { useState, ChangeEvent, DragEvent } from 'react';
import {Box, 
    Button, 
    Flex, 
    HStack, 
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
     Radio, RadioGroup,
  } from '@chakra-ui/react'
import ContainerWrapper from '../../components/ContainerWrapper'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { VENDAO_SVG } from '../../assets/svg';
import PopoverWithMouseover from '../../components/PopoverContent'
import { motion } from 'framer-motion'

const AnimatedButton = motion(Button);

const MakeProposal = () => {

    const {root} = useMakeProposalStyles();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

    // --------------------- UPLOAD LOGO Functionality -------------------------------

    console.log(selectedFile, "jlk");
    

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      //@ts-ignore
      setSelectedFile(file);
    };
  
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };
  
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      setSelectedFile(file);
    };

    const handleBrowseClick = () => {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        fileInput?.click();

        console.log(fileInput, "dkfj");
        
     };

    // ---------------------- The end of Upload Logo -------------------------------------


    //----------------------- UPLOAD VIDEO Functionality ---------------------------------

    const handleVideoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
         //@ts-ignore
        setSelectedVideo(file);
    };

    const handleDragOverVideo = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDropVideo = (e: DragEvent<HTMLDivElement>) => {
       e.preventDefault();
       const file = e.dataTransfer.files?.[0];
        setSelectedVideo(file);
    };

    const handleBrowseVideoClick = () => {
      const videoInput = document.getElementById("video") as HTMLInputElement;
      // const videoInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      videoInput?.click();
    };

  return (
    <Box>
     {/* --------------------------------------NAVBAR------------------------------------- */}
       <Navbar />
     {/* --------------------------------------END-TAG-of-NAVBAR---------------------------  */}

     <Flex {...root}
     pb="100px"
     >
      <ContainerWrapper>
      <Flex justify="start" alignItems="center" flexDir="column">

        <Flex flexDir="column">
        <Text fontSize="48px" fontWeight={700} 
          lineHeight="60.48px" fontFamily="Gopher2" 
          mb="20px"
          >
           Make a proposal
          </Text>
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.8 }}
          >
           <Text 
            fontSize="18px" 
            fontWeight="500"
            maxWidth="800px"
            textAlign="start"
            color="#404040"
            mb="40px"
           >
             This is your opportunity to showcase your innovative ideas and strategic plans. 
             Submit your proposal today and let us help bring your vision to life.
           </Text>
         </motion.div>

         <form>
          <FormControl id="name" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Project Name</FormLabel>
            <Input
              type="text"
              name="name"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
            />
          </FormControl>
          
           {/* ------------------------ Project Description ------------------------- */}
          <FormControl id="message" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">
            <HStack gap={0}>
            <Text>Project Description</Text>
            <PopoverWithMouseover popoverContent="Provide a clear and detailed overview of your project, including objectives, target audience, unique features, and supporting documents or links. This will help us understand your vision and assess its potential for funding or support." />
            </HStack>
            </FormLabel>
            <Textarea
              name="message"
              p="10px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
            />
          </FormControl>
           
           {/* ---------------------------- Upload Logo ----------------------------- */}
          <FormControl mb={5}>
          <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Upload your logo</FormLabel>
          <Box>
            <input type="file" accept=".jpg, .png, .svg, .gif, .jpeg"  style={{ display: 'none' }} onChange={handleFileSelect} />
            <Box
              border="0.5px dashed #9F9F9F"
              borderRadius="20px"
              w="210px"
              p="20px"
              textAlign="center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
              cursor="pointer"
            >
             {selectedFile ? (
               <Box>
                 <img src={URL.createObjectURL(selectedFile)} alt="Logo" width="200px" height="200px" />
                 <Button mt="4" onClick={() => setSelectedFile(null)} bg="none" _hover={{ bg: "none" }}>
                    <Text color="#9F9F9F" fontWeight={500}>Remove</Text>
                </Button>
               </Box>
             ) : (
               <Box>
                 <Button bg="none" _hover={{ bg: "none" }}>
                    {VENDAO_SVG().uploadIcon()}
                 </Button>
                 <Text mt="4" color="#9F9F9F" fontWeight={500}>Click or Drag file here</Text>
               </Box>
             )}
           </Box>
          </Box>
          </FormControl>
           
           {/* --------------------------- Project Email ---------------------------- */}
          <FormControl id="email" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Project Mail (Optional)</FormLabel>
            <Input
              type="email"
              name="email"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
            />
          </FormControl>
           
           {/* ---------------------------- Upload Video ----------------------------- */}
          <FormControl mb={5}>
          <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">
            <HStack gap={0}>
            <Text>Upload your video</Text>
            <PopoverWithMouseover popoverContent="Present your project through a captivating video. Share its unique features, value proposition, and your passion. Upload a video file that showcases the essence of your venture." />
            </HStack>
            </FormLabel>
           <Box>
            <input id='video' type="file" accept=".mp4,.gif,.mkv,.webm,.mov,.wmv,.avi,.flv" style={{ display: 'none' }} onChange={handleVideoSelect} />
             <Box
               border="0.5px dashed #9F9F9F"
               borderRadius="20px"
               w="210px"
               p="20px"
               textAlign="center"
               onDragOver={handleDragOverVideo}
               onDrop={handleDropVideo}
               onClick={handleBrowseVideoClick}
               cursor="pointer"
             >
               {selectedVideo ? (
                 <Box>
                   <video src={URL.createObjectURL(selectedVideo)} width="400px" height="300px" controls />
                   <Button mt="4" onClick={() => setSelectedVideo(null)} bg="none" _hover={{ bg: "none" }}>
                   <Text color="#9F9F9F" fontWeight={500}>Remove</Text>
                   </Button>
                 </Box>
               ) : (
                 <Box>
                   <Button bg="none" _hover={{ bg: "none" }}>
                   {VENDAO_SVG().uploadIcon()}
                   </Button>
                   <Text mt="4" color="#9F9F9F" fontWeight={500}>Click or Drag file here</Text>
                 </Box>
               )}
             </Box>
           </Box>
          </FormControl>
           
           {/* ------------------------- Github link --------------------------------- */}
          <FormControl id="name" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Github Link</FormLabel>
            <Input
              type="text"
              name="name"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
            />
          </FormControl>

           {/* ------------------------- Social Media Link --------------------------------- */}
           <FormControl id="name" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Social Media Link</FormLabel>
            <Input
              type="text"
              name="name"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
            />
          </FormControl>

             {/* ------------------------- Link To Community --------------------------------- */}
             <FormControl id="name" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Link To Community</FormLabel>
            <Input
              type="text"
              name="name"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
            />
          </FormControl>

           {/* ------------------------- Refi Based? ------------------------------------ */}
          <RadioGroup>
            <Flex mt="10px" mb={5} flexDir="column" gap="2">
            <Text fontSize="16px" fontWeight={600}>ReFi Based?</Text>
            <Radio value="yes" gap="2" border="1px solid #404040" colorScheme='green'>Yes</Radio>
            <Radio value="no" gap="2" border="1px solid #404040" colorScheme='green'>No</Radio>
            </Flex>
          </RadioGroup>

            {/* ------------------------- Funding Amount --------------------------------- */}
            <FormControl id="name" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">
            <HStack gap={0}>
            <Text>Funding Amount</Text>
            <PopoverWithMouseover popoverContent="Specify the funding you need for your project. This helps us understand your financial requirements and provide suitable support. Please provide a realistic funding target that aligns with the scope of your endeavor." />
            </HStack>
            </FormLabel>
            <Input
              type="text"
              name="name"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
            />
          </FormControl>

             {/* ------------------------- Amount Of Equity Offering --------------------------------- */}
            <FormControl id="name" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">
            <HStack gap={0}>
            <Text>Amount Of Equity Offering</Text>
            <PopoverWithMouseover popoverContent="Specify the equity percentage you are offering to investors. This represents their ownership share in your project. Please provide a compelling and aligned equity offering that reflects your funding needs and business goals." />
            </HStack>
            </FormLabel>
            <Input
              type="text"
              name="name"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
            />
          </FormControl>

          <AnimatedButton
             bg="#B5FF45"
             borderRadius="10px"
             w="158px"
             p="10px 16px"
             h="40px"
             mt="20px"
             _hover={{  bg: "#D9D9D9" }}
             _focus={{ bg: "#8AE400" }}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
            >
              Submit proposal
            </AnimatedButton>
            
          </form>
        </Flex>

      </Flex>
      </ContainerWrapper>
     </Flex>

     {/* -------------------------------------FOOTER--------------------------------------- */}
     <Footer />
     {/* -------------------------------------END-TAG-OF-FOOTER----------------------------- */}
    </Box>
  )
}

export default MakeProposal

const useMakeProposalStyles = () => {
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