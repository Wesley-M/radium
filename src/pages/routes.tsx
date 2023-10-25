import { ShowAll } from "./ShowAll";
import App from "../App.tsx";
import { Home } from "./Home";
import { Search } from "../pages/Search";
import { ErrorPage } from "../pages/Error";

export const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Home/>},
            {path: '/search', element: <Search/>},
            {path: '/collections/:id', element: <ShowAll/>},
            {path: '/discover/:name', element: <ShowAll mode="auto"/>}
        ]
    }
]