import logo from '../../assets/logo.svg';
import fb from '../../assets/fb.svg';
import gg from '../../assets/gg.svg';
import apple from '../../assets/apple.svg';
import './onboarding.css';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const navigate = useNavigate();
    return (
        <div className="onboarding">
            <div className="onboarding-header">
                <img className="onboarding-logo" src={logo} alt="logo-app" />
                <p className="onboarding-name">Chatbox</p>
            </div>

            <div className="onboarding-content">
                <h1 className="onboarding-title">
                    Connect friends <span>easily & quickly</span>
                </h1>
                <p className="onboarding-desc">
                    Our chat app is the perfect way to stay connected with
                    friends and family.
                </p>
            </div>

            <div className="onboarding-signup">
                <div className="onboarding-options">
                    <div className="onboarding-img">
                        <img src={fb} alt="facebook" />
                    </div>

                    <div className="onboarding-img">
                        <img src={gg} alt="google" />
                    </div>

                    <div className="onboarding-img">
                        <img src={apple} alt="apple" />
                    </div>
                </div>

                <span className="onboarding-or">OR</span>

                <button className="onboarding-btn">Sign up with mail</button>

                <p className="onboarding-redirect-login">
                    Existing account?{' '}
                    <span
                        className="onboarding-login"
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Onboarding;
