import { useEffect, useState } from 'react';
import './App.css';
import Onboarding from './Pages/Onboarding/Onboarding';
import SearchPage from './Pages/Search/Search';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Desktop from './Pages/Desktop/Desktop';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Settings from './Pages/Settings/settings';
import { useSelector } from 'react-redux';
import MessageDetail from './Pages/MessageDetail/MessageDetail';

function App() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    const [isMobile, setMobile] = useState(true);

    useEffect(() => {
        const handleSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleSize);
        handleSize();
        return () => window.removeEventListener('resize', handleSize);
    }, []);

    useEffect(() => {
        if (windowSize.width > 500) {
            setMobile(false);
        } else {
            setMobile(true);
        }
    }, [windowSize]);

    return (
        <Router>
            {isMobile ? (
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Onboarding />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/setting"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/search"
                            element={
                                <ProtectedRoute>
                                    <SearchPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/message"
                            element={
                                <ProtectedRoute>
                                    <MessageDetail />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            ) : (
                <>
                    <Desktop />
                </>
            )}
        </Router>
    );
}

export default App;
