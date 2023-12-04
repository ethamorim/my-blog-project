const CommentsList = ({ comments }) => {
    const renderComments = () => {
        const newCommentsArray = comments.map(comment => (
            <div className="comment" key={comment.postedBy + ': ' + comment.text}>
                <h4><strong>{ comment.postedBy }</strong> said:</h4>
                <p>{ comment.text }</p>
            </div>
        ));
        return newCommentsArray;
    };

    return (
        <>
            <h3 className="comments-title">Comments:</h3>
            { renderComments() }
        </>
    )
};

export default CommentsList;