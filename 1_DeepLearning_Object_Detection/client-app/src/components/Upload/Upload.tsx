import React, { useCallback } from "react";

interface Props {
  onFileUpload: (file: File) => void;
}

const Upload: React.FC<Props> = ({ onFileUpload }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        onFileUpload(event.target.files[0]);
      }
    },
    [onFileUpload]
  );

  return (
    <div>
      <input type="file" onChange={handleChange} />
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
