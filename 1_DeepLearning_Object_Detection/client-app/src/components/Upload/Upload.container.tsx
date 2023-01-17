import { connect } from 'react-redux';
import { uploadImage } from '../../store/actions';
import Upload from './Upload';

const mapDispatchToProps = (dispatch: any) => {
return {
uploadImage: (imageData: string) => dispatch(uploadImage(imageData)),
};
};

export default connect(null, mapDispatchToProps)(Upload);