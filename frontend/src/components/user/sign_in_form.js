
export default function SignInForm(){
    
    return(
        <div style={{display: 'flex', flexDirection: 'column', marginTop: '30px', width: '404px'}}>
            <p style={{fontFamily: 'Poppins', fontSize: '32px', margin: '0', fontWeight: '500'}}>Welcome back!</p>
            <p style={{fontFamily: 'Poppins', fontSize: '16px', margin: '0', fontWeight: '500'}}>Enter you credentials to access your account.</p>

            <form  style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '50px'}}>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                <label for='email' style={{fontWeight: '500'}}>Email address</label>
                <input type="email" placeholder="Enter your email" required
                style={{
                    fontFamily: 'Poppins',
                    borderRadius: '15px',
                    height: '40px',
                    border: '1px solid #a0a0a0ff',
                    paddingLeft:'20px', paddingRight: '20px',
                }}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <label for='password' style={{fontWeight: '500'}}>Password</label>
                <input type="password" required placeholder="Enter your password"
                style={{
                    fontFamily: 'Poppins',
                    borderRadius: '15px',
                    height: '40px',
                    border: '1px solid #a0a0a0ff',
                    paddingLeft:'20px', paddingRight: '20px'
                }}/>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <a href='' style={{ textDecoration: 'none', color: 'blue', fontSize:'12px' }}>Forgot password?</a>
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