import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../Components/Footer/footer';
import Navbar from '../../Components/Navbar/Navbar';
import avatarDefault from '../../assets/avatar-default.jpg';
import './home.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputCreateCon from '../../Components/InputCreateCon/InputCreateCon';
import { getConversations } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';

import { socket } from '../../createInstance';

const Home = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const conversations = useSelector(
        (state) => state.conversation.getConversations?.infos
    );

    const [inputCreateCon, setInputCreateCon] = useState(false);

    // const handleMessageDetail = (friend) => {
    //     navigate('/message', { state: { friend } });
    // };

    const handleMessageDetail = (con) => {
        socket.emit('join', con?._id);
        navigate('/message', { state: { con } });
    };

    useEffect(() => {
        getConversations(dispatch, axiosJWT, user?.accessToken, user?._id);
    }, []);

    return (
        <div className="home" style={{ background: '#000e08' }}>
            {inputCreateCon ? (
                <>
                    <InputCreateCon setInputCreateCon={setInputCreateCon} />
                </>
            ) : (
                <>
                    <Navbar />
                    <div className="list-friends">
                        {user?.friends &&
                            user?.friends.map((friend) => (
                                <div
                                    className="navbar-avatar-item"
                                    // onClick={() => handleMessageDetail(friend)}
                                >
                                    <img
                                        src={friend?.avatar}
                                        alt="avatar-default"
                                        className="navbar-avatar"
                                    />
                                    <p className="friends-item-name">
                                        {friend.username}
                                    </p>
                                </div>
                            ))}
                    </div>

                    <div className="message-lists">
                        <div className="message-rectangle"></div>
                        {conversations?.map((con) => (
                            <div
                                className="message-item"
                                onClick={() => handleMessageDetail(con)}
                            >
                                <div className="message-detail">
                                    <img
                                        src={avatarDefault}
                                        alt="avatar"
                                        className="message-ava"
                                    />
                                    <div className="message-userinfo">
                                        <p className="message-name">
                                            {con.name}
                                        </p>
                                        <p className="message-feel">
                                            How are you today?
                                        </p>
                                    </div>
                                    <div className="message-action">
                                        <span className="message-action-ago">
                                            2 min ago
                                        </span>
                                        <div className="message-news">3</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="message-create-conversation"
                        onClick={() => setInputCreateCon(true)}
                    >
                        +
                    </div>
                </>
            )}

            <Footer />
        </div>
    );
};

export default Home;
