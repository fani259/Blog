import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { useFetch } from '@/hooks/UseFetch';
import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const LikeCount = ({ props }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    const { user, isLoggedIn } = useSelector(state => state.user); // ✅ Extract user & isLoggedIn properly

    const { data: blogLikeCount, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/blog-like/get-like/${props.blogid}`,
        {
            method: 'get',
            credentials: 'include',
        }
    );

    useEffect(() => {
        if (blogLikeCount) {
            setLikeCount(blogLikeCount.likecount);
            setHasLiked(blogLikeCount.isUserliked);
        }
    }, [blogLikeCount]);

    const handleLike = async () => {
        try {
            if (!isLoggedIn) { // ✅ Fixed authentication check
                return showToast('error', 'Please login into your account.');
            }

            // console.log("User State:", user);

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`, { // ✅ Fixed typo in getEnv
                method: 'post',
                credentials: 'include',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ user: user._id, blogid: props.blogid }) // ✅ Using correct user structure
            });

            if (!response.ok) {
                return showToast('error', response.statusText);
            }

            const responseData = await response.json();
            setLikeCount(responseData.likecount);
            setHasLiked(!hasLiked);
        } catch (error) {
            showToast('error', error.message);
        }
    };

    return (
        <button onClick={handleLike} type='button' className='flex justify-between items-center gap-1 cursor-pointer'>
            {!hasLiked ? <FaRegHeart /> : <FaHeart fill='red' />}
            {likeCount}
        </button>
    );
};

export default LikeCount;
