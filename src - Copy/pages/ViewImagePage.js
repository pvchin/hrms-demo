import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { viewImageState } from "../components/data/atomdata";

const ViewImagePage = () => {
  const [image, setImage] = useRecoilState(viewImageState);
  return (
    <Box>
      <Image
        src={image.preview}
        alt={image.name}
        display="block"
        w="auto"
        h="100%"
      />
    </Box>
  );
};

export default ViewImagePage;
