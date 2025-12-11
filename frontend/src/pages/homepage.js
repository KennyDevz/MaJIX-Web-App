import ProductDisplay from "../components/product_display";
import { useEffect } from "react";

export default function HomePage(){
    useEffect(() => { //scrolls to the top of component
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
                <div style={{
                    backgroundImage: `linear-gradient(rgba(0, 13, 42, 0.74), rgba(0, 13, 42, 0.74)), url('https://highxtar.com/wp-content/uploads/2022/10/thumb-esta-el-streetwear-pasado-de-moda.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '80vh',
                    width: '100%',
                }}>
                    <div style={{width:'577px', color: "#FFF",padding: '50px'}}>
                        <p style={{
                            margin: '0',
                            fontSize: '64px',
                            fontWeight: '700',
                            fontStyle:'normal'
                        }}>
                            FIND CLOTHES THAT MATCHES YOUR STYLE
                        </p>
                        <p>
                            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                        </p>

                        <div style={{backgroundColor: '#FFF',display: 'flex', width: '120px', height: '30px', padding: '16px 54px', justifyContent: 'center', alignItems: 'center', gap: '12px', flexShrink: '0', borderRadius: '62px', opacity: '.86', marginTop: '80px'}}>
                            <p style={{
                                color: "#000",
                                fontSize: '20px',
                                fontWeight:'500'
                            }}
                            >SHOP NOW</p>
                        </div>
                    </div>
                </div>

                <div style={{padding: '40px 50px', display: 'flex', flexDirection: 'column', gap:'70px'}}>
                    <h1 style={{
                        margin: '0'
                    }}
                    
                    >
                        PRODUCTS
                    </h1>
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%', }}>
                    <ProductDisplay enablePagination={false} itemsPerPage={10}/>
                    </div>
                </div>
            </div>
    );
}

