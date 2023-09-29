import { ShowAll } from "./ShowAll";
import App from "../App.tsx";
import { Home } from "./Home";
import { Search } from "../pages/Search";

export const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            {index: true, element: <Home/>},
            {path: '/search', element: <Search/>},
            {path: '/:collectionId', element: <ShowAll/>}
        ]
    }
]