import React from 'react';

export default function FilterSize({ selectedSizes, onSizeChange }) {

    const availableSizes = ["S", "M", "L", "XL"];

    const handleSizeChange = (size) => {
        if (selectedSizes.includes(size)) {
            onSizeChange(selectedSizes.filter(s => s !== size));
        } else {
            onSizeChange([...selectedSizes, size]);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: '8px', 
            padding: '10px 0'
        }}>
            {availableSizes.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                    <div
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        style={{
                            padding: "5px 20px", 
                            border: "2px solid",
                            borderColor: isSelected ? "#000" : "#ccc",
                            borderRadius: "20px",
                            cursor: "pointer",
                            backgroundColor: isSelected ? "black" : "white",
                            color: isSelected ? "white" : "black",
                            userSelect: "none",
                            textAlign: 'center'
                        }}
                    >
                        {size}
                    </div>
                );
            })}
        </div>
    );
}