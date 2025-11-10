import MySlider from "./slider"
import Categories from "./categories"
import FilterColors from "./color"
import FilterSize from "./size"

export default function Filter(){
    return (
        <div style={{border: '1px solid #d0d0d0ff', width: '600px', padding: '20px', overflowY:'auto', borderRadius: '20px', margin:'20px', display: 'flex', flexDirection:'column', alignItems: 'center'}}>
            <div style={{}}>
                <p style={{ fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter',marginTop: '0'}}>Filters</p>
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>
                    <Categories/>
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>
              
                <p style={{ fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter'}}>Price</p>
                <MySlider />
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>

                <p style={{ fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter'}}>Colors</p>
                <FilterColors />
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>

                <p style={{ fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter'}}>Size</p>
                <FilterSize/>
                <hr style={{ border: '1px solid #d0d0d0ff'}}/>

                <button style={{width: '100%', padding: '5px 0', marginTop: '10px', backgroundColor: '#000', color: '#FFF', fontFamily: 'Poppins', borderRadius: '25px', cursor: 'pointer'}}>Apply Filters</button>

            </div>
        </div>
    )
}