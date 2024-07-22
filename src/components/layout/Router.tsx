import { useRoutes } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import Products from "../product/Products";
import About from "./About";
 
export default function Router() {
    let element = useRoutes([
        {
            element: <Navbar />,
            children: [
                { path: "/", element: <Main /> },
                { path: "products", element: <Products /> },
                { path: "about", element: <About /> }
            ],
        },
        {
            path: '*',
            element: <div>404 Not Found</div>
        },
    ]);
 
    return element;
}