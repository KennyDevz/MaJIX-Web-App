import { Slider } from "@mui/material"
import { useState } from "react";

export default function MySlider(){
    const [value, setValue] = useState([500,3000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <div style={{width: 250}}>
        <Slider
            style={{width:250}}
            color="black"
            value={value}
            min={0}
            max={9999}   // max is 99999
            step={1}   // step makes it easier to drag
            valueLabelDisplay="auto"
            onChange={handleChange}/>
            </div>
    )
}