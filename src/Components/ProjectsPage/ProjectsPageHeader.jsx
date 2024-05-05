import { useSelector } from "react-redux";
import PageInfo from "../PageInfo";
import {
  getActiveProjectsCount,
  getAdminProjectsCount,
  getOverdueProjectsCount,
  getParticipantProjectsCount,
} from "../../Store/slices/projectSlice";

function ProjectsPageHeader() {
  let countActive = useSelector(getActiveProjectsCount);
  let countAdmin = useSelector(getAdminProjectsCount);
  let countParticipant = useSelector(getParticipantProjectsCount);
  let countOverdue = useSelector(getOverdueProjectsCount);

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
