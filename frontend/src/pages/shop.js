import ProductDisplay from "../components/product_display"

export default function Shop(){
    const height = 80
    return(
        <div style={{display: 'flex', flexDirection: 'row', height: 'calc(100vh - 80px)', overflow: 'hidden'}}>
            <div style={{width: '650px', backgroundColor: '#bcbcbcff', position: 'sticky', overflow: 'hidden'}}>
                <h1>FILTER </h1>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', padding: '20px'}}>
                <h1>PRODUCTS</h1>
                <ProductDisplay />
            </div>
            
        </div>
    )
}