import { Outlet } from 'react-router-dom';
import Notifications from './Notifications';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Main() {
    return (
      <>
        <div id='wrapper' className='flex flex-col h-screen justify-between'>
          <Navbar />
            <Notifications></Notifications>
            <Outlet/>
          <Footer />
        </div>
      </>
    );
  }
  