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
                    return "Неполадки с итернет-соединением"
                }
            }
        }
        default:{
            return "Что-то пошло не так..."
        }
    }
 
}