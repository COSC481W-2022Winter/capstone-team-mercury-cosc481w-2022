import React from 'react';
import { useParams } from "react-router-dom";
import PostPage from '../pages/postPage';

function GetPost() {
    const { postId } = useParams();

    return (
        <PostPage postId={postId} />
    );
}
export default GetPost;