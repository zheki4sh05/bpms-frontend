export function getErrorName(from, error){
    switch(from){
        case 'company':{
            switch(error){
            
                case "ERR_BAD_REQUEST":{
                    return "Можно быть владельцем только одной компании!"
                }
                default:{
                    return "Что-то пошло не так..."
                }
            }
        }
        case 'any':{
            switch(error){
                case "ERR_NETWORK":{
                    return "Неполадки с интернет-соединением"
                }
                default:{
                    return "Что-то пошло не так..."
                }
            }
        }
        case 'workers':{
            switch(error){
                case "EMPTY_LIST":{
                    return "В вашей компании нет сотрудников"
                }
            }
        }
        case 'invite':{
            switch(error){
                case "ERR_BAD_REQUEST":{
                    return "Приглашение уже отправлено!"
                }
            }
        }
        default:{
            return "Что-то пошло не так..."
        }
    }
 
}