import { TodoPage } from 'pages/Todo';
import './App.scss';
import 'react-toastify/ReactToastify.min.css'
import './styles/toast.scss'
import { Layout } from './components/layout';
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <ToastContainer theme='colored' />
      <Layout>
        <TodoPage /> 
      </Layout>
    </>
  );
};

export default App;
