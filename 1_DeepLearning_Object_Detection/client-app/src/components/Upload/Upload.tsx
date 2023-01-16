import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateImageData } from '../../store';
import { DropzoneArea } from 'material-ui-dropzone'

interface Props {
  // ...
}

const Upload: React.FC<Props> = () => {
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleDrop = (acceptedFiles: File[]) => {
    if(acceptedFiles.length){
      setImage(acceptedFiles[0]);
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = () => {
        if (reader.result) {
          const imageData = reader.result;
          dispatch(updateImageData(imageData as string));
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }

  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     const reader = new FileReader();
  //     reader.onabort = () => console.log("file reading was aborted");
  //     reader.onerror = () => console.log("file reading has failed");
  //     reader.onload = () => {
  //       // Do whatever you want with the file contents
  //       const binaryStr = reader.result;
  //       dispatch(updateImageData(binaryStr as string));
  //     };
  //     reader.readAsDataURL(file);
  //   },
  //   [dispatch]
  // );
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accept: "image/jpeg",
  // });

  return (
    <div>
      <DropzoneArea 
        onChange={handleDrop}
        acceptedFiles={['image/jpeg']}
        filesLimit={1}
        showPreviews={false}
        showPreviewsInDropzone={true}
        showAlerts={false}
      />
      {image && <img src={URL.createObjectURL(image)} alt="upload-preview" width={200} height={200}/>}
    </div>
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
