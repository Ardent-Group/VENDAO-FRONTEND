import { Flex, Stack, Text, IconButton, Spinner, HStack, Button } from "@chakra-ui/react";
import {useState, Suspense, lazy} from 'react'
import { nanoid } from "@reduxjs/toolkit";
import { VENDAO_SVG } from "../../../../assets/svg";
import DashboardHome from "./main";
const InvestedProject = lazy(() => import("../Investproject/index"));
const ProductListDetail = lazy(() => import("../Investproject/ProductDetail/index"));
const DAOVault = lazy(() => import("../DAOVault/index"));
const Vote = lazy(() => import("../Vote/index"));

const Dashboard = () => {
  const { root, rootBox, leftSection, rightSection, singleRouteStyle } = useStyles();
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);


  const dashboard_routes = [
    {
      route: "Dashboard",
      view: (
        <Suspense key="1" fallback={<Spinner size="sm" />}>
        {
        //@ts-ignore
        selectedIndex === 0 ? <DashboardHome setSelectedIndex={setSelectedIndex} /> 
        //@ts-ignore
        : selectedIndex === 1 ? <ProductListDetail setSelectedIndex={setSelectedIndex} /> 
        : ""
        }
       </Suspense>
      ),
      icon: VENDAO_SVG().dashboardRouteIcon1(),
    },
    {
      route: "Invest in a Project",
      view: (
        <Suspense key="1" fallback={<Spinner size="sm" />}>
        {
        //@ts-ignore
        selectedIndex === 0 ? <InvestedProject setSelectedIndex={setSelectedIndex} /> 
        //@ts-ignore
        : selectedIndex === 1 ? <ProductListDetail setSelectedIndex={setSelectedIndex} /> 
        : ""
        }
       </Suspense>
      ),
      icon: VENDAO_SVG().dashboardRouteIcon2()
    },
    {
        route: "Check DAO Vault",
        view: (
            <Suspense key="1" fallback={<Spinner size="sm" />}>
            {
            //@ts-ignore
            selectedIndex === 0 ? <DAOVault setSelectedIndex={setSelectedIndex} /> 
            : ""
            }
           </Suspense>
          ),
        icon: VENDAO_SVG().dashboardRouteIcon3()
      },
      {
        route: "Vote",
        view: (
            <Suspense key="1" fallback={<Spinner size="sm" />}>
            {
            //@ts-ignore
            selectedIndex === 0 ? <Vote setSelectedIndex={setSelectedIndex} /> 
            : ""
            }
           </Suspense>
          ),
        icon: VENDAO_SVG().dashboardRouteIcon4()
      },
  ];

  return (
    <Flex flexDir={"column"}>
      {/* <Container> */}
        <Stack {...root}>
          <Flex {...rootBox}>
            {/* -----------------------------------LEFT SECTION---------------------------------------------- */}
            <Flex {...leftSection} flexDir={"column"} p="30px">
              <HStack>{VENDAO_SVG().logo2()}</HStack>

              <Flex mt="50px" flexDir="column">
              {dashboard_routes?.map((e, i) => (
                <Flex
                  key={nanoid()}
                  {...singleRouteStyle}
                  as={"button"}
                  onClick={() => setSelectedRouteIndex(i)}
                  bg={i === selectedRouteIndex ? "#242424" : "transparent"}
                  color={i === selectedRouteIndex ? "white" : ""}
                  _hover={{ borderRadius: `${i === selectedRouteIndex ? "0px" : ""}`,
                }}
                  transition="500ms ease-in-out"
                  mt="20px"
                  gap="5"
                >
                 <IconButton aria-label='icons' icon={e.icon} size={"20px"} />
                  <Text fontSize="20px"color="white">{e.route}</Text>
                </Flex>
              ))}
              </Flex>
               <HStack pt="100px">
                 <HStack>{VENDAO_SVG().facebookIcon()}</HStack>
                 <HStack>{VENDAO_SVG().linkedinIcon()}</HStack>
                 <HStack>{VENDAO_SVG().twitterIcon()}</HStack>
               </HStack>
            </Flex>
            {/* -----------------------------------LEFT SECTION---------------------------------------------- */}
            <Flex {...rightSection} overflowY="scroll" flexDir="column">
            <Flex justifyContent="flex-end" alignItems="center">
              <Button
               border="1px solid #000000"
               opacity="0.5"
               bg="transparent"
               color="black"
               >
               Contract address
             </Button>
             </Flex>
              {dashboard_routes?.map(
                (e, i) => i === selectedRouteIndex && e.view
              )}
            </Flex>
          </Flex>
        </Stack>
      {/* </Container> */}
    </Flex>
  );
};

export default Dashboard;

const useStyles = () => {
  return {
    root: {
      w: "100%",
      h: "100vh",
      overflow: "hidden",
      bg: "white",
    },
    rootBox: {
      w: "100%",
      h: "100%",
      overflow: "hidden",
    },
    leftSection: {
      h: "100vh",
      w: "25%",
      bg: "#171717",
      boxShadow: "4px 0px 10px rgba(70, 70, 74, 0.05)"
    },
    rightSection: {
      h: "100vh",
      w: "75%",
      p: "3%",
    },
    singleRouteStyle: {
      w: "100%",
      h: "59px",
      align: "center",
      pl: "3%",
    },
  };
};
