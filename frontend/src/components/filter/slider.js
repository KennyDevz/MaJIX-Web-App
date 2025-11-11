import { Slider } from "@mui/material"
import { useState } from "react";

export default function MySlider(){
    const [value, setValue] = useState([500,3000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <div style={{}}>
            <Slider
                style={{width:250}}
                color="black"
                value={value}
                min={0}
                max={9999}   // max is 99999
                step={1}   // step makes it easier to drag
                valueLabelDisplay="auto"
                onChange={handleChange}/>

                {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', }}>
                    <input type="text" value={`$ ${value[0]}`} style={{ width: '40%', border: '1px solid black', padding: '5px' }}  readOnly/>
                    <span>to</span>
                    <input type="text" value={`$ ${value[1]}`} style={{ width: '40%', border: '1px solid black', padding: '5px' }} readOnly />
                </div> */}
        </div>
    )
}