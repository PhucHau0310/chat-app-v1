import { useState } from 'react';
import remove from '../../assets/remove.svg';
import './inputCreateCon.css';
import { useDispatch, useSelector } from 'react-redux';
import { createConversation } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';

const InputCreateCon = (props) => {
    const { setInputCreateCon } = props;
    const [name, setName] = useState('');
    const [friendId, setFriendId] = useState('');
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newConversation = {
            name: name,
            senderId: user?._id,
            receiverId: friendId,
        };

        createConversation(
            dispatch,
            axiosJWT,
            user?.accessToken,
            newConversation
        );

        setInputCreateCon(false);
    };
    return (
        <div className="form-create-conversation">
            <form className="form-create-ori" onSubmit={handleSubmit}>
                <div className="form-detail">
                    <label htmlFor="conversationName" className="con-label">
                        Conversation Name:{' '}
                    </label>
                    <input
                        value={name}
                        type="text"
                        id="conversationName"
                        className="conversation-name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <br />
                <div className="form-detail">
                    <label htmlFor="friendName" className="con-label">
                        Friend ID:{' '}
                    </label>
                    <input
                        value={friendId}
                        type="text"
                        id="friendName"
                        className="friend-name"
                        onChange={(e) => setFriendId(e.target.value)}
                    />
                </div>

                <button className="create-con" type="submit">
                    Create
                </button>
                <img
                    src={remove}
                    alt=""
                    onClick={() => setInputCreateCon(false)}
                    className="remove-con"
                />
            </form>
        </div>
    );
};

export default InputCreateCon;
