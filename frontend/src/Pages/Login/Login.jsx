import './login.css';
import back from '../../assets/Back.svg';
import fb from '../../assets/fb.svg';
import gg from '../../assets/gg.svg';
import appleBlack from '../../assets/apple-black.svg';
import toggle from '../../assets/togle-pass.svg';
import '../Onboarding/onboarding.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const [hidden, setHidden] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Submit');
        const user = {
            username,
            password,
        };
        userLogin(dispatch, navigate, user);
    };

    const login = useSelector((state) => state.auth.login);

    return (
        <div className="login">
            <img src={back} alt="logo-back" onClick={() => navigate('/')} />
            <h1 className="login-header">Log in to Chatbox</h1>
            <p className="login-desc">
                Welcome back! Sign in using your social account or email to
                continue us
            </p>

            <div className="onboarding-options">
                <div className="onboarding-img">
                    <img src={fb} alt="facebook" />
                </div>

                <div className="onboarding-img">
                    <img src={gg} alt="google" />
                </div>

                <div className="onboarding-img">
                    <img src={appleBlack} alt="apple" />
                </div>
            </div>

            <span className="onboarding-or">OR</span>

            <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="login-form"
            >
                <div className="login-form-detail">
                    <label htmlFor="login-input" className="login-label">
                        Username
                    </label>
                    <br />
                    <input
                        value={username}
                        id="login-input"
                        className="login-input"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-form-detail login-form-detail-2">
                    <label
                        htmlFor="login-input1"
                        className="login-label login-label-pass"
                    >
                        Password
                    </label>
                    <br />
                    <input
                        value={password}
                        id="login-input1"
                        className="login-input"
                        type={hidden ? 'password' : 'text'}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <img
                        onClick={() => setHidden(!hidden)}
                        src={toggle}
                        alt="toggle-password"
                        className="toggle-password"
                    />
                </div>

                {login.isLoading && (
                    <p style={{ textAlign: 'center', marginTop: '18px' }}>
                        Loading...
                    </p>
                )}

                <button type="submit" className="login-btn onboarding-btn">
                    Login
                </button>

                <p className="login-account onboarding-redirect-login">
                    Don't have an account?{' '}
                    <span
                        className="login-account onboarding-login"
                        onClick={() => navigate('/register')}
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
