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
        list:base.concat("workers/list"),
        relevant:base.concat("workers/relevant")
    },
    assignments:{
        create:base.concat("assignment/create"),
        fetch:base.concat("assignment/fetch"),
        update:base.concat("assignment/update"),
        statuses:base.concat("assignment/assignment_statuses"),
        docDel:base.concat("assignment/docDel"),
        upload:base.concat("assignment/addDocsAssignment"),
        updateAssignmentWorker:base.concat("assignment/updateAssignmentWorker"),
        changeAssignmentStatus:base.concat("assignment/changeAssignmentStatus"),
        updateTodos:base.concat("assignment/updateTodos")
       
    },
    documents:{
        fetch:base.concat("documents/fetch"),
        upload:base.concat("documents/upload"),
        info:base.concat("documents/info"),
        doc_for_assignment:base.concat("documents/doc_for_assignment")
    },
    tasks:{
        fetchMy:base.concat("tasks/fetchMy"),
        fetchOther:base.concat("tasks/fetchOther"),
        task:base.concat("tasks/")
    }

   
}

export default api;
