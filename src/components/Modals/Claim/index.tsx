import React from 'react'
import {
    Text,
    Modal,
    Button,
    Stack,
    ModalOverlay,
    ModalContent,
    ModalBody,
    HStack,
  } from '@chakra-ui/react';

const Claim = ({isOpen, onClose}: any) => {
  return (
    <>
    <Modal
    isOpen={isOpen} onClose={onClose}
    closeOnOverlayClick={true}
    isCentered
    blockScrollOnMount={true}
    scrollBehavior={"inside"}
    motionPreset="scale"
    size='sm'
   >
    <ModalOverlay bg="#00000020" backdropFilter="auto" backdropBlur="2px" />
    <ModalContent 
     borderRadius="20px"
     w={{ base: "80vw", md: "50vw" }}
     overflow="hidden"
     p="10px"
    >  
    <ModalBody>
        <Stack mt="20px" mb="20px" justify="center" alignItems="center">
        <Text color="16px" fontWeight="600">
          You are about to claim 50000 FTM
         </Text>

         <HStack mt="30px">
         <Button
           borderRadius="10px"
           bg="#B5FF45"
           _hover={{ bg: "#D9D9D9" }}
           _focus={{ bg: "#8AE400" }}
         >
           <Text color="#171717" fontWeight="700" fontSize="16px">Claim</Text>
          </Button>

            <Button
              borderRadius="10px"
              border="0.8px solid #B5FF45"
              bg="transparent"
              w="80px"
              h="40px"
              p="10px 16px"
              _focus={{ bg: "#8AE400", border: "0px" }}
              _hover={{ bg: "transparent", border: "2px solid #B5FF45" }}
              onClick={onClose}
            >
                Cancel
            </Button>
         </HStack>
        </Stack>
      </ModalBody>
    </ModalContent>
    </Modal>
    </>
  )
}

export default Claim
