export function getErrorName(from, error){
    if(from==='company'){
        switch(error){
            case "ERR_NETWORK":{
                return "Неполадки с итернет-соединением"
            }
            case "ERR_BAD_REQUEST":{
                return "Можно быть владельцем только одной компании!"
            }
            default:{
                return "Что-то пошло не так..."
            }
        }
    }
}