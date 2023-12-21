import { useNavigate } from 'react-router-dom';
import back from '../../assets/Back-1.svg';
import qrCode from '../../assets/Qrcode.svg';
import './setting.css';
import Footer from '../../Components/Footer/footer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { logoutSuccess } from '../../redux/authSlice';

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleLogOut = () => {
        logout(dispatch, navigate, axiosJWT, user?.accessToken, user?._id);
    };
    return (
        <div className="setting">
            <div className="setting-on">
                <img
                    src={back}
                    alt="icon-back"
                    onClick={() => navigate('/home')}
                />
                <h1 className="setting-heading">Settings</h1>
            </div>

            <div className="setting-bottom">
                <img
                    src={user?.avatar}
                    alt="avatar-user"
                    className="setting-avatar"
                />

                <div className="setting-userinfo">
                    <h2 className="setting-name">{user?.username}</h2>
                    <p className="setting-desc">Never give up 💪</p>
                </div>

                <img src={qrCode} alt="qr code" className="setting-qr" />
            </div>

            <div className="setting-info">
                <button className="btn-logout" onClick={handleLogOut}>
                    Log out
                </button>
                <div className="setting-info-item">
                    <h2 className="setting-info-heading">Display Name</h2>
                    <p className="setting-info-desc">{user?.username}</p>
                </div>

                <div className="setting-info-item">
                    <h2 className="setting-info-heading">Email Address</h2>
                    <p className="setting-info-desc">{user?.email}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Settings;
