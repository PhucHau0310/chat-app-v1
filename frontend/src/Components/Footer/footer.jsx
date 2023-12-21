import message from '../../assets/Message.svg';
import call from '../../assets/Call.svg';
import user from '../../assets/user.svg';
import settings from '../../assets/settings.svg';
import './footer.css';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="footer">
            <div className="footer-item" onClick={() => navigate('/home')}>
                <img src={message} alt="message-icon" />
                <p className="message-desc">Message</p>
            </div>
            <div className="footer-item">
                <img src={call} alt="message-icon" />
                <p className="message-desc">Calls</p>
            </div>
            <div className="footer-item">
                <img src={user} alt="message-icon" />
                <p className="message-desc">Contacts</p>
            </div>
            <div className="footer-item" onClick={() => navigate('/setting')}>
                <img src={settings} alt="message-icon" />
                <p className="message-desc">Settings</p>
            </div>
        </footer>
    );
};

export default Footer;
