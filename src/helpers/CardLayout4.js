import React from "react";
import { Box} from "@chakra-ui/react"

const CardLayout3 = ({ title, children, handleClick }) => {
 
  return (
    <Box maxW="sm" borderColor="blue.500" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {children}
    </Box>
  );
};



export default CardLayout3;
