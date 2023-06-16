import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { VENDAO_SVG } from "../assets/svg";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CustomAccordion = () => {

    const [expandedIndex, setExpandedIndex] = useState<any | null>(null);
  
    const handleAccordionItemClick = (index: any) => {
      if (index === expandedIndex) {
        // Collapse the clicked item if it's already expanded
        setExpandedIndex(null);
      } else {
        // Expand the clicked item
        setExpandedIndex(index);
      }
    };

    const items = [
        {
            title: 'What criteria does the DAO consider when evaluating project proposals for funding?',
            content: "The DAO evaluates project proposals based on factors like novelty, impact, team expertise, and alignment with our investment thesis."
        },
        {
            title: 'How long does the funding process typically take?',
            content: "The funding process duration can vary but typically takes around 4-6 weeks from the submission of a complete project proposal to the final funding decision."
        },
        {
            title: 'How can I track the progress and updates of the funded projects?',
            content: "Project updates and progress are shared through our online community platforms and regular reporting mechanisms to keep the DAO members informed."
        },
        {
            title: 'How does the DAO handle investment returns and profit-sharing with project teams?',
            content: "Returns and profit-sharing arrangements are detailed in custom funding agreements with each project team."
        }
    ];
  

    return (
      <Accordion defaultIndex={[]} allowMultiple>
        {items.map((item, index) => (
         <MotionBox
           key={index}
           as={motion.div}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.3 }}
           >
          <AccordionItem key={index} 
          bg="#F8F8F8"
          borderRadius="50px"
          border="0px"
          p="20px 10px"
          mt="16px"
          >
            <h2>
              <AccordionButton
                onClick={() => handleAccordionItemClick(index)}
                _expanded={{ bg: "none" }}
                w="100%" 
                h="80px"
                gap={20}
                _hover={{ bg: "none" }}
              >
                <Box flex="1" textAlign="left">
                  <Text fontSize="20px" fontWeight="700" fontFamily="Gopher">{item.title}</Text>
                </Box>
                <HStack
                  fontSize="1rem"
                  borderRadius="100px"
                  border="0.5px solid #9F9F9F"
                  p="6px"
                  transform={expandedIndex === index ? "rotate(45deg)" : ""}
                  transition="transform 0.3s"
                >
                 {VENDAO_SVG().accordionIcon()}
                </HStack>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={15} hidden={expandedIndex !== index}
            maxW="800px"
            textAlign="left"
            >
              {item.content}
            </AccordionPanel>
          </AccordionItem>
          </MotionBox>
        ))}
      </Accordion>
    );
  };
  
  export default CustomAccordion