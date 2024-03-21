

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Projects from "./Containers/Projects/Projects";
import NewsPage from "./Containers/NewsPage/NewsPage";
import Layout from "./Containers/Layout/Layout";
import Page404 from "./Components/Errors/Page404";
import PathConstants from "./assets/pathConstants"
function App() {
  const router = createBrowserRouter([
    {
      // parent route component
      element: <Layout />,
      // child route components
      errorElement: <Page404 />,
      children: [
        {
          path: PathConstants.HOME,
          element: <NewsPage />,
        },

        {
          path: PathConstants.PROJECTS,
          element: <Projects />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
