// Predict.container.tsx
import { connect } from "react-redux";
import Predict from "./Predict";

const mapStateToProps = (state: RootState) => {
  return {
    imageData: state.imageData,
    predictedValue: state.predictedValue,
  };
};

const mapDispatchToProps = {
  predictValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Predict);
