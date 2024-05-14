import { Box, Skeleton } from "@mui/material";

function UserSkeleton() {
    return ( 
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <Skeleton sx={{mr:1}} variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={40} />
        </Box>
     

     );
}

export default UserSkeleton;