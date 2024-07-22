import { Link } from 'react-router-dom';

function Navbar() {
  return (
      <div className='bg-slate-200 p-2 m-2'>
         <div className="items-center justify-between w-full flex-auto">
          {/* <ul> */}
            <ul className="flex flex-col font-medium p-4  ">
              <li className='space-x-8 text-center'>
                <Link to='/'>
                  Home
                </Link>

                <Link to='products'>
                  Products
                </Link>

                <Link to='about'>
                  About
                </Link>
              </li>
            </ul>
          </div>
      </div>
  );
}
export default Navbar;
