import { RouterProvider } from 'react-router-dom';

import Modal from '@/components/common/Modal/Modal';

import router from '@/routes/router';

import ReactQueryProvider from '@/providers/ReactQueryProvider';

import './styles/common.css';
import './styles/main.css';
import './styles/style.css';

function App() {
  return (
    <ReactQueryProvider>
      <Modal />
      <RouterProvider router={router} />
    </ReactQueryProvider>
  );
}

export default App;
