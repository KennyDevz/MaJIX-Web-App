import SearchIcon from '../assets/search-icon.png'

function SearchBar(){
    return(
        <div style={{backgroundColor: "#e3e3e3ff",
        display:"flex",
        flexDirection:"row", 
        width: "400px",
        margin: "0 50px", 
        height: "50%", 
        gap: '3px', 
        borderRadius: "20px", 
        padding: "5px"}}>
            <form style={{display: "flex",  //form
                alignItems: "center", flex: "1"}}>
                <button style={{background: "none",         //button
                    border: "none", 
                    outline: "none"}}>
                    <img src={SearchIcon} alt='search-icon'  //search icon image
                    style={{ marginTop:"5px",
                    height:"20px", 
                    width: "20px"}}/>
                </button>
                <input type="text" placeholder="Search for Products..."  //input
                style={{background: "none", 
                    border: "none", 
                    height: "100%",
                    width: "100%",
                    outline: "none",
                    padding:"2px"}}
                />
            </form>
        </div>
    )
}

export default SearchBar;