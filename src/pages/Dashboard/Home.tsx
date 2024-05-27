import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Description } from "./components/Description";

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: CSSProperties = {
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

const thumbInner: CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img: CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
};

const baseStyle: CSSProperties = {
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
  justifyContent: "center",
  marginTop: 10,
  marginBottom: 15,
  //   width: "400px",
  //   alignItems: "center",
};

const focusedStyle: CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: CSSProperties = {
  borderColor: "#ff1744",
};

interface IImage extends File {
  preview: string;
}

export const Home = () => {
  const [isDescriptionVisible, setDescriptionVisibility] = useState(false);
  const [files, setFiles] = useState<IImage[]>([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const handleDescribeImage = () => {
    setDescriptionVisibility(true);
  };

  return (
    <Box className="text-center my-[50px]">
      <Box className="my-10 ">
        <Typography variant="h4">
          {" "}
          Machine Learning Enabled Image Description{" "}
        </Typography>
        <Typography variant="body1" className="my-4">
          {" "}
          Generate description for any image using AI
        </Typography>
      </Box>
      <Box className="flex flex-col justify-center mx-4 md:mx-auto md:w-1/3  p-4 rounded-md border mx-auto ">
        <div className="text-left">
          <Typography variant="body1">Upload Image</Typography>
          <div
            {...getRootProps({
              style,
            })}
          >
            <Label htmlFor="picture"></Label>
            <Input id="picture" type="file" {...getInputProps()} />
            {thumbs.length ? (
              <aside style={thumbsContainer}>{thumbs}</aside>
            ) : (
              <Box className="text-center">
                <p>Click to upload </p>
                <p>or</p>
                <p>Drag & Drop files here</p>
              </Box>
            )}
          </div>
        </div>
        <Button onClick={handleDescribeImage}>Generate Description</Button>
        <Box>
          {isDescriptionVisible && (
            <Description text="The image is a QR code that can be scanned with a mobile device. The content instructs to scan the code. The image contains text and is a screenshot." />
          )}
        </Box>
      </Box>
    </Box>
  );
};
