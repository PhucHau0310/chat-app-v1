import { useLocation, useNavigate } from 'react-router-dom';
import './messageDetail.css';
import back from '../../assets/Back.svg';
import avatarDefault from '../../assets/avatar-default.jpg';
import call from '../../assets/Call-1.svg';
import video from '../../assets/Video.svg';
import clipAttachment from '../../assets/Clip-Attachment.svg';
import files from '../../assets/files.svg';
import camera from '../../assets/camera01.svg';
import microphone from '../../assets/microphone.svg';
import send from '../../assets/Send.svg';
import { useState, useEffect } from 'react';
import { socket } from '../../createInstance';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MessageDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const conversationId = location.state.con._id;

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    // console.log(messages);

    useEffect(() => {
        socket.on('newMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // return () => {
        //     socket.disconnect();
        // };
    }, [socket]);

    useEffect(() => {
        const getAllMess = async () => {
            try {
                const res = await axios.get(`/v1/message/${conversationId}`, {
                    headers: { token: `Bearer ${user?.accessToken}` },
                });

                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllMess();
    }, []);

    const handleSendMess = async () => {
        if (conversationId) {
            const data = {
                conversationId: conversationId,
                sender: user?._id,
                text: message,
            };

            try {
                await axios.post('/v1/message/', data, {
                    headers: { token: `Bearer ${user?.accessToken}` },
                });
            } catch (error) {
                console.log(error);
            }

            await socket.emit('message', data);
            // setMessages((prev) => [...prev, data]);
            setMessage('');
        }
    };

    const handleClickBack = () => {
        if (conversationId) {
            socket.emit('leave', conversationId);
        }
        navigate('/home');
    };
    return (
        <div className="message-user">
            <div className="message-user-heading">
                <img src={back} alt="icon-back" onClick={handleClickBack} />
                <img
                    // src={location.state.friend.avatar || avatarDefault}
                    src={location.state.con.avatar || avatarDefault}
                    alt="ava"
                    className="message-ava"
                />

                <div className="message-user-info">
                    <h1 className="info-name">
                        {/* {location.state.friend.username} */}
                        {location.state.con.name}
                    </h1>
                    <p className="info-active">Active now</p>
                </div>

                <div className="message-calls">
                    <img src={call} alt="call" />
                    <img src={video} alt="video" />
                </div>
            </div>

            <div className="message-origin">
                {messages.map((mess) =>
                    user?._id === mess.sender ? (
                        <div className="message-origin-user">
                            <p
                                className="message-name-user"
                                style={{ textAlign: 'right' }}
                            >
                                {/* {location.state.friend.username} */}
                                {location.state.con.members[0].username}
                            </p>
                            <p className="message-text">{mess.text}</p>
                            <p className="message-time">09:25 AM</p>
                        </div>
                    ) : (
                        <div
                            className="message-origin-receiver"
                            // style={{ paddingTop: '8px' }}
                        >
                            <img
                                // src={location.state.friend.avatar}
                                src={location.state.con.avatar || avatarDefault}
                                alt="ava"
                                className="message-origin-ava"
                            />
                            <div className="message-origin-info">
                                <p className="message-name-user">
                                    {/* {location.state.friend.username} */}
                                    {location.state.con.members[1].username}
                                </p>
                                <p className="message-text2">{mess.text}</p>
                                <p className="message-time2">09:25 AM</p>
                            </div>
                        </div>
                    )
                )}
            </div>

            <div className="message-fixed">
                <img src={clipAttachment} alt="clip-attachment" />
                <input
                    value={message}
                    type="text"
                    className="message-fixed-input"
                    placeholder="Write your message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <img src={files} alt="files" className="message-files" />

                {message ? (
                    <div className="message-icon-send" onClick={handleSendMess}>
                        <img src={send} alt="send" />
                    </div>
                ) : (
                    <>
                        <img
                            src={camera}
                            alt="camera"
                            style={{ marginLeft: '16px' }}
                        />
                        <img
                            src={microphone}
                            alt="microphone"
                            style={{ marginLeft: '12px' }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default MessageDetail;
