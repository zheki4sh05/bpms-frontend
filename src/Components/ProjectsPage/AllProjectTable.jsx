import { useSelector } from "react-redux";
import { getProjects, getProjectsResults } from "../../Store/slices/projectSlice";
import ProjectsTable from "./ProjectsTable";
function AllProjectsTable() {

    const projects = useSelector(getProjects) || [];

    // const statuses = useSelector(getProjectsResults) || [];

    // if(projects.length!=0 && statuses.length!=0){
    //     for( const item of projects){
    //         item.done = statuses.find(status=>status.id == item.id).done;
    //     }
    // }

   

    console.log(projects)

    // function getRows(data=[]){
    //   return data.forEach(project => {
    //         return {
    //             id:project.id,
    //             name:project.name,
    //             done:project.done,
    //             finish:project.finish,
    //             workers:project.workers,
    //             role:project.role,
    //             access:project.access
    //         }
    //     });
    // }

    return ( 
        <ProjectsTable
        projects={projects}
        />
     );
}

export default AllProjectsTable;