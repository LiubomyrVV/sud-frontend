import { Outlet } from 'react-router';
import './styles/App.css';
import { ROUTES } from './routes';
function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
