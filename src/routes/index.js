import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import TopStories from '../pages/TopStories';
import StoryDetailsCard from '../components/top-stories/StoryDetailsCard';
import SearchDetailsCard from '../components/search/SearchDetailCard';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {

    const PrivateRoute = ({ children }) => {
        let token = window.localStorage.getItem('access_token')
        if (token) {
            return children
        }
        return <Navigate to="/" />
    }

    const PublicRoute = ({ children }) => {
        let token = window.localStorage.getItem('access_token')
        if (token) {
            return <TopStories />
        }
        return children
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
                <Route path="/top-stories/:category" element={<PrivateRoute><TopStories /></PrivateRoute>} />
                <Route path="/top-stories/:category/:published_date/:section/:name" element={<StoryDetailsCard />} />
                <Route path="/top-stories/search/:published_date/:title" element={<SearchDetailsCard />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
                <Route path="/404" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;