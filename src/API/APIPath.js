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
        userCompany:base.concat("company/userCompany"),
        invite:base.concat("company/invite"),
        findUser:base.concat("company/findUser")
    },
    project:{
        fetch:base.concat("project/fetch"),
        create:base.concat("project/create"),
        update:base.concat("project/update"),
        include:base.concat("project/include"),
        delete:base.concat("project/delete"),
        statuses:base.concat("project/statuses"),
    },
    workers:{
        list:base.concat("workers/list")
    }
   
}

export default api;
