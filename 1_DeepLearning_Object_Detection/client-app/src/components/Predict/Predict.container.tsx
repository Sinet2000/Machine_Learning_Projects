import { connect } from "react-redux";
import { predictValue } from "../../store/actions";
import Predict from "./Predict";

const mapStateToProps = (state: any) => {
  return {
    imageData: state.imageData.imageData,
    predictedValue: state.imageData.predictedValue,
    loading: state.imageData.loading,
    error: state.imageData.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    predict: (imageData: string) => dispatch(predictValue(imageData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Predict);
