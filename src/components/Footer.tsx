import {useState} from 'react'
import { 
    Flex, 
    Text,
    Input, InputGroup, InputRightElement, IconButton,
    Alert, AlertIcon,
    chakra,
    Divider,
    HStack,
    Checkbox
  } from '@chakra-ui/react'
import ContainerWrapper from './ContainerWrapper';
import { Link } from 'react-router-dom';
import { VENDAO_SVG } from '../assets/svg';

const Footer = () => {

    const {root} = useFooterStyles();

    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (email.trim() === "") {
        return; // Do not submit if input is empty
      }

      setIsSubmitting(true);

      // Simulate form submission with a delay
      setTimeout(() => {
        // Do your form submission logic here
        // For now, I made use of console.log the form data
        console.log(email);
  
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 2000);
    };
  
    

  return (
    <Flex {...root}
    pb="100px"
    bgColor="#171717"
   >
     <ContainerWrapper>
    <Flex flexDir="column">
      <Flex flexDir="column">
        <Text color="white"
         fontSize="20px"
         fontWeight="700"
         lineHeight="25.2px"
         >
         Sign up to our newsletter:
        </Text>
        
        <Flex mt="40px" flexDir="column">
        {isSubmitted ? (
        <Alert status="success" mb={4} w="400px">
          <AlertIcon />
          You successfully signup for our newsletter!
        </Alert>
        ) : (
        <InputGroup w="600px">
            <Input
              type="text"
              placeholder="your@email.com"
              value={email}
              onChange={handleInputChange}
              _placeholder={{ fontSize: "62px", color: "#404040", fontWeight: "900", fontFamily: "Gopher"}}
               h="91px"
               fontSize="30px"
               color="white"
               border="0px"
              _hover={{ border: "0px", outline: "none", boxShadow: "none" }}
              _focus={{ border: "0px", outline: "none", boxShadow: "none" }}
              required
            />
            <InputRightElement width="4.5rem">
              <IconButton
                icon={VENDAO_SVG().arrowRightFooter()}
                bg="#404040"
                _hover={{ bg: "#404040" }}
                w="50px"
                h="50px"
                borderRadius="100px"
                aria-label="Submit"
                type="submit"
                //@ts-ignore
                isLoading={isSubmitting}
                onClick={handleSubmit}
              />
            </InputRightElement>
          </InputGroup>
      )}
        <Divider border="0.5px solid #404040" w="600px" />
        <HStack mt="28px">
          <Checkbox border="0.5px solid #404040" />
          <Text color="#404040">I have read and accept the{" "}<chakra.span color="white" textDecoration="underline">Terms & Privacy</chakra.span></Text>
        </HStack>
        </Flex>

        <Divider border="0.5px solid #404040" mt="80px" />

        <Flex justify="space-between" mt="52px" alignItems="center">
            <HStack>
              {VENDAO_SVG().logo2()}
            </HStack>

            <HStack gap={20}>
              <Flex flexDir="column">
               <Text color="white" cursor="pointer" fontWeight="700" fontSize="20px">About</Text>
               <Link to="#about"><Text color="white" cursor="pointer" fontWeight="500" fontSize="16px" mt="20px">About us</Text></Link>
               <Link to="#contactUs"><Text color="white" cursor="pointer" fontWeight="500" fontSize="16px" mt="20px">Contact us</Text></Link>
               <Link to="#faq"><Text color="white" cursor="pointer" fontWeight="500" fontSize="16px" mt="20px">FAQs</Text></Link>
              </Flex>

              <Flex flexDir="column">
                <Text color="white" cursor="pointer" fontWeight="700" fontSize="20px">Connect</Text>
                <Text color="white" cursor="pointer" fontWeight="500" fontSize="16px" mt="20px">DAOVentures@gmail.com</Text>
                <Text color="white" cursor="pointer" fontWeight="500" fontSize="16px" mt="20px">Linkedln</Text>
                <Text color="white" cursor="pointer" fontWeight="500" fontSize="16px" mt="20px">Twitter</Text>
              </Flex>
            </HStack>
        </Flex>

      </Flex>    
    </Flex>
  </ContainerWrapper>  
   </Flex>
  )
}

export default Footer

const useFooterStyles = () => {
    return {
      root: {
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

