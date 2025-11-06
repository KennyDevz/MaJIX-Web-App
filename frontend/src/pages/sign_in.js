import SignInForm from "../components/user/sign_in_form"

export default function SignIn(){
    return(
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{backgroundColor: '#000000ff', height: '87.6dvh',borderRadius: '30px', width: '50%', marginLeft: '-50px', color: '#FFF'}}></div>


            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', margin: '0'}}>
                <p style={{ textAlign: 'center', fontFamily: 'Inter', fontWeight: '700', fontSize: '48px', marginTop: '10', marginBottom: '0' }}>MaJIX</p>
        

                <div style={{display:'flex', justifyContent: 'center', width: '100%' }}>
                    <SignInForm />
                </div>
                
            </div>
            
        </div>
    )
}