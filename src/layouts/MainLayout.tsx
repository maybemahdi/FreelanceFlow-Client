import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar/Navbar';

const MainLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <div>
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default MainLayout;
