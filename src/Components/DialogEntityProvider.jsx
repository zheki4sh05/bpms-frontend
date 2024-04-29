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
  return (
    <DialogContext.Provider
      value={{
        openDialog,
        openDialogHandler,
        closeDialogHandler,
        setDataHandler,
        data,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export default DialogEntityProvider;
