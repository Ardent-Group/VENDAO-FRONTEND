import Navbar from '../../components/Navbar'
import ContainerWrapper from '../../components/ContainerWrapper'
import Footer from '../../components/Footer'
import { VENDAO_SVG } from '../../assets/svg'
import { useNavigate } from 'react-router-dom'
import {ProductDetail, productsDetail} from '../../utils/products'
import { useParams } from 'react-router-dom'
import {Box, 
  Button, 
  Flex, 
  HStack, 
  Text,
  Image
} from '@chakra-ui/react'
import useCallVendao from '../../hooks/contract/useCallVendao'
import { useCallback, useEffect, useState } from 'react'
import { hexToDecimal, makeUrl } from '../../hooks/constants/helpers'
import ReactPlayer from 'react-player'
import { getStatusColor, getStatusColorText, getStatusLabel } from '../../hooks/constants/helpers'


interface proposalsTypes {
  status: number;
  name: string;
  logo: any;
  description: string;
  video: any;
  document: any;
  equity_offered: number;
  funding_request: number;
}

const ProjectListDetail = () => {

  const [proposals, setProposals] = useState<proposalsTypes>({
    status: 0,
    name: "",
    logo: "",
    description: "",
    video: "",
    document: "",
    equity_offered: 0,
    funding_request: 0
  })

  const {id} = useParams()

  const {data}:any = useCallVendao({
    functionName: "projectProposals",
    args: [
      id
    ]
  })

  const getProjectData = useCallback(async () => {
    if(data){
      const url = makeUrl(data[0]);
      const respond = await fetch(url);
      const metadata = await respond.json();

      setProposals({
        status: hexToDecimal(data[5]?._hex),
        name: metadata.name,
        logo: makeUrl(metadata.image),
        video: makeUrl(metadata.properties.inputedVideo),
        document: makeUrl(metadata.properties.inputedDocument),
        description: metadata.description,
        equity_offered: hexToDecimal(data[7]?._hex),
        funding_request: hexToDecimal(data[6]?._hex)
      })

    }

  }, [data])

  useEffect(() => {
    getProjectData();
  }, [getProjectData])

    const {root} = useProductListStyles();
    let navigate = useNavigate();

    const getStatusColor = (status: any) => {
      switch (status) {
        case "approved":
          return "#D9FFD6";
        case "rejected":
          return "#FFD6D6";
        case "pending":
          return "#FEFFD6";
        default:
          return "gray";
      }
    };
  
    const getStatusColorText = (status: any) => {
      switch (status) {
        case "approved":
          return "#4CDC3F";
        case "rejected":
          return "#F42C2C";
        case "pending":
          return "#D1D600";
        default:
          return "black";
      }
    };
    
    const getStatusLabel = (status: any) => {
      switch (status) {
        case "approved":
          return "Approved";
        case "rejected":
          return "Rejected";
        case "pending":
          return "Pending";
        default:
          return "Unknown";
      }
    };

    const detail: ProductDetail | undefined = productsDetail.find((item: ProductDetail) => item.id === `${item.id}`);

    if (!detail) {
      // Handle case when detail is not found
      return <div>Detail not found</div>;
   }
  
  return (
    <Box>
    {/* --------------------------------------NAVBAR------------------------------------- */}
      <Navbar />
    {/* --------------------------------------END-TAG-of-NAVBAR---------------------------  */}
    <Flex {...root}
     pb="100px"
     >
      <ContainerWrapper>
      <Flex justify="start" flexDir="column">
       
       <HStack cursor="pointer"
        onClick={() => navigate(-1)}
       >
        <Flex border="1px dashed">
        {VENDAO_SVG().arrowLeft()}
        </Flex>
        <Text fontSize="16px">Back</Text>
       </HStack>

      <HStack gap={10} mt="30px">
        <Flex>
          {
            proposals.video ?
            <ReactPlayer
              url={proposals.video} 
              controls 
              width={"400px"} 
              height={"400px"}
            /> :
            <Flex
            flex="1 1"
            w="400px"
            h="400px"
            bg="rgba(217, 217, 217, 0.2)"
            backdropFilter="blur(5px)"
            borderRadius="20px"
            >
              <Text p="12px">Video</Text>
            </Flex>
          }
          
          
        </Flex> 
        {/* <>
        <Flex flexDir="column" flex="1 1">
          <HStack gap={20}>
            <Flex gap={10}>
              <Text color="#171717" fontFamily="Gopher" fontSize="48px" fontWeight="700">{proposals.name}</Text>
              <Image src={proposals.logo} alt="" />
            </Flex>
            <Button
             bg={getStatusColor(proposals.status)}
             _hover={{ bg: getStatusColor(proposals.status) }}
             borderRadius="10px"
             color={getStatusColorText(proposals.status)}
             w="96px"
             h="40px"
            >
              <Text fontSize="16px" fontWeight="500" fontFamily="Gopher">
                {getStatusLabel(proposals.status)}
             </Text>
            </Button>
          </HStack>
          <Text
           fontFamily="Gopher"
           fontSize="16px"
           fontWeight="700"
           lineHeight="20px"
           mt="20px"
           maxW="600px"
          >
            {proposals.description}
          </Text>

          <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Equity offered</Text>

          <Text fontSize="48px" fontWeight={700} color="#171717" mt="4px">{detail.equityOffered}</Text>
        </Flex>
        </> */}

        <>
        {detail && (
        <Flex flexDir="column" flex="1 1">
           <HStack gap={20}>
         
            <Flex gap={10}>
             <Text color="#171717" fontFamily="Gopher" fontSize="48px" fontWeight="700">{detail.name}</Text>
             <Image src={detail.productLogo} alt=""  />
            </Flex>
            <Button
              bg={getStatusColor(detail.status)}
              _hover={{ bg: getStatusColor(detail.status) }}
              borderRadius="10px"
              color={getStatusColorText(detail.status)}
              w="96px"
              h="40px"
             >
            <Text fontSize="16px" fontWeight="500" fontFamily="Gopher">
             {getStatusLabel(detail.status)}
            </Text>
          </Button>
           </HStack>
          <Text
           fontFamily="Gopher"
           fontSize="16px"  
           fontWeight="700"
           lineHeight="20px"
           mt="20px"
           maxW="600px"
          >
          {detail.description}
          </Text>

          <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Equity offered</Text>

          <Text fontSize="48px" fontWeight={700} color="#171717" mt="4px">{detail.equityOffered}</Text>
        </Flex>
        )}
        </>
      </HStack>

      </Flex>
      </ContainerWrapper>
      </Flex>
    <Footer />
   </Box>
  )
}

export default ProjectListDetail

const useProductListStyles = () => {
    return {
      root: {
        w: "100%",
        h: "100%",
        pt: "149px",
        px: {
          base: "0%",
          md: "5%",
        },
      },
      root2: {
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