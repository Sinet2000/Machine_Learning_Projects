// Predict.container.tsx
import { connect } from "react-redux";
import Predict from "./Predict";
import { predictValue } from "../../store/actions";
import { RootState } from "../../store/index";

const mapStateToProps = (state: RootState) => ({
  imageData: state.imageData,
  predictedValue: state.predictedValue,
});

const mapDispatchToProps = {
  predictValue,
};

export const PredictContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Predict);
