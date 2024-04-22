const  base="http://localhost:8080/api/v1/";
const api={

    user:{
        register:base.concat("auth/register"),
        authenticate:base.concat("auth/authenticate"),
        data:base.concat("user/"),
        update:base.concat("user/update")
    },
    company:{
        create:base.concat("company/create"),
        update:base.concat("company/update"),
        userCompany:base.concat("company/userCompany")
    }
    
   
}

export default api;
