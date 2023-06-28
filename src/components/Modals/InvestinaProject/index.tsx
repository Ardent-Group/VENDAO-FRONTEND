import React from 'react'
import {
    Text,
    Modal,
    Button,
    Stack,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    Flex,
    Input,
  } from '@chakra-ui/react';

const InvestProject = ({isOpen, onClose}: any) => {
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
    <ModalHeader color="#07004D" fontSize="20px">Invest in a Project</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
        <Stack mt="10px" mb="20px">
        <Text color="16px" fontWeight="600">
          Amount
         </Text>

         <Input 
            border="0.8px solid #B5FF45"
             outline="none"
            _focus={{ bg: "transparent", border: "2px solid #B5FF45", boxShadow: "none" }}
            _hover={{ bg: "transparent", border: "2px solid #B5FF45", boxShadow: "none" }}
         />

         <Flex mt="10px" justify="center" alignItems="center">
         <Button
           borderRadius="10px"
           bg="#B5FF45"
           _hover={{ bg: "#D9D9D9" }}
           _focus={{ bg: "#8AE400" }}
         >
           <Text color="#171717" fontWeight="700" fontSize="16px">Invest</Text>
          </Button>
         </Flex>
        </Stack>
      </ModalBody>
    </ModalContent>
    </Modal>
    </>
  )
}

export default InvestProject
