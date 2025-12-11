import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error for this specific field when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // 1. Password Complexity
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be 8+ chars, with 1 letter, 1 number, & 1 special char.";
            isValid = false;
        }

        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match!";
            isValid = false;
        }

        // 2. Phone Number Format
        const phoneRegex = /^[0-9]{11}$/;
        if (!phoneRegex.test(formData.phonenumber)) {
            newErrors.phonenumber = "Phone number must be exactly 11 digits.";
            isValid = false;
        }

        // 3. Name Validation (No numbers/symbols)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(formData.firstname)) {
            newErrors.firstname = "First name cannot contain numbers or special characters.";
            isValid = false;
        }
        if (!nameRegex.test(formData.lastname)) {
            newErrors.lastname = "Last name cannot contain numbers or special characters.";
            isValid = false;
        }

        // 4. Terms Agreement
        if (!agreeTerms) {
            newErrors.terms = "You must agree to the Terms & Policy.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:8081/api/customer/register", formData);
            alert("Registration Successful! Please login.");
            navigate("/");
        } catch (error) {
            console.error("Error registering user:", error);
            if (error.response && error.response.data) {
                // This catches both Validation errors and our custom "Duplicate Email" error
                setErrors(error.response.data);
            } else {
                alert("Registration failed! Is the backend running?");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const errorStyle = { color: 'red', fontSize: '12px', marginTop: '2px', fontFamily: 'Poppins' };
    const inputStyle = (hasError) => ({
        fontFamily: 'Poppins',
        borderRadius: '15px',
        height: '40px',
        border: hasError ? '1px solid red' : '1px solid #a0a0a0ff',
        paddingLeft: '20px',
        paddingRight: '20px',
        width: '100%',
        boxSizing: 'border-box'
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', width: '420px', boxSizing: 'border-box' }}>
            <p style={{ fontFamily: 'Poppins', fontSize: '32px', margin: '0', fontWeight: '500' }}>
                Get Started Now
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                
                {/* Name Row */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 48%' }}>
                        <label htmlFor='firstname' style={{ fontWeight: '500' }}>Firstname</label>
                        <input
                            id='firstname' name="firstname" onChange={handleChange} value={formData.firstname}
                            type='text' placeholder='Enter first name' required
                            style={inputStyle(errors.firstname)}
                        />
                        {errors.firstname && <span style={errorStyle}>{errors.firstname}</span>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 48%' }}>
                        <label htmlFor='lastname' style={{ fontWeight: '500' }}>Lastname</label>
                        <input
                            id='lastname' name="lastname" onChange={handleChange} value={formData.lastname}
                            type='text' placeholder='Enter last name' required
                            style={inputStyle(errors.lastname)}
                        />
                        {errors.lastname && <span style={errorStyle}>{errors.lastname}</span>}
                    </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='email' style={{ fontWeight: '500' }}>Email address</label>
                    <input
                        id='email' name="email" onChange={handleChange} value={formData.email}
                        type='email' placeholder='Enter your email' required
                        style={inputStyle(errors.email)}
                    />
                    {errors.email && <span style={errorStyle}>{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='phonenumber' style={{ fontWeight: '500' }}>Phone Number</label>
                    <input
                        id='phonenumber' name="phonenumber" onChange={handleChange} value={formData.phonenumber}
                        type="tel" placeholder='09xxxxxxxxx' maxLength={11} required
                        style={inputStyle(errors.phonenumber)}
                    />
                    {errors.phonenumber && <span style={errorStyle}>{errors.phonenumber}</span>}
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='password' style={{ fontWeight: '500' }}>Password</label>
                    <input
                        id='password' name="password" onChange={handleChange} value={formData.password}
                        type='password' placeholder='Enter your password' required
                        style={inputStyle(errors.password)}
                    />
                    {errors.password && <span style={errorStyle}>{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor='confirmPassword' style={{ fontWeight: '500' }}>Confirm Password</label>
                    <input
                        id='confirmPassword' type='password' onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword} required placeholder='Confirm your password'
                        style={inputStyle(errors.confirmPassword)}
                    />
                    {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}
                </div>

                {/* Terms Checkbox */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <input 
                            type="checkbox" 
                            style={{ accentColor: 'black', marginRight: '8px' }}
                            checked={agreeTerms}
                            onChange={(e) => {
                                setAgreeTerms(e.target.checked);
                                if(e.target.checked) setErrors({...errors, terms: null});
                            }}
                        />
                        <p style={{ fontSize: '12px', margin: 0 }}>I agree to <a href="#" style={{ color: '#000' }}>Terms & Policy</a></p>
                    </div>
                    {errors.terms && <span style={errorStyle}>{errors.terms}</span>}
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    disabled={isLoading}
                    style={{
                        backgroundColor: isLoading ? '#555' : 'black',
                        height: '42px', borderRadius: '15px', color: '#FFF',
                        fontFamily: 'Poppins', fontWeight: '500', cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? 'Registering...' : 'Sign up'}
                </button>
            </form>
        </div>
    );
}