import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
  },
  linearProgress: {
    width: "100%",
    margin: theme.spacing(2),
  },
}));

interface Props {
  imageData: string | null;
  predictedValue: string | null;
  predictValue: (imageData: string) => void;
  loading: boolean;
  error: string | null;
}

const Predict: React.FC<Props> = ({
  imageData,
  predictedValue,
  predictValue,
  loading,
  error,
}) => {
  const classes = useStyles();
  const handlePredict = useCallback(() => {
    if (imageData) {
      predictValue(imageData);
    }
  }, [imageData, predictValue]);

  return (
    <div className={classes.container}>
      <Typography variant="h6">Predict</Typography>
      {loading && <LinearProgress className={classes.linearProgress} />}
      {error && <Typography color="error">{error}</Typography>}
      {predictedValue && (
        <Typography>Predicted value: {predictedValue}</Typography>
      )}
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={!imageData || loading}
        onClick={handlePredict}
      >
        Predict
      </Button>
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
