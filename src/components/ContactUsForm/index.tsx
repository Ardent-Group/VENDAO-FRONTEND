import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  Flex,
} from "@chakra-ui/react";

const ContactForm = () => {
  const [formData, setFormData] = useState<any | null>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission with a delay
    setTimeout(() => {
      // Do your form submission logic here
      // For now, I made use of console.log the form data
      console.log(formData);

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <Box maxW="md" mx="auto" p={4} mt="40px"
    >
      {isSubmitted ? (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Thank you for your message! The Team will get back to you shortly!
        </Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb={4}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="500">Name</FormLabel>
            <Input
              type="text"
              name="name"
              w="100%"
              h="44px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl id="email" mb={4}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="500">Email</FormLabel>
            <Input
              type="email"
              name="email"
              w="100%"
              h="44px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl id="message" mb={4}>
            <FormLabel fontFamily="Gopher" fontSize="16px" fontWeight="500">Your Message</FormLabel>
            <Textarea
              name="message"
              w="400px"
              p="10px"
              borderRadius="20px"
              border="0.5px solid #9F9F9F"
              _hover={{border: "1px solid #9F9F9F", outline: "none"}}
              _focus={{ outline: "none", boxShadow: "none", border: "2px solid #9F9F9F" }}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormControl>
          
          <Flex>
          <Button
            type="submit"
            bg="#B5FF45"
            borderRadius="10px"
            _hover={{  bg: "#B5FF45" }}
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Submit
          </Button>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default ContactForm;
