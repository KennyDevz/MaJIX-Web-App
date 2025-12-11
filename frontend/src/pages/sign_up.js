import SignUpForm from "../components/user/sign_up_form"

export default function SignUp(){
    return(
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {/* Replaced backgroundColor with backgroundImage styles from HomePage */}
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 13, 42, 0.74), rgba(0, 13, 42, 0.74)), url('https://highxtar.com/wp-content/uploads/2022/10/thumb-esta-el-streetwear-pasado-de-moda.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '87.6dvh',
                borderRadius: '30px',
                width: '50%',
                marginLeft: '-50px',
                color: '#FFF'
            }}></div>


            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50%', margin: '0'}}>

                <div style={{display:'flex', justifyContent: 'center', width: '100%' }}>
                    <SignUpForm />
                </div>
                
            </div>
            
        </div>
    )
}