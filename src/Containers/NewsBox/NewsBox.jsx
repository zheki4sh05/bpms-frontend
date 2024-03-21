import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import NewsPost from "../../Components/NewsPost/NewsPost";

const newsList=[
    {
        title:"Новый пост 1",
        body:"Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной для текстов на латинице с начала XVI века. В то время некий безымянный печатник созд",
        email:"user@mail.ru",
        name:"Anatoliy",
        project:"Проект 1"

    },
    {
        title:"Новый пост 1",
       body:" ",
        email:"user@mail.ru",
        name:"Anatoliy",
        project:"Проект 1"

    }
]

function NewsBox() {
    
    // const [list,setList] = useState([{
    //     title:"Новый пост 1",
    //     body:"Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной для текстов на латинице с начала XVI века. В то время некий безымянный печатник созд",
    //     email:"user@mail.ru",
    //     name:"Anatoliy",
    //     projects:"Проект 1"

    // }]);

  return (
    <Box sx={{ boxSizing:"border-box"}}>
      <Stack direction="row" sx={{alignItems:"center", mt:2}}>
        <Typography variant="h5" gutterBottom>
          Новости
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ml:2}} >
         новых:{newsList.length}
        </Typography>
      </Stack>
      <Stack direction="column" sx={{p:2, boxSizing:"border-box"}} >
         
            {
                newsList.map((item,index)=>(

                  
                       <NewsPost
                        key={index}
                        post={item}
                        />
                        
                   
                 
                ))
            }
        
      </Stack>
    </Box>
  );
}

export default NewsBox;
