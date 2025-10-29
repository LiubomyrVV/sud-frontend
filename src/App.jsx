import { Outlet } from 'react-router';
import './styles/App.css';
import { ROUTES } from './routes';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
