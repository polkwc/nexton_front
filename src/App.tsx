import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutProvider } from './context/Layout';
import Main from './components/layout/Main';
import Products from './components/product/Products';
import About from './components/layout/About';

const routeConfig = [
  { path: '/', element: <Main /> },
  { path: '/about', element: <About /> },
  { path: '/products', element: <Products /> },
];

function App() {
  return (
    <div className="App">
      <LayoutProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Main />} >
                <Route path='/products' element={<Products />} />
                <Route path='/about' element={<About />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </LayoutProvider>
    </div>
  );
}

export default App;
