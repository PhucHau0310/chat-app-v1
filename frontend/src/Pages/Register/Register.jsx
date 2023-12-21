import '../Login/login.css';
import './register.css';
import back from '../../assets/Back.svg';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userRegister } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const register = useSelector((state) => state.auth.register);

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required')
                .min(6, 'Must be 6 characters or more')
                .max(20, 'Length max of username be 20 characters'),
            email: Yup.string()
                .required('Required')
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    'Please enter a valid email address'
                )
                .min(10, 'Must be 10 characters or more')
                .max(50, 'Length max of email be 50 characters'),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    'Password must be 7-19 characters and contain at least one letter, one number and a special character'
                )
                .min(6, 'Must be 6 characters or more'),
        }),
        onSubmit: (values) => {
            // window.alert('Form submitted');
            // console.log(values);
            userRegister(dispatch, navigate, values);
        },
    });
    return (
        <div className="login">
            <img src={back} alt="logo-back" onClick={() => navigate('/')} />
            <h1 className="login-header">Sign up with email</h1>
            <p className="login-desc">
                Get chatting with friends and family today by signing up for our
                chat app!
            </p>

            <form
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                className="login-form"
                style={{ marginTop: '62px' }}
            >
                <div
                    className="login-form-detail"
                    style={{ marginBottom: '30px' }}
                >
                    <label htmlFor="login-input" className="login-label">
                        Your name
                    </label>
                    <br />
                    <input
                        name="username"
                        id="login-input"
                        className="login-input"
                        type="text"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                        <p className="register-err">{formik.errors.username}</p>
                    )}
                </div>

                <div className="login-form-detail">
                    <label htmlFor="login-input" className="login-label">
                        Your email
                    </label>
                    <br />
                    <input
                        name="email"
                        id="login-input"
                        className="login-input"
                        type="text"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                        <p className="register-err">{formik.errors.email}</p>
                    )}
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
                        name="password"
                        id="login-input1"
                        className="login-input"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                        <p className="register-err">{formik.errors.password}</p>
                    )}
                </div>

                {register.success && (
                    <p style={{ textAlign: 'center', marginTop: '18px' }}>
                        Register Successfully !
                    </p>
                )}

                {register.isLoading && (
                    <p style={{ textAlign: 'center', marginTop: '18px' }}>
                        Loading...
                    </p>
                )}

                <button type="submit" className="login-btn onboarding-btn">
                    Create an account
                </button>

                <p className="login-account onboarding-redirect-login">
                    Already an account yet?{' '}
                    <span
                        className="login-account onboarding-login"
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
