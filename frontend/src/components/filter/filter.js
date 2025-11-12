import MySlider from "./slider"
import Categories from "./categories"
import FilterColors from "./color"
import FilterSize from "./size"
import { useState } from 'react'

export default function Filter({ onApplyFilters }){

    const defaultCategory = null;
    const defaultPriceRange = [0, 3000]; 
    const defaultColors = [];
    const defaultSizes = [];

    const [draftCategory, setDraftCategory] = useState(null);
    const [draftPriceRange, setDraftPriceRange] = useState([0, 3000]);
    const [draftColors, setDraftColors] = useState([]);
    const [draftSizes, setDraftSizes] = useState([]);

    const handleApplyClick = () => {
      const draftFilters = {
        category: draftCategory,
        priceRange: draftPriceRange,
        colors: draftColors,
        sizes: draftSizes,
      };
      onApplyFilters(draftFilters);
    };

    const handleResetClick = () => {
        setDraftCategory(defaultCategory);
        setDraftPriceRange(defaultPriceRange);
        setDraftColors(defaultColors);
        setDraftSizes(defaultSizes);

        onApplyFilters({
            category: defaultCategory,
            priceRange: defaultPriceRange,
            colors: defaultColors,
            sizes: defaultSizes
        });
    };
    return (
        <div style={{border: '1px solid #d0d0d0ff', width: '300px', padding: '20px', overflowY:'auto', borderRadius: '20px', margin:'20px', display: 'flex', flexDirection:'column', alignItems: 'center', flexShrink: 0, height: '100%'}}>
            <div style={{}}>
                <p style={{ fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter',marginTop: '0'}}>Filters</p>
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>
                    <Categories selectedCategory={draftCategory} onCategoryChange={setDraftCategory}/>
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>
              
                <p style={{ fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter'}}>Price</p>
                    <MySlider priceRange={draftPriceRange} onPriceChange={setDraftPriceRange}/>
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>

                <p style={{ fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter'}}>Colors</p>
                    <FilterColors selectedColors={draftColors} onColorChange={setDraftColors} />
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>

                <p style={{ fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter'}}>Size</p>
                    <FilterSize selectedSizes={draftSizes} onSizeChange={setDraftSizes}/>
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>

                <button style={{width: '100%', padding: '5px 0', marginTop: '10px', backgroundColor: '#000', color: '#FFF', fontFamily: 'Poppins', borderRadius: '25px', cursor: 'pointer'}} onClick={handleApplyClick}>Apply Filters</button>

                <button 
                  style={{
                    width: '100%', padding: '5px 0', marginTop: '10px', backgroundColor: '#FFF', color: '#000', fontFamily: 'Poppins', borderRadius: '25px', cursor: 'pointer', border: '1px solid #000' 
                  }} onClick={handleResetClick}>
                  Reset Filters
                </button>

            </div>
        </div>
    )
}