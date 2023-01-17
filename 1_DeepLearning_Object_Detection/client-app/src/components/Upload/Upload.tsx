import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    width: "100%",
    height: 200,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

interface Props {
  uploadImage: (imageData: string) => void;
}

const Upload: React.FC<Props> = ({ uploadImage }) => {
  const classes = useStyles();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': []
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const imageData = reader.result as string;
          uploadImage(imageData);
        }
      };
      reader.readAsDataURL(file);
    },
  });

  const onClick = useCallback(() => {
    (document.querySelector("input[type='file']") as HTMLInputElement).click();
  }, []);

  return (
    <>
      <div {...getRootProps({ className: classes.dropzone })} onClick={onClick}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <>
            <Typography variant="h6" component="h3">
              Drag 'n' drop image here, or click to select image
            </Typography>
            <Typography variant="subtitle1">
              Only .jpg format allowed
            </Typography>
          </>
        )}
      </div>
    </>
  );
};

export default Upload;




// import React, { useState } from "react";
// import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";

// const useStyles = makeStyles((theme) => ({
//   input: {
//     display: "none",
//   },
//   imagePreview: {
//     maxWidth: "100%",
//     maxHeight: "100%",
//   },
// }));

// interface Props {
//   setError: (error: string) => void;
//   setLoading: (loading: boolean) => void;
//   setImageData: (imageData: any) => void;
// }

// const Upload: React.FC<Props> = ({ setError, setLoading, setImageData }) => {
//   const classes = useStyles();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleUpload = async (file: File | null) => {
//     if (!file) {
//       setError("Please select an image to upload");
//       return;
//     }
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const response = await axios.post(
//         "http://localhost:5000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setImageData(file);
//     } catch (e) {
//       setError(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <input
//         accept="image/*"
//         className={classes.input}
//         id="contained-button-file"
//         multiple
//         type="file"
//         onChange={(e) => {
//           setSelectedFile(e.target.files?.[0]);
//         }}
//       />
//       <label htmlFor="contained-button-file">
//         <Button variant="contained" color="primary" component="span">
//           Select Image
//         </Button>
//       </label>
//       {selectedFile && (
//         <img
//           src={URL.createObjectURL(selectedFile)}
//           alt="Selected"
//           className={classes.imagePreview}
//         />
//       )}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => handleUpload(selectedFile)}
//       >
//         Upload
//       </Button>
//     </>
//   );
// };

// export default Upload;
