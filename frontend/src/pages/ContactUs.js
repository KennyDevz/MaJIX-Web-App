import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function ContactUs() {
    const { user } = useContext(UserContext);
    
    // Auto-fill data if user is logged in
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "Inquiry", // Default selection
        message: ""
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: `${user.firstname} ${user.lastname}`,
                email: user.email || "" // Assuming email is in user object
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Replace with your actual Spring Boot endpoint
            const response = await fetch("http://localhost:8080/api/contact/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Message sent successfully! We will get back to you soon.");
                setFormData({ ...formData, message: "" }); // Clear message only
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please check your connection.");
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            padding: '50px',
            backgroundColor: '#f9f9f9',
            backgroundImage: `linear-gradient(rgba(0, 13, 42, 0.74), rgba(0, 13, 42, 0.74)), url('https://highxtar.com/wp-content/uploads/2022/10/thumb-esta-el-streetwear-pasado-de-moda.jpg')`
        }}>
            <div style={{
                width: '600px',
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Contact Us</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                    Have an inquiry or a complaint? We are here to help.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Name Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: '500' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            placeholder="john@example.com"
                        />
                    </div>

                    {/* Inquiry Type (Dropdown for Transaction 1 requirement) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: '500' }}>Subject Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="Inquiry">General Inquiry</option>
                            <option value="Complaint">Complaint</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Order Issue">Order Issue</option>
                        </select>
                    </div>

                    {/* Message Field */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: '500' }}>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                            placeholder="How can we help you?"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            padding: '12px',
                            backgroundColor: '#000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '62px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginTop: '10px'
                        }}
                    >
                        SEND MESSAGE
                    </button>
                </form>
            </div>
        </div>
    );
}
