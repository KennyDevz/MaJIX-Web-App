import {useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function SignUpForm() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    })

    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
        
        if (formData.password !== confirmPassword) {
            setMessage("Passwords do not match!");
            alert("Password does not match!")
            return;
        }

        try {
        const response = await axios.post("http://localhost:8081/api/customer/register", formData);
        setMessage("Registration successful!");
        alert("Registration Successful!")
        navigate("/")
        console.log("Registered user:", response.data);
        } catch (error) {
        console.error("Error registering user:", error);
        setMessage("Registration failed!");
        }
  };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
                width: '420px', // 🔹 slightly increased to fit both fields cleanly
                boxSizing: 'border-box'
            }}
        >
            <p
                style={{
                    fontFamily: 'Poppins',
                    fontSize: '32px',
                    margin: '0',
                    fontWeight: '500'
                }}
            >
                Get Started Now
            </p>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '30px'
                }}
            >
                {/* 🔹 Name row */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        width: '100%',
                        flexWrap: 'wrap' // ✅ will wrap to next line if space is tight
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: '1 1 48%' // ✅ ensures equal width and wrapping
                        }}
                    >
                        <label htmlFor='firstname' style={{ fontWeight: '500' }}>
                            Firstname
                        </label>
                        <input
                            id='firstname'
                            name="firstname"
                            onChange={handleChange}
                            value={formData.firstname}
                            type='text'
                            placeholder='Enter first name'
                            required
                            style={{
                                fontFamily: 'Poppins',
                                borderRadius: '15px',
                                height: '40px',
                                border: '1px solid #a0a0a0ff',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: '1 1 48%'
                        }}
                    >
                        <label htmlFor='lastname' style={{ fontWeight: '500' }}>
                            Lastname
                        </label>
                        <input
                            id='lastname'
                            name="lastname"
                            onChange={handleChange}
                            value={formData.lastname}
                            type='text'
                            placeholder='Enter last name'
                            required
                            style={{
                                fontFamily: 'Poppins',
                                borderRadius: '15px',
                                height: '40px',
                                border: '1px solid #a0a0a0ff',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='email' style={{ fontWeight: '500' }}>
                        Email address
                    </label>
                    <input
                        id='email'
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        type='email'
                        placeholder='Enter your email'
                        required
                        style={{
                            fontFamily: 'Poppins',
                            borderRadius: '15px',
                            height: '40px',
                            border: '1px solid #a0a0a0ff',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='password' style={{ fontWeight: '500' }}>
                        Password
                    </label>
                    <input
                        id='password'
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        type='password'
                        required
                        placeholder='Enter your password'
                        style={{
                            fontFamily: 'Poppins',
                            borderRadius: '15px',
                            height: '40px',
                            border: '1px solid #a0a0a0ff',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Confirm Password */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='confirmPassword' style={{ fontWeight: '500' }}>
                        Confirm Password
                    </label>
                    <input
                        id='confirmPassword'
                        type='password'
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                        placeholder='Confirm your password'
                        style={{
                            fontFamily: 'Poppins',
                            borderRadius: '15px',
                            height: '40px',
                            border: '1px solid #a0a0a0ff',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Forgot Password */}
                <div style={{ display: 'flex', flexDirection:'row', justifyContent: 'flex-start' }}>
                    <input type="checkbox" style={{accentColor: 'black'}}/>
                    <p style={{fontSize: '12px'}}>I agree to <a href="#" style={{ color:'#000'}}>Terms & Policy</a></p>
                </div>

                {/* Button */}
                <button
                    type='submit'
                    style={{
                        backgroundColor: 'black',
                        height: '42px',
                        borderRadius: '15px',
                        color: '#FFF',
                        fontFamily: 'Poppins',
                        fontWeight: '500'
                    }}
                >
                    sign up
                </button>
            </form>
        </div>
    );
}
