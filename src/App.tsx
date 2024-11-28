import { RouterProvider } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Modal from '@/components/common/Modal';

import router from '@/routes/router';

import ReactQueryProvider from '@/providers/ReactQueryProvider';

import 'react-toastify/dist/ReactToastify.css';
import './styles/common.css';
import './styles/main.css';
import './styles/style.css';

function App() {
  return (
    <ReactQueryProvider>
      <Modal />
      <RouterProvider router={router} />
      <ToastContainer autoClose={5000} />
    </ReactQueryProvider>
  );
}

export default App;
