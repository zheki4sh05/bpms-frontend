
import { useSelector } from "react-redux";
import { getOverdueProjects } from "../../Store/slices/projectSlice";
import ProjectsTable from "./ProjectsTable";

function OverdueProjects() {

    const projects = useSelector(getOverdueProjects) || [];

    return ( 
         <ProjectsTable
             projects={projects}
        />
     );
}

export default OverdueProjects;
