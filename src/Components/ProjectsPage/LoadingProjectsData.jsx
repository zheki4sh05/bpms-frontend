// import { Box } from "@mui/material";
// import { useDispatch } from "react-redux";
// import {
//   getAllProjectsStatuses,
//   getAllUserProjects,
// } from "../../Store/slices/projectSlice";
// import { getToken } from "../../Store/slices/appUserSlice";
// import { getCompanyName } from "../../Store/slices/companySlice";
// import { useSelector } from "react-redux";

// function LoadingProjectsData() {
//   const token = useSelector(getToken);

//   const companyName = useSelector(getCompanyName);

//   const dispatch = useDispatch();

//   function loadData() {
//     dispatch(
//       getAllUserProjects({
//         data: {
//           companyName,
//         },
//         token,
//       })
//     );
//     dispatch(
//       getAllProjectsStatuses({
//         data: {
//           companyName,
//         },
//         token,
//       })
//     );
//   }

//   setTimeout(loadData, 100);

//   return <></>;
// }

// export default LoadingProjectsData;
