import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

function FileImageInput() {
    const [value, setValue] = useState(null)

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return <MuiFileInput label="Выбрать изображение" value={value} onChange={handleChange} />
}

export default FileImageInput;