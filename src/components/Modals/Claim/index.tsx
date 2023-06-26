import { useEffect } from 'react'
import {
    Text,
    Modal,
    Button,
    Stack,
    ModalOverlay,
    ModalContent,
    ModalBody,
    HStack,
    useToast,
    Spinner
  } from '@chakra-ui/react';
import useSendVendao from '../../../hooks/contract/useSendVendao';

const Claim = ({isOpen, onClose, claimId}: any) => {

  const toast = useToast()

  const {venLoading, venWrite, waitError, waitSuccess, waitLoading} = useSendVendao({
    functionName: "claim",
    args: [
      claimId ? claimId.toString() : "0"
    ]
  })


  useEffect(() => {
    let rerun:boolean = true;

    if(waitError && rerun){
      toast({
        title: "Error",
        description: "Error Claiming Equity",
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
    if(waitSuccess && rerun){
      toast({
        title: "Successful",
        description: "Succesfully Claimed Equity",
        status: "success",
        duration: 5000,
        isClosable: true
      })
    }
  
    return () => {
      rerun = false;
    }

  }, [waitError, waitSuccess, toast])

  const handleSubmit = (e:any) => {
    e.preventDefault();

    venWrite?.();
  }

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
           onClick={handleSubmit}
           disabled={venLoading || waitLoading}
         >
          <Text color="#171717" fontWeight="700" fontSize="16px">
            {
              (venLoading || waitLoading) ? <>Loading <Spinner ml={"10px"} size={"sm"}/></>: "Claim"
            }
          </Text>
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
              disabled={venLoading || waitLoading}
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
