import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function SignInForm(){
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(
            "http://localhost:8081/api/user/auth/login",
            formData
        );

        if (response.data) {
            const userData = { 
                id: response.data.id, 
                role: response.data.role, 
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email
            
            };
            localStorage.setItem("user", JSON.stringify(userData));

            setUser(userData)
            console.log(response)
            alert("Login Successful!")

            if(userData.role === 'CUSTOMER')
                navigate("/", { replace: true })
            else if(userData.role === 'ADMIN')
                navigate("/admin", { replace: true })
            
        }
        } catch (error) {
        setMessage(error.response?.data?.message || "Login failed");
        alert("Login failed!");
        setFormData({ email: "", password: "" });
        }
    }
  
    return(
        <div style={{display: 'flex', flexDirection: 'column', marginTop: '30px', width: '404px'}}>
            <p style={{fontFamily: 'Poppins', fontSize: '32px', margin: '0', fontWeight: '500'}}>Welcome back!</p>
            <p style={{fontFamily: 'Poppins', fontSize: '16px', margin: '0', fontWeight: '500'}}>Enter you credentials to access your account.</p>

            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px'}}>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='email' style={{fontWeight: '500'}}>Email address</label>
                <input type="email" 
                placeholder="Enter your email" 
                name="email" 
                onChange={handleChange} 
                value={formData.email}  
                required
                style={{
                    fontFamily: 'Poppins',
                    borderRadius: '15px',
                    height: '40px',
                    border: '1px solid #a0a0a0ff',
                    paddingLeft:'20px', paddingRight: '20px',
                }}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor='password' style={{fontWeight: '500'}}>Password</label>
                <input type="password" 
                name="password"
                onChange={handleChange}
                value={formData.password}
                required 
                placeholder="Enter your password"
                style={{
                    fontFamily: 'Poppins',
                    borderRadius: '15px',
                    height: '40px',
                    border: '1px solid #a0a0a0ff',
                    paddingLeft:'20px', paddingRight: '20px'
                }}/>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <a href style={{ textDecoration: 'none', color: 'blue', fontSize:'12px' }}>Forgot password?</a>
                </div>
                <button type="submit"
                style={{
                    backgroundColor: 'black',
                    height: '42px',
                    borderRadius: '15px',
                    color: '#FFF',
                    fontFamily: 'Poppins',
                    fontWeight: '500px'
                }}>Login</button>
            </form>
        </div>
    )
}