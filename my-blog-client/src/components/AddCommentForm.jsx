import axios from "axios";
import { useState } from "react";

const AddCommentForm = ({ articleId, onArticleUpdated }) => {
    const [ name, setName ] = useState('');
    const [ commentText, setCommentText ] = useState('');

    const addComment = async () => {
        const { data } = await axios.post(`/api/articles/${articleId}/comment`, {
            postedBy: {
                name,
            },
            text: commentText,
        });
        onArticleUpdated(data);
        setName('');
        setCommentText('');
    };

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}    
                />
            </label>

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