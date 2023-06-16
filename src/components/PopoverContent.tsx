import { useState } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react';
import { VENDAO_SVG } from '../assets/svg';

const PopoverWithMouseover = ({ popoverContent }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
         bg="none"
        _hover={{bg: "none"}}
        >
          {VENDAO_SVG().infoIcon()}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
       bg="#F8F8F8" 
       border="0.5px solid #D7D7D7"
       borderRadius="10px"
       w="256px"
      >
        <PopoverBody
        fontWeight="500"
        maxW="400px"
        fontSize="10px"
        >
          {popoverContent}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWithMouseover;
