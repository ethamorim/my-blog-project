import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CommentsList from "../components/CommentsList";
import NotFoundPage from "./NotFoundPage";

import articles from '../assets/articlesContent';
import axios from "axios";
import AddCommentForm from "../components/AddCommentForm";
import { useUser } from "../hooks/useUser";

const ArticlePage = () => {
  const navigate = useNavigate();

  const [ articleInfo, setArticleInfo ] = useState({ upvoteIds: [], comments: [], hasUpvoted: false });
  const { articleId } = useParams();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
  
        const { data } = await axios.get(`/api/articles/${articleId}`, { headers });
        const { upvoteIds, comments, hasUpvoted } = data;
        
        setArticleInfo({ upvoteIds, comments, hasUpvoted }); 
    }

    if (!isLoading) {
      loadArticleInfo();
    }
  }, [ user ]);

  const article = articles.find(article => article.id === articleId);

  if (!article) 
    return (<NotFoundPage />);

  const addUpvote = async () => {
    try {
      const token = user && await user.getIdToken();
      const headers = token ? { authtoken: await user.getIdToken() } : {};
      const { data } = await axios.put(`/api/articles/${articleId}/upvote`, {}, { headers });
      data.hasUpvoted = true;
      setArticleInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getUpvoteButton = () => {
    if (!user) {
      return (
        <button onClick={() => navigate('/login')}>Log in to upvote</button>
      );
    } else if (user && articleInfo.hasUpvoted) {
      return (
        <div className="upvotes-section">
          <span>Upvoted!</span>
          <p>This article has { articleInfo.upvoteIds.length } upvote(s)</p>
        </div>
      );
    } else {
      return (
        <div className="upvotes-section">
            <button onClick={addUpvote}>Upvote</button>
            <p>This article has { articleInfo.upvoteIds.length } upvote(s)</p>
          </div>
      );
    }
  };
  
  return (
    <>
      <h1>{article.title}</h1>

      { getUpvoteButton() }

      {article.content.map((paragraph, i) => (
        <p key={i}>{ paragraph }</p>
      ))}
      {
        user
          ? (
            <AddCommentForm 
              articleId={articleId}
              onArticleUpdated={comments => setArticleInfo({ ...articleInfo, comments })}
            />
          ) : (
            <button>Log in to comment</button>
          )
      }
      
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};
export default ArticlePage;