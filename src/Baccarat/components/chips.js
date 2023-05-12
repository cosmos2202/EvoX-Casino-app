import { Box } from "@mui/material";
import "../baccarat.css";
import { shades } from "../theme";

export const chipImages = [
    {"src": "assets/chips/bluechip.png", "val": 1, "fontcolor": shades.neutral[200]},
    {"src": "assets/chips/pinkchip.png", "val": 0.5, "fontcolor": shades.neutral[200]},
    {"src": "assets/chips/chip5.png", "val": 5, "fontcolor": shades.primary[300]},
    {"src": "assets/chips/yellowchip.png", "val": 0.1, "fontcolor": shades.primary[300]},
    {"src": "assets/chips/greenchip.png", "val": 0.2, "fontcolor": shades.neutral[200]},
    {"src": "assets/chips/chip10.png", "val": 10, "fontcolor": shades.neutral[200]},
    {"src": "assets/chips/chip25.png", "val": 25, "fontcolor": shades.neutral[200]},
    {"src": "assets/chips/chip50.png", "val": 50, "fontcolor": shades.neutral[200]},
    {"src": "assets/chips/chip100.png", "val": 100, "fontcolor": shades.neutral[200]}
]


export default function Chip({ urlsrc, color, isSelected}) {
    return (
        <Box
            style = {{position: "relative", width: "100%", margin: "0px", paddingtop: "0px"}}
            display = "flex"
        >
            <Box height = "100%" className = {isSelected ? "expandchip":"contractchip"}>
                <img 
                    alt=""
                    width = "100%" 
                    src = {urlsrc}  
                >
                </img>
            </Box>
            <Box height = "100%" style = {{
                position: "absolute",
                top: "-18%",
                left: "32%",
                paddingtop: "0px",
                margin: "0px"
            }} color = {color}>
            </Box>
            
        </Box>
    );
}