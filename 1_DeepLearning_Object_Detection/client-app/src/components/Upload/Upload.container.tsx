import { connect } from 'react-redux';
import Upload from './Upload';

const mapStateToProps = (state: RootState) => {
  return {
    imageData: state.imageData,
  };
};

const mapDispatchToProps = {
  updateImageData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
