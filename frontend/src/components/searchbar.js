import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import SearchIcon from '../assets/search-icon.png'

function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault(); 
        if (searchTerm.trim()) {

            navigate(`/Shop?search=${encodeURIComponent(searchTerm.trim())}`);
        } else {
          
            navigate('/Shop');
        }
    }

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
            <form 
                onSubmit={handleSearch} 
                style={{display: "flex", alignItems: "center", flex: "1"}}
            >
                <button 
                    type="submit" 
                    style={{background: "none", border: "none", outline: "none", cursor: 'pointer'}}
                >
                    <img src={SearchIcon} alt='search-icon' 
                    style={{ marginTop:"5px", height:"20px", width: "20px"}}/>
                </button>
                
                <input 
                    type="text" 
                    placeholder="Search for Products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        background: "none", 
                        border: "none", 
                        height: "100%",
                        width: "100%",
                        outline: "none",
                        padding:"2px"
                    }}
                />
            </form>
        </div>
    )
}

export default SearchBar;