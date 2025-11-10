
export default function Categories(){
    return(
        <div style={{color:'#717171ff', padding: '10px',display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '15px'}}>
                        <input type="radio" name="category" value="t-shirt" style={{accentColor:'#2b0497ff'}}/>
                        <label>T-shirt</label>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '15px'}}>
                        <input type="radio" name="category" value="pants" style={{accentColor:'#2b0497ff'}}/>
                        <label>Pants</label>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '15px'}}>
                        <input type="radio" name="category" value="shorts" style={{accentColor:'#2b0497ff'}}/>
                        <label>Shorts</label>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '15px'}}>
                        <input type="radio" name="category" value="accessories" style={{accentColor:'#2b0497ff'}}/>
                        <label>Accessories</label>
                    </div>
                </div>
    )
}