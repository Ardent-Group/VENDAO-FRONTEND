import { useState, memo, ChangeEvent, DragEvent } from 'react';
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
import { useDebounce, useDebouncedCallback } from 'use-debounce';

const AnimatedButton = motion(Button);


interface inputFileTypes {
  inputedLogo: File | null;
  inputedVideo: File | null;
  inputedDocument: File | null;
}

interface inputValueTypes {
  name: string;
  description: string;
  email: string;
  github: string;
  social_media: string;
  community: string;
  funding_amount: string;
  equity: string;
}

const MakeProposal = () => {

    const {root} = useMakeProposalStyles();

    const [inputFile, setInputFile] = useState<inputFileTypes>({
      inputedLogo: null,
      inputedVideo: null,
      inputedDocument: null
    })
    
    const [inputValue, setInputValue] = useState<inputValueTypes>({
      name: "",
      description: "",
      email: "",
      github: "",
      social_media: "",
      community: "",
      funding_amount: "",
      equity: ""
    })

    const [value] = useDebounce(inputValue, 1000);
    
    

    // --------------------- UPLOAD File Functionality -------------------------------    

    const handleFileInput = (event:ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      setInputFile({...inputFile, [event.target.name]: file})
    }

    const handleFileClick = (name:string) => {
      const fileInput = document.querySelector(`input[name=${name}]`) as HTMLInputElement
      fileInput?.click();
    }

    // --------------------- Input file functionality ------------------------------

    const handleChange = (e:any) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e:any) => {

    }


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

         <form onSubmit={() => console.log("hfj")}>

           {/* ------------------------ Project Name ------------------------- */}
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
              onChange={handleChange}
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
              name="description"
              p="10px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
              onChange={handleChange}
            />
          </FormControl>
           
           {/* ---------------------------- Upload Logo ----------------------------- */}
          <FormControl mb={5}>
          <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Upload your logo</FormLabel>
          <Box>
            <input name='inputedLogo' type="file" accept=".jpg, .png, .svg, .gif, .jpeg"  style={{ display: 'none' }} onChange={handleFileInput} />
            <Box
              id='drop_file'
              border="0.5px dashed #9F9F9F"
              borderRadius="20px"
              w="210px"
              p="20px"
              textAlign="center"
              onClick={() => handleFileClick("inputedLogo")}
              cursor="pointer"
            >
             {inputFile.inputedLogo ? (
               <Box>
                 <img src={URL.createObjectURL(inputFile.inputedLogo)} alt="Logo" width="200px" height="200px" />
                 <Button mt="4" bg="none" _hover={{ bg: "none" }}>
                    <Text color="#9F9F9F" fontWeight={500}>Change</Text>
                </Button>
               </Box>
             ) : (
               <Box>
                 <Button bg="none" _hover={{ bg: "none" }}>
                    {VENDAO_SVG().uploadIcon()}
                 </Button>
                 <Text mt="4" color="#9F9F9F" fontWeight={500}>Click to Upload file</Text>
               </Box>
             )}
           </Box>
          </Box>
          </FormControl>
           
           {/* --------------------------- Project Email ---------------------------- */}
          <FormControl id="email" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Project Mail</FormLabel>
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
              onChange={handleChange}
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
            <input name='inputedVideo' type="file" accept=".mp4,.gif,.mkv,.webm,.mov,.wmv,.avi,.flv" style={{ display: 'none' }} onChange={handleFileInput} />
             <Box
               border="0.5px dashed #9F9F9F"
               borderRadius="20px"
               w="210px"
               p="20px"
               textAlign="center"
               onClick={() => handleFileClick("inputedVideo")}
               cursor="pointer"
             >
               {inputFile.inputedVideo ? (
                 <Box>
                   <video src={URL.createObjectURL(inputFile.inputedVideo)} width="400px" height="300px" controls />
                   <Button mt="4" bg="none" _hover={{ bg: "none" }}>
                   <Text color="#9F9F9F" fontWeight={500}>Change</Text>
                   </Button>
                 </Box>
               ) : (
                 <Box>
                   <Button bg="none" _hover={{ bg: "none" }}>
                   {VENDAO_SVG().uploadIcon()}
                   </Button>
                   <Text mt="4" color="#9F9F9F" fontWeight={500}>Click to Upload file</Text>
                 </Box>
               )}
             </Box>
           </Box>
          </FormControl>

           {/* --------------------------- Upload Document --------------------------- */}
           <FormControl mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">
              <HStack gap={0}>
              <Text>Upload Document Backing Proposal</Text>
              <PopoverWithMouseover popoverContent="Present necessary document backing your project solution, equity offering to Ven DAO and detailed explanation on the necessary things to take note of. Must e in pdf format." />
              </HStack>
              </FormLabel>
            <Box>
              <input name='inputedDocument' type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileInput} />
              <Box
                border="0.5px dashed #9F9F9F"
                borderRadius="20px"
                w="210px"
                p="20px"
                textAlign="center"
                onClick={() => handleFileClick("inputedDocument")}
                cursor="pointer"
              >
                {inputFile.inputedDocument ? (
                  <Box>
                    <embed src={URL.createObjectURL(inputFile.inputedDocument)} type='application/pdf' width="100%" height="100%" />
                    <Button mt="4" bg="none" _hover={{ bg: "none" }}>
                    <Text color="#9F9F9F" fontWeight={500}>Change</Text>
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
              name="github"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
              onChange={handleChange}
            />
          </FormControl>

           {/* ------------------------- Social Media Link --------------------------------- */}
           <FormControl id="name" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Social Media Link</FormLabel>
            <Input
              type="text"
              name="social_media"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
              onChange={handleChange}
            />
          </FormControl>

             {/* ------------------------- Link To Community --------------------------------- */}
             <FormControl id="name" mb={5}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Link To Community</FormLabel>
            <Input
              type="text"
              name="community"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
              onChange={handleChange}
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
              type="number"
              name="funding_amount"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
              onChange={handleChange}
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
              type="number"
              name="equity"
              w="100%"
              h="53px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              required
              onChange={handleChange}
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
             type="submit"
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

export default memo(MakeProposal)

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