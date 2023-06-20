import React, { useState } from 'react';
// import {
//     Box,
//     HStack,
//     Text,
//     VStack,
//     Flex,
//     Stack
//   } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import { nanoid } from '@reduxjs/toolkit';
// import { VENDAO_SVG } from '../../../assets/svg';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ isSidebarOpen, toggleSidebar }: any) => {

    // const {singleRouteStyle} = sidebarStyles();
    const [hoveredIcon, setHoveredIcon] = useState<any | null>(null);
    let navigate = useNavigate();

  const onMouseEnter = (iconComponent: any) => {
    setHoveredIcon(iconComponent);
  };

  const onMouseLeave = () => {
    setHoveredIcon(null);
  };

   
//   const dashboard_routes = [
//     {
//       route: "Dashboard",
//       icon: VENDAO_SVG().dashboardRouteIcon1({ onMouseEnter, onMouseLeave }),
//       view: "",
//     },
//     {
//       route: "Invest in a project",
//       icon: VENDAO_SVG().dashboardRouteIcon2({ onMouseEnter, onMouseLeave }),
//       view: "",
//     },
//     {
//       route: "Check DAO Vault",
//       icon: VENDAO_SVG().dashboardRouteIcon3({ onMouseEnter, onMouseLeave }),
//       view: "",
//     },
//     {
//       route: "Vote",
//       icon: VENDAO_SVG().dashboardRouteIcon4({ onMouseEnter, onMouseLeave }),
//       view: "",
//     },
//   ];

//   const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
//   const {root, rootBox, singleRouteStyle, leftSection, rightSection } = useStyles();

  return (
//     <motion.div
//     initial={{ width: isSidebarOpen ? '250px' : '70px' }}
//     animate={{ width: isSidebarOpen ? '250px' : '70px' }}
//     transition={{ duration: 0.3 }}
//     style={{ overflow: 'hidden' }}
//   >
//     <Box bg="#171717" p={4} w={['70px', '70px', '250px']} h="100vh" pos="relative">
//       <VStack spacing={4}>
//         {/* --------------- LOGO HERE ------------------ */}
//         <HStack>{isSidebarOpen && VENDAO_SVG().logo2() }</HStack>
//         {/* Menu Items */}

//         <Flex flexDir="column" mt="100px">
//           {dashboard_routes?.map((e, i) => (
//                 <Flex
//                  color="white"
//                   key={nanoid()}
//                   as={"button"}
//                   _hover={{ bg: isSidebarOpen ? "#242424" : 'none', color: "#B5FF45"}}
//                   transition="500ms ease-in-out"
//                   mt="20px"
//                   w="250px"
//                   p="20px"
//                   h="59px"
//                   justifyContent="start"
//                   alignItems="center"
//                   onMouseEnter={() => onMouseEnter(hoveredIcon)}
//                   onMouseLeave={onMouseLeave}
//                   // onClick={() => navigate(`${e.link}`)}
//                 >
//                    {/* {React.cloneElement(e.icon, { mr: '6px' })} */}
//                   <Box
//                     w={isSidebarOpen ? 'auto' : '200px'}
//                     display="flex"
//                     alignItems="center"
//                   >
//                    {React.cloneElement(e.icon)}
//                   </Box>
//                   <Text fontSize="18px" fontWeight={700} ml="6px" _hover={{color: "white"}}>{isSidebarOpen && e.route}</Text>
//                 </Flex>
//               ))}          
//         </Flex>
//       </VStack>

      
//       <Flex align="center"
//        position="absolute"
//        bottom={0}
//        mb="20px"
//       >
//         <HStack>
//           {VENDAO_SVG().facebookIcon()}
//           {VENDAO_SVG().linkedinIcon()}
//           {VENDAO_SVG().twitterIcon()}
//         </HStack>
//       </Flex>

//       {/* ------------------- Fix Arrow Toggle --------------------- */}
//       <Box
//       cursor="pointer"
//       onClick={toggleSidebar}
//       display={['none', 'none', 'block']}
//       position="absolute"
//       top={20}
//       right={isSidebarOpen ? '1' : '184px'}
//       transition="right 0.3s ease"
//       zIndex={1}
//     >
//       <HStack
//       >
//         {VENDAO_SVG().dashboardArrowRight()}
//       </HStack>
//     </Box>
//     </Box>

//     <Stack {...root}>
//           <Flex {...rootBox}>
//             {/* -----------------------------------LEFT SECTION---------------------------------------------- */}
//             <Flex {...leftSection} flexDir={"column"} p="30px">
             
//             </Flex>
//             {/* -----------------------------------LEFT SECTION---------------------------------------------- */}
//             <Flex {...rightSection} overflowY="scroll">
//               {dashboard_routes?.map(
//                 (e: any, i) => i === selectedRouteIndex && e.view
//               )}
//             </Flex>
//           </Flex>
//         </Stack>
    
//   </motion.div>
  <div></div>
  )
}

export default Sidebar

const useStyles = () => {
  return {
    root: {
      w: "100%",
      h: "600px",
      mt: "65px",
      pt: "2%",
      overflow: "hidden",
      bg: "white",
    },
    rootBox: {
      w: "100%",
      h: "100%",
      overflow: "hidden",
      borderWidth: "1px",
      borderColor: "#00000007",
    },
    leftSection: {
      h: "100%",
      w: "25%",
      bg: "#FFFFFF",
      boxShadow: "4px 0px 10px rgba(70, 70, 74, 0.05)"
    },
    rightSection: {
      h: "100%",
      w: "75%",
      // p: "3%",
    },
    singleRouteStyle: {
      w: "100%",
      h: "8%",
      //   bg: "red",
    //   borderBottomWidth: "1px",
    //   borderBottomColor: "#0000001C",
      align: "center",
      pl: "3%",
    },
  };
};
