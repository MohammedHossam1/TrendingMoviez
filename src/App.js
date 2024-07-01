import './App.css';
import {BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Component/Home/Home';
import About from './Component/About/About';
import Layout from './Component/Layout/Layout';
let routers=createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"about",element:<About/>}
  ]}
])
function App() {
  return<RouterProvider router={routers}></RouterProvider>
    }
export default App;
