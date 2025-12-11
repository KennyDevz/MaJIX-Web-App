import { useEffect } from 'react';
export default function UnauthorizedPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: `linear-gradient(rgba(0, 13, 42, 0.85), rgba(0, 13, 42, 0.85)), url('https://images.unsplash.com/photo-1558882224-dda166733046?w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center',
                color: '#FFF'
            }}>
                <div style={{
                    fontSize: '120px',
                    fontWeight: '700',
                    margin: '0',
                    lineHeight: '1',
                    opacity: '0.9'
                }}>
                    401
                </div>

                <h1 style={{
                    fontSize: '48px',
                    fontWeight: '700',
                    margin: '20px 0',
                    fontStyle: 'normal'
                }}>
                    UNAUTHORIZED ACCESS
                </h1>

                <p style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    margin: '30px 0',
                    opacity: '0.9'
                }}>
                    You don't have permission to access this page. Please sign in with an authorized account or contact support if you believe this is an error.
                </p>

                <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'center',
                    marginTop: '50px',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={handleGoBack}
                        style={{
                            backgroundColor: 'transparent',
                            border: '2px solid #FFF',
                            color: '#FFF',
                            padding: '16px 40px',
                            fontSize: '16px',
                            fontWeight: '500',
                            borderRadius: '62px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            minWidth: '140px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        GO BACK
                    </button>
                </div>

                <div style={{
                    marginTop: '60px',
                    padding: '30px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <p style={{
                        fontSize: '14px',
                        margin: '0 0 15px 0',
                        opacity: '0.7'
                    }}>
                        Need help?
                    </p>
                    <p style={{
                        fontSize: '16px',
                        margin: '0',
                        fontWeight: '500'
                    }}>
                        Contact support at <span style={{ textDecoration: 'underline' }}>support@example.com</span>
                    </p>
                </div>
            </div>
        </div>
    );
}