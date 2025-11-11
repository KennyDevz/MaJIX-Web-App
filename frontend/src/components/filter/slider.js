import { Slider } from "@mui/material"

export default function MySlider({ priceRange, onPriceChange }){

    const handleChange = (event, newValue) => {
        onPriceChange(newValue);
    };

    const handleMinInputChange = (event) => {   
      const newMin = Number(event.target.value);
      onPriceChange([newMin, priceRange[1]]); // Keep the old max
    };

    const handleMaxInputChange = (event) => {
      const newMax = Number(event.target.value);
      onPriceChange([priceRange[0], newMax]); // Keep the old min
    };

    return(
        <div style={{}}>
            <Slider
                style={{width:250}}
                color="black"
                value={priceRange}
                min={0}
                max={9999}   // max is 99999
                step={1}   // step makes it easier to drag
                valueLabelDisplay="auto"
                onChange={handleChange}/>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ position: 'relative', width: '45%' }}>
                        <span style={{
                            position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#555'
                        }}>
                            ₱
                        </span>
                        <input 
                            type="number" 
                            value={priceRange[0]} 
                            style={{ 
                            width: '100%', 
                            border: '1px solid black', 
                            padding: '5px 5px 5px 24px', 
                            boxSizing: 'border-box'      
                            }} 
                            onChange={handleMinInputChange} 
                        />
                    </div>
                    <span>to </span>
                    <div style={{ position: 'relative', width: '45%' }}>
                        <span style={{
                            position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#555' }}>
                            ₱
                        </span>
                        <input 
                            type="number" 
                            value={priceRange[1]} 
                            style={{ 
                            width: '100%', 
                            border: '1px solid black', 
                            padding: '5px 5px 5px 24px', 
                            boxSizing: 'border-box'
                            }} 
                            onChange={handleMaxInputChange} 
                        />
                    </div>
                </div>
        </div>
    )
}