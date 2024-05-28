import statusTypes from "../API/status"

export function checkAll(list=[]){
   
    const loading = list.filter(item=>item==statusTypes.loading).length
    const failed = list.filter(item=>item==statusTypes.failed).length

    

    if(failed!=0){
         return statusTypes.failed
    }else if (loading!=0){
         return statusTypes.loading
    }else {
         return statusTypes.succeeded
    }
}