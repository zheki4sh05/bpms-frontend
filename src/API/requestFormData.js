
function getRequestFormData(token){
    return {
        headers: 
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
    }

}

export default getRequestFormData;