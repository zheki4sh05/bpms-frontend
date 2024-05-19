import statusTypes from "../API/status"

export function checkAll(list=[]){
    const loading = Object.values(list).filter(item=>item===statusTypes.loading).lentgh
    const failed = Object.values(list).filter(item=>item===statusTypes.failed).length
    if(failed!=0){
         return statusTypes.failed
    }else if (loading!=0){
         return statusTypes.loading
    }else {
         return statusTypes.succeeded
    }
}