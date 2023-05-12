import { Box } from "@mui/material";

export default function BetArea({tcolor, title, chipsrc, betvalue, betcolor, opac, anim}){
    return(
        <Box 
          style = {{position: "relative"}}
          className = "betarea"  
          color = {tcolor}
          margin = "auto"
          
        >
          {title}
          
          <img 
            width = "45%" 
            alt=""
            src = {chipsrc}
            style = {{
              position: "absolute",
              top: "0%",
              left: "25%",
              opacity: opac
            }}
            className = {anim}
          >
          </img>
        </Box>
    );
}