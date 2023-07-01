import Navbar from '../../components/Navbar'
import ContainerWrapper from '../../components/ContainerWrapper'
import Footer from '../../components/Footer'
import { VENDAO_SVG } from '../../assets/svg'
import { Link, useNavigate } from 'react-router-dom'
import {ProductDetail, productsDetail} from '../../utils/products'
import { useParams } from 'react-router-dom'
import {Box, 
  Button, 
  Flex, 
  HStack, 
  Text,
  Image,
  VStack
} from '@chakra-ui/react'
import useCallVendao from '../../hooks/contract/useCallVendao'
import { useCallback, useEffect, useState } from 'react'
import { makeUrl } from '../../hooks/constants/helpers'
import ReactPlayer from 'react-player'
import { getStatusColor, getStatusColorText, getStatusLabel } from '../../hooks/constants/helpers'
import { keccak256, toHex } from 'viem'
import useCallVenAccess from '../../hooks/contract/useCallVenAccess'
import { useAccount } from 'wagmi'


interface proposalsTypes {
  status: number;
  name: string;
  logo: any;
  description: string;
  video: any;
  document: any;
  equity_offered: number;
  funding_request: number;
  approval_count: number;
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
    funding_request: 0,
    approval_count: 0
  })

  const {id} = useParams()
  const { address } = useAccount();

  const NOMINATED_ADMINS: `0x${string}` = keccak256(toHex("NOMINATED_ADMINS"));

  const { data:venAccessRole }:any = useCallVenAccess({
    functionName: "hasRole",
    args: [
      NOMINATED_ADMINS,
      address
    ]
  })

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
        status: Number(data[5]),
        name: metadata.name,
        logo: makeUrl(metadata.image),
        video: makeUrl(metadata.properties.inputedVideo),
        document: makeUrl(metadata.properties.inputedDocument),
        description: metadata.description,
        equity_offered: Number(data[7]) / 1e18,
        funding_request: Number(data[6]) / 1e18,
        approval_count: Number(data[4])
      })

    }

  }, [data])

  useEffect(() => {
    getProjectData();
  }, [getProjectData])

    const {root} = useProductListStyles();
    let navigate = useNavigate();

  
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
      <HStack justifyContent={"space-between"}>
       <HStack 
        cursor="pointer"
        onClick={() => navigate(-1)}
       >
        <Flex border="1px dashed">
        {VENDAO_SVG().arrowLeft()}
        </Flex>
        <Text fontSize="16px">Back</Text>
       </HStack>
       <HStack>
        {
          venAccessRole && 
          <Button
          borderRadius={"10px"}
          border={"1px solid #B5FF45"}
          bg={"transparent"}
          w={"146px"}
          h={"40px"}
          p={"10px 16px"}
          _hover={{
            bg: "rgb(212, 212, 212, 0.2)"
          }}
          >
            Approve
          </Button>
        }
        <HStack fontWeight={"bold"}>
          <Text>Approval Count:</Text>
          <Text>{proposals.approval_count}</Text>
        </HStack>
       </HStack>
      </HStack>

      <HStack gap={10} mt="30px">
        <Flex>
          {
            proposals.video ?
            <VStack>
              <ReactPlayer
              url={proposals.video} 
              controls 
              width={"400px"} 
              height={"400px"}
              />
              <Box
               mt={4}
               width={"100%"}
              >
                <Link
                  to={proposals.document}
                  download={"proposal_document_VENDAO"}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button
                    width={"100%"}
                    bg={"transparent"}
                    border="2px solid #B5FF45"
                    p="10px 16px"
                    _hover={{
                      bg:"#B5FF45"
                    }}
                  >
                    Proposal Document
                  </Button>
                </Link>
              </Box>
            </VStack> :
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
        <>
        <Flex flexDir="column" flex="1 1">
          <HStack gap={20}>
            <Flex gap={10}>
              <Text color="#171717" fontFamily="Gopher" fontSize="48px" fontWeight="700">{proposals.name}</Text>
              <Image src={proposals.logo} alt="" width={"50px"} height={"50px"} style={{margin: "8px 0"}}/>
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
          <Flex justifyContent={"space-between"} pr={12}>
              <Box>
                <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Equity offered</Text>

                <Text fontSize="48px" fontWeight={700} color="#171717" mt="4px">{proposals.equity_offered.toLocaleString()}</Text>
              </Box>
              <Box>
                <Text color="#404040" fontWeight="500" fontSize="16px" mt="24px">Funding Request</Text>

                <Text fontSize="48px" fontWeight={700} color="#171717" mt="4px">{Number(proposals.funding_request.toFixed()).toLocaleString()}</Text>
              </Box>
          </Flex>
        </Flex>
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