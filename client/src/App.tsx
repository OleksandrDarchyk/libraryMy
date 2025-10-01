import {createBrowserRouter, RouterProvider} from "react-router"
import Home from "./Components/Home.tsx";
import {useEffect} from "react";
import {authorApi} from "./baseURL.ts";

function App() {

    useEffect(()=> {
        authorApi.getAuthors()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    },[])

  return <RouterProvider router={createBrowserRouter([//
      {
          path: "/",
          element:<Home/>
      }
      ]
  )}/>

}

export default App
