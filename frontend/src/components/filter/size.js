import { useState } from "react";

export default function FilterSize(){
    const [selected, setSelected] = useState("option1");

    const options = ["S", "M", "L"];
    return(
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2px',}}>
                {options.map((opt) => (
                <div
                key={opt}
                onClick={() => setSelected(opt)}
                style={{
                    padding: "0 20px",
                    border: "2px solid",
                    borderColor: selected === opt ? "#8c8c8cff" : "#ccc",
                    borderRadius: "20px",
                    cursor: "pointer",
                    backgroundColor: selected === opt ? "#8c8c8cff" : "white",
                    userSelect: "none",
                }}
                >{opt}</div>
                ))}
        </div>
    )
}