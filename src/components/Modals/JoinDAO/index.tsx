import React from 'react'
import {
    Flex, 
    Text,
    Modal,
    Button,
    Stack,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    chakra,
    // Radio, RadioGroup,
    FormControl,
    FormLabel, 
    ModalCloseButton, 
  } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const AnimatedButton = motion(Button);

const JoinDAO = ({isOpen, onClose}: any) => {

  return (
    <>
    <Modal
    isOpen={isOpen} onClose={onClose}
    closeOnOverlayClick={true}
    isCentered
    blockScrollOnMount={true}
    scrollBehavior={"inside"}
    motionPreset="scale"
   >
    <ModalOverlay bg="#00000020" backdropFilter="auto" backdropBlur="2px" />
    <ModalContent 
     borderRadius="20px"
     w={{ base: "80vw", md: "50vw" }}
     overflow="hidden"
     p="10px"
    >  
       <ModalHeader color="#07004D" fontSize="20px">Join{" "}<chakra.span color="#B5FF45">DAO</chakra.span></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Stack mb="20px">
                <form>
                <FormControl id="name" mb={2}>
                   <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="600">Name</FormLabel>
                   <Input
                     type="text"
                     name="name"
                     w="100%"
                     h="44px"
                     borderRadius="20px"
                     border="0.5px solid #9F9F9F"
                     _hover={{border: "1px solid #9F9F9F", outline: "none"}}
                     _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
                     //value={formData.name}
                     //onChange={handleChange}
                     required
                   />
                 </FormControl> 
                </form>

                <Flex flexDir="column">
                   {/* <Text color="16px" fontWeight="600">
                    You will be charged $131 for the purchase of accessibility NFT. Do you agree to this?
                   </Text>

                   <RadioGroup>
                      <Flex mt="10px" flexDir="column" gap="2">
                      <Radio value="yes" gap="2" border="1px solid #404040" colorScheme='green'>Yes</Radio>
                      <Radio value="no" gap="2" border="1px solid #404040" colorScheme='green'>No</Radio>
                     </Flex>
                  </RadioGroup> */}

                  <Text color="16px" fontWeight="600">
                   You’d be required to deposit an equivalent of $15,000 in FTM to join the DAO
                   </Text>
                 </Flex>
                
                {/* ------------------------ JoinDAO button ------------------------ */}
                <Flex justify="center" alignItems="center">
                <AnimatedButton
                  bg="#B5FF45"
                  borderRadius="10px"
                  w="102px"
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
                Join DAO
               </AnimatedButton>
               </Flex>
              
            </Stack>
        </ModalBody>
        </ModalContent>
       </Modal>
     </>
  )
}

export default JoinDAO
