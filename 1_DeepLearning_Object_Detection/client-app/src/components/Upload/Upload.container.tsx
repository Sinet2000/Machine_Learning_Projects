import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateImageData } from "../../store/actions";
import Upload from "./Upload";

export const UploadContainer: React.FC = () => {
  const dispatch = useDispatch();

  const handleFileUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          dispatch(updateImageData(reader.result as string));
        }
      };
      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  return <Upload onFileUpload={handleFileUpload} />;
};

export default UploadContainer;
