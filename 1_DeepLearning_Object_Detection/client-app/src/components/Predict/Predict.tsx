// Predict.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { predictValue } from "../../store/actions";

const Predict: React.FC = () => {
  const imageData = useSelector((state: RootState) => state.imageData);
  const predictedValue = useSelector(
    (state: RootState) => state.predictedValue
  );

  const handlePredictClick = () => {
    console.log("Should be fixed!");
    //predictValue(imageData);
  };

  return (
    <div>
      <button onClick={handlePredictClick}>Predict value</button>
      {predictedValue && <p>Predicted value: {predictedValue}</p>}
    </div>
  );
};

export default Predict;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   imagePreview: {
//     maxWidth: "100%",
//     maxHeight: "100%",
//   },
// }));

// interface Props {
//   imageData: any;
//   setError: (error: string) => void;
//   setLoading: (loading: boolean) => void;
// }

// const Predict: React.FC<Props> = ({ imageData, setError, setLoading }) => {
//   const classes = useStyles();
//   const [prediction, setPrediction] = useState("");

//   const handlePredict = async () => {
//     if (!imageData) {
//       setError("Please upload an image first");
//       return;
//     }
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", imageData);
//       const response = await axios.post(
//         "http://localhost:5000/predict",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setPrediction(response.data.prediction);
//     } catch (e) {
//       setError(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Button variant="contained" color="primary" onClick={handlePredict}>
//         Predict
//       </Button>
//       {prediction && <div>Predicted Value: {prediction}</div>}
//     </div>
//   );
// };

// export default Predict;
