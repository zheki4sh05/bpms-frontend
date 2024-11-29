
import { getUploadedStatus, resetUploadedStatus, uploadDoc } from "../../Store/slices/documentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getId, getToken } from "../../Store/slices/appUserSlice";
import statusTypes from "../../API/status";
import DocumentSettings from "./DocumentSettings";
import UploadDocumentPlaceholder from "./UploadDocumentPlaceholder";
import CreateEntity from "../CreateEntity";
import DialogContext from "../DialogContext";
import { memo, useContext, useEffect } from "react";


const UploadDocument = memo(({reloadHandler, company, token})=> {

    const {data, getDialogResult,resetDialogContext} = useContext(DialogContext);

    const createdStatus = useSelector(getUploadedStatus);
  
    const dispatch = useDispatch();
    const userId = useSelector(getId)
 
    const handleSaveUploadedDoc=()=>{
   
      const formData = new FormData()

      data.files.forEach((file, index) => {
        formData.append(`file[${index}]`, file);
      });
    
      formData.append("alignment", data.members.access.alignment)
      formData.append("byRequest", data.members.access.byRequest)
      formData.append("projectId", data.members.access.project)
      formData.append("type", data.members.access.type)
         data.members.workers.forEach((worker,index)=>{
        formData.append(`workers[${index}].id`, worker.id)
        formData.append(`workers[${index}].role`, worker.role)
        formData.append(`workers[${index}].firstname`, worker.firstname)
        formData.append(`workers[${index}].lastname`, worker.lastname)
        formData.append(`workers[${index}].email`, worker.email)
      })
      
      formData.append("companyName", company)
      formData.append("assignmentId", 0)
      formData.append("uploadedUser", userId)
      dispatch(uploadDoc({
        data:formData,
        token:token
  
      }))
    }
  
  

    useEffect(() => {
      reloadHandler();
      resetDialogContext();
      dispatch(resetUploadedStatus())
    }, [createdStatus]);

  
    return (
      <CreateEntity
      stepsNames={["Настройки", "Загрузить"]}
      stepsPages={[<DocumentSettings alignmentProp={"document"} />, <UploadDocumentPlaceholder/>]}
      name={"Загрузка документа"}
      handleSaveContext={handleSaveUploadedDoc}
      getResult={getDialogResult}
      resetDialog={resetDialogContext}
      />
    );
})

export default UploadDocument;