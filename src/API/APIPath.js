const  base="http://localhost:8080/api/v1/";
const api={

    user:{
        register:base.concat("auth/register"),
        authenticate:base.concat("auth/authenticate"),
        data:base.concat("user/"),
        update:base.concat("user/update"),
        notif:base.concat("user/notification")
    },
    company:{
        create:base.concat("company/create"),
        update:base.concat("company/update"),
        userCompany:base.concat("company/userCompany"),
        invite:base.concat("company/invite"),
        findUser:base.concat("company/findUser"),
        acceptInivation:base.concat("company/accept_invitation"),
        rejectInivation:base.concat("company/reject_invitation"),
        createSpec:base.concat("company/specialization/create"),
        updateSpec:base.concat("company/specialization/update"),
        deleteSpec:base.concat("company/specialization/delete"),
        fetchSpec:base.concat("company/specialization/fetch"),
        changeWorkerSpec:base.concat("company/specialization/change"),
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
    },
    assignments:{
        create:base.concat("assignments/create"),
        fetch:base.concat("assignments/fetch"),
        statuses:base.concat("assignments/statuses"),
    },
    documents:{
        fetch:base.concat("documents/fetch"),
        upload:base.concat("documents/upload"),
        info:base.concat("documents/info")
    },
    tasks:{
        fetchMy:base.concat("tasks/fetchMy"),
        fetchOther:base.concat("tasks/fetchOther"),
        task:base.concat("tasks/")
    }

   
}

export default api;
