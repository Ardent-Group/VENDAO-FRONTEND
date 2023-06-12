import {useState, useEffect} from 'react'
import { 
    Box, 
    Text,
    HStack,
    Button,
    Slide
 } from '@chakra-ui/react'
import ContainerWrapper from '../ContainerWrapper'
import {Link} from 'react-router-dom'
import { VENDAO_SVG } from '../../assets/svg'
import { nanoid } from "@reduxjs/toolkit";

const Navbar = () => {

    const tabs = [
      {
        name: "About",
        link: "#about"
      },
      {
        name: "Product list",
        link: "#productlist"
      },
      {
        name: "Projects",
        link: "#projects"
      },
      {
        name: "Make proposal",
        link: "#makeproposal"
      },
      {
        name: "FAQ",
        link: "#faq"
      },
      {
        name: "Contact us",
        link: "#contactUs"
      }
     
    ]

    const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
  
        setIsNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [prevScrollPos]);
  return (
    <Slide direction="top" in={isNavbarVisible} style={{ zIndex: 10 }}>
    <Box
    as="nav"
    bg="rgba(217, 217, 217, 0.1)"
    backdropFilter="blur(30px)"
    height="72px"
    width="100%"
    position="fixed"
    top="0"
    left="0"
    boxShadow="sm"
    transition="transform 0.4s ease-in-out"
    transform={isNavbarVisible ? "none" : "translateY(-100%)"}
    >
        <ContainerWrapper>
          <HStack h={"72px"} justify={"space-between"}>
            <Link to="/">{VENDAO_SVG().logo()}</Link>

            <HStack>
            {tabs.map((e) => (
              <Link to={e.link} key={nanoid()}>
                   <HStack
                  px="10px"
                  py="5px"
                  borderRadius={"50px"}
                >
                  <Text fontSize="16px" fontWeight={500}
                   >
                    {e.name}
                  </Text>
                </HStack>
              </Link>
             ))}
            </HStack>

            <HStack>
                <Button
                bg="transparent"
                p="10px 16px"
                h="40px"
                border="1.5px solid rgba(181, 255, 69, 1)"
                _hover={{ bg: "transparent" }}
                >
                    Connect Wallet
                </Button>
            </HStack>
          </HStack>
        </ContainerWrapper>
    </Box>
    </Slide>
  )
}

export default Navbar
