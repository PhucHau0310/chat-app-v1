import './navbar.css';
import search from '../../assets/search.svg';
import avatarDefault from '../../assets/avatar-default.jpg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div
                className="over-navbar-search"
                onClick={() => navigate('/search')}
            >
                <img src={search} alt="navbar-search" />
            </div>
            <h1 className="navbar-text">Home</h1>
            <div className="over-navbar-avatar">
                <img
                    src={user?.avatar || avatarDefault}
                    alt="navbar-avatar"
                    className="navbar-avatar"
                />
            </div>
        </nav>
    );
};

export default Navbar;
