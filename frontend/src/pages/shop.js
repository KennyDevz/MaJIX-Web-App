import ProductDisplay from "../components/product_display"
import Filter from "../components/filter/filter"
import { useState, useEffect } from 'react'

export default function Shop(){
    const [appliedCategory, setAppliedCategory] = useState(null);
    const [appliedPriceRange, setAppliedPriceRange] = useState([0, 3000]);
    const [appliedColors, setAppliedColors] = useState([]);
    const [appliedSizes, setAppliedSizes] = useState([]);

    const handleApplyFilters = (draftFilters) => {
      setAppliedCategory(draftFilters.category);
      setAppliedPriceRange(draftFilters.priceRange);
      setAppliedColors(draftFilters.colors);
      setAppliedSizes(draftFilters.sizes);
    };

    useEffect(() => { 
        window.scrollTo(0, 0);
    }, []);

    return(
        <div style={{display: 'flex', flexDirection: 'row', }}>
                <Filter onApplyFilters={handleApplyFilters}/>
           
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', width: '100%'}}>
                <h1 style={{marginRight: 'auto'}}>PRODUCTS</h1>
                <ProductDisplay 
                appliedCategory={appliedCategory} 
                appliedPriceRange={appliedPriceRange}
                appliedColors={appliedColors}
                appliedSizes={appliedSizes}
                enablePagination={true}  // <--- This turns on the buttons
                itemsPerPage={8}
                />
            </div>
            
        </div>
    )
}