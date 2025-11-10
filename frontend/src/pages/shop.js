import ProductDisplay from "../components/product_display"
import Filter from "../components/filter/filter"

export default function Shop(){
    const height = 80
    return(
        <div style={{display: 'flex', flexDirection: 'row', height: 'calc(100vh - 80px)'}}>
                <Filter/>
           
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto',}}>
                <h1 style={{marginRight: 'auto'}}>PRODUCTS</h1>
                <ProductDisplay />
            </div>
            
        </div>
    )
}