import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Component/Home/Home';
import About from './Component/About/About';
import Layout from './Component/Layout/Layout';
import MovieDetails from './Component/Home/MovieDetails'; // Import MovieDetails component

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "movie/:movieId", element: <MovieDetails /> } // Add route for MovieDetails
    ]
  }
]);

function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
