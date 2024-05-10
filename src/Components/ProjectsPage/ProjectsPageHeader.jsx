import { useSelector } from "react-redux";
import PageInfo from "../PageInfo";
import {
  getActiveProjectsCount,
  getAdminProjectsCount,
  getOverdueProjectsCount,
  getParticipantProjectsCount,
} from "../../Store/slices/projectSlice";

function ProjectsPageHeader() {
  const countActive = useSelector(getActiveProjectsCount);
  const countAdmin = useSelector(getAdminProjectsCount);
  const countParticipant = useSelector(getParticipantProjectsCount);
  const countOverdue = useSelector(getOverdueProjectsCount);

  // const [countActive,setcountActive] =useState(0);
  // const [countAdmin,setcountAdmin] = useState(0);
  // const [countParticipant,setcountParticipant] = useState(0);
  // const [countOverdue,setcountOverdue] = useState(0);

  // useEffect(() => {
  //   setcountActive(useSelector(getActiveProjectsCount))
  //   setcountParticipant(useSelector(getParticipantProjectsCount))
  //   setcountAdmin(useSelector(getAdminProjectsCount))
  //   setcountOverdue(useSelector(getOverdueProjectsCount))
  // }, []);

  console.log(countAdmin)
  return (
    <PageInfo
      name={"Мои проекты"}
      data={[
        {
          name: "активно",
          count: countActive,
        },
        {
          name: "управляю",
          count: countAdmin,
        },
        {
          name: "состою",
          count: countParticipant,
        },
        {
          name: "просрочено",
          count: countOverdue,
        },
      ]}
    />
  );
}

export default ProjectsPageHeader;
