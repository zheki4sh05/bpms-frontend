import { useContext, useEffect, useState } from "react";
import { Container, ButtonGroup, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DialogContext from "../DialogContext";



export default function Counter() {

  const { data, setDataHandler } = useContext(DialogContext);

  const [count, setCount] = useState(data.hasOwnProperty("count") ? data.count : 0);
  const handleChange = () => {
    //setCount(Math.max(Number(event.target.value), 0));
console.log(count)
    setDataHandler({...data, 

      count: count,

});

  };


  useEffect(() => {
    handleChange()
   
  }, [count]);

  return (
    <Container>
      <ButtonGroup>
        <Button
          onClick={() => {setCount((prev) => prev - 1)}}
          disabled={count === 0}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <TextField size="small" onChange={handleChange} value={count} />
        <Button onClick={() => setCount((prev) => prev + 1)}>
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </Container>
  );
}
