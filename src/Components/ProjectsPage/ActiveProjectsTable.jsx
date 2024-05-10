import { useSelector } from "react-redux";
import { getActiveProjects } from "../../Store/slices/projectSlice";
import ProjectsTable from "./ProjectsTable";

function ActiveProjectsTable() {
    const projects = useSelector(getActiveProjects) || [];
    return ( 
        <ProjectsTable
            projects={projects}
        />
    );
}

export default ActiveProjectsTable;