import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const API_URL = 'http://localhost:8081/api/products/colors'

export default function FilterColors({ selectedColors, onColorChange }) {

    const [availableColors, setAvailableColors] = useState([]);

    useEffect(() => {
        const fetchColors = async () => {
            try {
    
                const response = await axios.get(API_URL);
                setAvailableColors(response.data);
            } catch (error) {
                console.error("Failed to fetch colors:", error);
            }
        };
        fetchColors();
    }, []); 


    const handleColorChange = (color) => {
        if (selectedColors.includes(color)) {
            onColorChange(selectedColors.filter(c => c !== color));
        } else {
            onColorChange([...selectedColors, color]);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap', 
            gap: '12px',
            padding: '10px 0',
            maxWidth: '250px' 
        }}>
            {availableColors.map((color) => {
                const isSelected = selectedColors.includes(color);
                const hexCode = color;

                return (
                    <button
                        key={color}
                        type="button" 
                        title={color}
                        onClick={() => handleColorChange(color)}
                        style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: hexCode,
                            borderRadius: '50%',
                            border: '1px solid #CCC',
                            cursor: 'pointer',
                            outline: isSelected ? '3px solid #2b0497ff' : 'none',
                            outlineOffset: '2px',
                            boxShadow: hexCode.toUpperCase() === '#FFFFFF' ? 'inset 0 0 0 1px #DDD' : 'none'
                        }}
                    >
                    </button>
                );
            })}
        </div>
    );
}