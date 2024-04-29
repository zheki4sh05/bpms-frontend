import { ThemeContext } from "@emotion/react";
import { useState } from "react";
import DialogContext from "./DialogContext";

function DialogEntityProvider({children}) {
  const [openDialog, setOpen] = useState(false);
  const [data, setData] = useState({});

  const openDialogHandler = () => {

    setOpen(true);
  };
  const closeDialogHandler = () => {
    setOpen(false);
  };
  const setDataHandler=(value)=>{
    setData(value)
    console.log(value)
  }

  const getDialogResult=()=>{
      return Object.keys(data).length
  }
  const resetDialogContext=()=>{
    Object.keys(data).forEach(key => delete data[key]);
  }
  return (
    <DialogContext.Provider
      value={{
        openDialog,
        openDialogHandler,
        closeDialogHandler,
        setDataHandler,
        data,
        getDialogResult,
        resetDialogContext
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export default DialogEntityProvider;
