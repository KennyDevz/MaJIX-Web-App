import MySlider from "./slider"
import Categories from "./categories"

export default function Filter(){
    return (
        <div style={{border: '1px solid #d0d0d0ff', width: '600px', padding: '20px', overflowY:'auto', borderRadius: '20px', margin:'20px'}}>
            <div style={{}}>
                <p style={{margin: '15px', fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter'}}>Filters</p>
                <hr style={{marginLeft:'15px', marginRight:'15px', border: '1px solid #d0d0d0ff'}}/>
                    <Categories/>
                <hr style={{marginLeft:'15px', marginRight:'15px', border: '1px solid #d0d0d0ff'}}/>
                <div>
                    <p style={{margin: '15px', fontWeight:'600',fontSize: '1.2rem',color:'#000000ff', fontFamily: 'Inter'}}>Price</p>
                    <MySlider />

                </div>
            </div>
        </div>
    )
}