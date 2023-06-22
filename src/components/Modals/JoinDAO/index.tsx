import { useEffect, useRef } from 'react'
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
    chakra,
    ModalCloseButton,
    Spinner, 
  } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { parseEther } from 'viem';
import useSendVendao from '../../../hooks/contract/useSendVendao';
import { useToast } from '@chakra-ui/react';

const AnimatedButton = motion(Button);

const JoinDAO = ({isOpen, onClose}: any) => {

  const toast = useToast();

  const DAO_FEE = parseEther("1");

  const { venWrite, venLoading, waitError, waitSuccess, waitLoading } = useSendVendao({
    functionName: "joinDAO",
    value: DAO_FEE
  })

  

  const handleSubmit = (e:any) => {
    e.preventDefault();

    venWrite?.();
  }

  useEffect(() => {
    let rerun:boolean = true;

    if(waitError && rerun) {
      toast({
        title: "Error",
        description: "Error joining Ven DAO",
        status: "error",
        duration: 5000,
        isClosable: true
      })
    } 
    if(waitSuccess && rerun) {
      toast({
        title: "Successfully Joined Vendao",
        description: "You have succesfully joined Ven DAO",
        status: "success",
        duration: 5000,
        isClosable: true
      })
    }
  
    return () => {
      rerun = false;
    }
  }, [waitError, waitSuccess])
  

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
                <Flex flexDir="column" my={"20px"}>
                  <Text color="16px" fontWeight="600">
                   You’d be required to deposit 30,000 FTM to join the DAO.
                   </Text>
                 </Flex>
                
                {/* ------------------------ JoinDAO button ------------------------ */}
                <Flex justify="center" alignItems="center">
                <AnimatedButton
                  bg="#B5FF45"
                  borderRadius="10px"
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
                  onClick={handleSubmit}
                  disabled={venLoading || waitLoading}
                >
                  {
                    (venLoading || waitLoading) ? <>Loading <Spinner ml={"10px"} size={"sm"} /> </> : "Join DAO" 
                  }
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
