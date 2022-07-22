import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Image,
  IconButton,
  HStack,
  VStack,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import pdfMake from "pdfmake/build/pdfmake";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { viewImageState } from "../components/data/atomdata";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

// interface IImageUpload {
// files: File[],
// onDrop: (acceptedFiles: File[]) => void
// }

const ImageUpload = ({ files, setFiles, onDrop }) => {
  const [image, setImage] = useRecoilState(viewImageState);
  const {
    isOpen: isViewImageOpen,
    onOpen: onViewImageOpen,
    onClose: onViewImageClose,
  } = useDisclosure();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragAccept, isDragReject]
  );

  const handleDelImage = (filename) => {
    const newfiles = files.filter((r) => r.name !== filename);
    setFiles((prev) => (prev = newfiles));
  };

  const handleViewImage = ({ preview, name }) => {
    const newImage = { url: preview, name: name };
    const oldImage = image.url;
    setImage((prev) => newImage);
    const type = preview.split(".").pop();
    onViewImageOpen();
    // if (type !== "pdf") {
    //   console.log("image");
    //   onViewImageOpen();
    // } else {
    //   var win = window.open("", "_blank");
    //   console.log("pdf");
    //   pdfMake.createPfg(preview).open({}, win);
    // }
  };

  // const thumbs = files.map((file) => (
  // <div style={thumb} key={file.name}>
  //   <div style={thumbInner}>
  //     <img
  //       alt={file.name}
  //       src={file.preview}
  //       style={img}
  //     />
  //   </div>
  //   </div>
  // ))

  const Thumbs = () => {
    return files.map((file) => {
      console.log("filename", file.name);
      <Box
        display="inline-flex"
        w="100%"
        h={150}
        mb={8}
        mr={8}
        p={4}
        border="1px solid #eaeaea"
        borderRadius={2}
        key={file.name}
      >
        <HStack p={5}>
          <Image
            src={file.preview}
            alt={file.name}
            display="block"
            w="auto"
            h="100%"
          />
          <VStack>
            <IconButton
              size="sm"
              aria-label="view image"
              icon={<FiEye />}
              onClick={() =>
                handleViewImage({ preview: file.preview, name: file.name })
              }
            />
            <IconButton
              size="sm"
              aria-label="delete image"
              icon={<FiTrash2 />}
              onClick={() => handleDelImage(file.name)}
            />
          </VStack>
        </HStack>
      </Box>;
    });
  };

  useEffect(
    () => () =>
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview)),
    [files]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files.</p>
      </div>
      <aside style={thumbsContainer}>
        {/* {<Thumbs />} */}
        {files
          .filter((rec) => rec.name !== undefined && rec.name !== null)
          .map((file) => {
            return (
              <Box
                display="inline-flex"
                w="100%"
                h={150}
                mb={8}
                mr={8}
                p={4}
                border="1px solid #eaeaea"
                borderRadius={2}
                key={file.name}
              >
                <HStack p={5}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    display="block"
                    w="auto"
                    h="100%"
                  />
                  <VStack>
                    <IconButton
                      size="sm"
                      aria-label="view image"
                      icon={<FiEye />}
                      onClick={() =>
                        handleViewImage({
                          preview: file.preview,
                          name: file.name,
                        })
                      }
                    />
                    <IconButton
                      size="sm"
                      aria-label="delete image"
                      icon={<FiTrash2 />}
                      onClick={() => handleDelImage(file.name)}
                    />
                  </VStack>
                </HStack>
              </Box>
            );
          })}
      </aside>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isViewImageOpen}
        onClose={onViewImageClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your images</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              display="inline-flex"
              w="100%"
              h="auto"
              mb={8}
              mr={8}
              p={4}
              border="1px solid #eaeaea"
              borderRadius={2}
            >
              <Image
                src={image.url}
                alt={image.name}
                display="block"
                w="auto"
                h="100%"
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onViewImageClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ImageUpload;
