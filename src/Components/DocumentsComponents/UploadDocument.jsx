
import { getUploadedStatus, resetUploadedStatus, uploadDoc } from "../../Store/slices/documentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../Store/slices/appUserSlice";
import statusTypes from "../../API/status";
import DocumentSettings from "./DocumentSettings";
import UploadDocumentPlaceholder from "./UploadDocumentPlaceholder";
import CreateEntity from "../CreateEntity";
import DialogContext from "../DialogContext";
import { getCompanyName } from "../../Store/slices/companySlice";
import { useContext } from "react";


function UploadDocument({reloadHandler}) {
    const {data, getDialogResult,resetDialogContext} = useContext(DialogContext);

   

    const createdStatus = useSelector(getUploadedStatus);
  
    const dispatch = useDispatch();
  
    const token = useSelector(getToken)

    const company = useSelector(getCompanyName)
  
    const handleSaveUploadedDoc=()=>{
      console.log(data)
   
      const formData = new FormData()

      data.files.forEach((file, index) => {
        formData.append(`file[${index}]`, file);
      });

      formData.append("alignment", data.members.access.alignment)
      formData.append("byRequest", data.members.access.byRequest)
      formData.append("projectId", data.members.access.project)
      formData.append("type", data.members.access.type)
      console.log(data.members.workers)
      data.members.workers.forEach((worker,index)=>{
        formData.append(`workers[${index}].id`, worker.id)
        formData.append(`workers[${index}].role`, worker.role)
        formData.append(`workers[${index}].firstname`, worker.firstname)
        formData.append(`workers[${index}].lastname`, worker.lastname)
        formData.append(`workers[${index}].email`, worker.email)
      })
     
      formData.append("companyName", company)

      dispatch(uploadDoc({
        data:formData,
        token
  
      }))
    }
  
    if(createdStatus===statusTypes.succeeded){
      reloadHandler();
      resetDialogContext();
      dispatch(resetUploadedStatus())
    }
  
    return (
      <CreateEntity
      stepsNames={["Настройки", "Загрузить"]}
      stepsPages={[<DocumentSettings />, <UploadDocumentPlaceholder/>]}
      name={"Загрузка документа"}
      handleSaveContext={handleSaveUploadedDoc}
      getResult={getDialogResult}
      resetDialog={resetDialogContext}
      />
    );
}

export default UploadDocument;