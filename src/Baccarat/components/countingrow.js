import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

var grid = [];

const CountingCircle = ({c1, o1}) => (

    <Box height = "15px">
        <CircleIcon sx = {{fontSize: "12px", color: c1, opacity: o1}}></CircleIcon>
    </Box>

);

const CountingRow = ({params, p_index}) => (
    <Box>
        {params.map((param, i) => {
            const k = p_index.toString() + "_" + i.toString();
            return <CountingCircle
                key = {k}
                c1 = {param.c}
                o2 = {param.o}
            ></CountingCircle>
        })}
    </Box>
);

export default function CountingGrids({params}){

    grid = params.map((param, i) => (
        <CountingRow
            key = {i}
            params = {param}
            p_index = {i}
        ></CountingRow>
    ));

    return grid;
}
