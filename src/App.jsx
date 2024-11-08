

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Projects from "./Containers/Projects/Projects";
import NewsPage from "./Containers/NewsPage/NewsPage";
import Layout from "./Containers/Layout/Layout";
import Page404 from "./Components/Errors/Page404";
import PathConstants from "./assets/pathConstants"
import MyTasksPage from "./Containers/MyTasksPage";
import CalendarPage from "./Containers/CalendarPage";
import ProcessesPage from "./Containers/ProcessesPage";
import DocumentsPage from "./Containers/DocumentsPage";
import AssignmentsPage from "./Containers/AssignmentsPage";
import StaffPage from "./Containers/StaffPage";
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
        {
          path: PathConstants.TASKS,
          element:<MyTasksPage/>
        },
        {
          path:PathConstants.DOCUMENTS,
          element:<DocumentsPage/>
        },{
          path:PathConstants.ASSIGNMENTS,
          element:<AssignmentsPage/>
        },
        {
          path:PathConstants.STAFF,
          element:<StaffPage/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
