import React from "react";
import { Container } from "@chakra-ui/react";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";

const file =
  "https://res.cloudinary.com/dlmzwvakr/image/upload/v1658736010/appsmiths/lmdthqsh4wjo43q02khv.pdf";
const type = "pdf";

const FileViewers = (image) => {
  console.log("viewer", image.imagefile);
  const onError = (e) => {
    //logger.logError(e, "error in file-viewer");
    console.log(e, "Error in file-viewer");
  };
  return (
    <Container overflow maxW="6xl">
      <FileViewer
        fileType={image.imagefile.url.split(".").pop()}
        filePath={image.imagefile.url}
        errorComponent={CustomErrorComponent}
        onError={onError}
      />
    </Container>
  );
};

export default FileViewers;
