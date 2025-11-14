import SignUpForm from "../components/user/sign_up_form"

export default function SignUp(){
    return(
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{backgroundColor: '#000000ff', height: '87.6dvh',borderRadius: '30px', width: '50%', marginLeft: '-50px', color: '#FFF'}}></div>


            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50%', margin: '0'}}>

                <div style={{display:'flex', justifyContent: 'center', width: '100%' }}>
                    <SignUpForm />
                </div>
                
            </div>
            
        </div>
    )
}