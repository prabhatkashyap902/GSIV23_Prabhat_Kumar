import {  Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import List from './Components/List/List';
import Display from './Components/Display/Display';

const Router=createBrowserRouter([
  {
    path:"/",
    element: <Outlet/>,
    
    children:[
    {
      path:"/",
      element:<List/>
    },
    {
      path:":movie",
      element:<Display/>
    }
  ]
  }
])

function App() {
  return (
    <RouterProvider router={Router}/>
  );
}

export default App;
