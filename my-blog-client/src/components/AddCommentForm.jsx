import axios from "axios";
import { useState } from "react";
import { useUser } from "../hooks/useUser";

const AddCommentForm = ({ articleId, onArticleUpdated }) => {
    const [ name, setName ] = useState('');
    const [ commentText, setCommentText ] = useState('');
    const { user, isLoading } = useUser();

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
            setName('');
            setCommentText('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Comment:
                <textarea 
                    rows="4" 
                    cols="50" 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}    
                />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
};

export default AddCommentForm;