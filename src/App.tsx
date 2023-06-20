import * as React from "react"
import './index.css'
import {
  ChakraProvider,
  Center,
  Text,
} from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import MakeProposal from "./pages/MakeProposal";
import ProductList from "./pages/ProductList";
import ProjectListDetail from "./pages/ProductlistDetail";
import DashboardPanel from "./pages/Home/DashboardModules/Dashboard";
import {theme} from './constants/theme'
import Mobile from './assets/json/mobile.json'
import { useWindowSize } from "rooks";
import Lottie from "lottie-react";
import Projects from "./pages/Projects";
// import { ColorModeSwitcher } from "./ColorModeSwitcher"
//<ColorModeSwitcher justifySelf="flex-end" />


export const App = () => {

  const { innerWidth }: any = useWindowSize();
  if (innerWidth < 930) {
    return (
      <>
        <Center w={"100%"} flexDir="column" px="3%">
          <Lottie animationData={Mobile} style={{ height: 400 }} />
          <Text fontSize={"20px"} textAlign="center" fontFamily="Gopher">
            Please open the page in a web browser, mobile view coming soon..
            Stay tuned with VenDAO!
          </Text>
        </Center>
      </>
    );
  }

  return (
  <ChakraProvider theme={theme}>
      <Router>
        <Routes>
         <Route index path="/" element={<Home />} />
          <Route path="/makeaproposal" element={<MakeProposal />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/product/:id" element={<ProjectListDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<DashboardPanel />} />
        </Routes>
       </Router>
  </ChakraProvider>
  )
 }
