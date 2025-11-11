import React from 'react';


export default function Categories({ selectedCategory, onCategoryChange }){
  const categories = ["T-Shirt", "Pants", "Shorts", "Jeans", "Hoodie"];

  const handleChange = (event) => {
    const value = event.target.value;
    onCategoryChange(value === "All" ? null : value);
  };
  
  return(
     <div style={{color:'#717171ff', padding: '10px',display:'flex',flexDirection:'column'}}>

            {/* 3. Add an "All" option */}
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '15px'}}>
                <input 
                  type="radio" 
                  name="category" 
                  value="All" 
                  style={{accentColor:'#2b0497ff'}}
                  checked={selectedCategory === null} 
                  onChange={handleChange} 
                />
                <label>All</label>
            </div>

            {categories.map(category => (
              <div key={category} style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '15px'}}>
                <input 
                  type="radio" 
                  name="category" 
                  value={category} 
                  style={{accentColor:'#2b0497ff'}}
                  checked={selectedCategory === category} 
                  onChange={handleChange}
                />
                <label>{category}</label>
            </div>
            ))}

        </div>
    )
}