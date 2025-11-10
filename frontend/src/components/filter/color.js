
export default function FilterColors(){
    return(
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '20px'}}>
            <div style={{height: '40px', width: '40px', backgroundColor: 'green', borderRadius: '50%'}}/>
            <div style={{height: '40px', width: '40px', backgroundColor: 'black', borderRadius: '50%'}}/>
            <div style={{height: '40px', width: '40px', backgroundColor: 'blue', borderRadius: '50%'}}/>
            <div style={{height: '40px', width: '40px', backgroundColor: 'pink', borderRadius: '50%'}}/>
        </div>
    )
}