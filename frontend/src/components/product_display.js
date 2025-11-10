import ProductCard from './product_card';
import products from "../data/sample_data.json"; 

/*Vesion 2 */
export default function ProductDisplay() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', }}>
        {products.map((p, i) => (
          <ProductCard
            key={i} // always add key
            image={p.image}
            title={p.title}
            name={p.name}
            price={p.price}
            rating={p.rating}
          />
        ))}
      </div>
    </div>
  );
}
