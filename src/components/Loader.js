import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';

function Loader(props) {
  return <TailSpin height="100" width="100" color="red" ariaLabel="loading" />;
}

export default Loader;
