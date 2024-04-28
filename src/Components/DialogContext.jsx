import { createContext } from "react";

const DialogContext = createContext({
    data:{},
    openDialog:false,
})
export default DialogContext;