import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useUser } from "../hooks/useUser";

const AddCommentForm = ({ articleId, onArticleUpdated }) => {
    const navigate = useNavigate();
    const [ commentText, setCommentText ] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        try {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};

            const { data } = await axios.post(`/api/articles/${articleId}/comment`, {
                commentText,
            }, {
                headers
            });
            onArticleUpdated(data);
            setCommentText('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="add-comment-form">
            {
                user
                ? (
                    <>
                        <h3 className="comment-form-title">Add a Comment:</h3>
                            
                        <textarea 
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}    
                        />
                        
                        <button onClick={addComment}>Add Comment</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')}>Log in to comment</button>
                )
            }
            
        </div>
    )
};

export default AddCommentForm;