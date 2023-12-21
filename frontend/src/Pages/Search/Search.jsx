import search from '../../assets/search1.svg';
import remove from '../../assets/remove.svg';
import avatarDefault from '../../assets/avatar-default.jpg';
import plus from '../../assets/plus.svg';
import deletee from '../../assets/delete.svg';
import './search.css';
import '../Home/home.css';
import { useEffect, useState } from 'react';
import { addFriend, getAllUsers } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import Footer from '../../Components/Footer/footer';

const SearchPage = () => {
    const [isSearch, setSearch] = useState('');
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const users = useSelector((state) => state.user.users?.info);

    let friendIds = user?.friends.map((friend) => friend._id);
    let filteredUsers = users?.filter((user) => !friendIds?.includes(user._id));

    // console.log(friendIds);
    // console.log(filteredUsers);

    useEffect(() => {
        getAllUsers(dispatch, axiosJWT, user?.accessToken);
    }, []);

    const handleAddFriend = (receiverId) => {
        console.log(receiverId);
        addFriend(dispatch, axiosJWT, user?.accessToken, user?._id, receiverId);
    };

    return (
        <div className="search-page">
            <div className="search-input">
                <label htmlFor="search-in">
                    <img src={search} alt="search-icon" />
                </label>
                <input
                    value={isSearch}
                    id="search-in"
                    type="text"
                    className="search-in"
                    placeholder="search..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img
                    onClick={() => setSearch('')}
                    src={remove}
                    alt="search-icon-2"
                    className="search-icon-2"
                />
            </div>

            <h1 className="search-page-heading">People</h1>

            <div className="search-lists">
                {users &&
                    filteredUsers.map((userItem) => {
                        if (userItem._id !== user._id) {
                            return (
                                <div className="search-item">
                                    <div className="search-detail">
                                        <img
                                            src={userItem?.avatar}
                                            alt="avatar"
                                            className="search-ava"
                                        />
                                        <div className="search-userinfo">
                                            <p className="search-name">
                                                {userItem.username}
                                            </p>
                                            <p className="search-feel">
                                                How are you today?
                                            </p>
                                        </div>

                                        <div className="search-icon">
                                            <div
                                                className="plus-icon"
                                                onClick={() =>
                                                    handleAddFriend(
                                                        userItem._id
                                                    )
                                                }
                                            >
                                                <img
                                                    src={plus}
                                                    alt="plus-icon"
                                                />
                                            </div>

                                            {/* <div className="deletee-icon">
                                <img src={deletee} alt="deletee-icon" />
                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
