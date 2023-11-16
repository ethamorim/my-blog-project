import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentsList from "../components/CommentsList";
import NotFoundPage from "./NotFoundPage";

import articles from '../assets/articlesContent';
import axios from "axios";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {
  const [ articleInfo, setArticleInfo ] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const { data } = await axios.get(`/api/articles/${articleId}`);
      setArticleInfo({ upvotes: data.upvotes, comments: data.comments });
    }
    loadArticleInfo();
  }, []);

  const article = articles.find(article => article.id === articleId);

  if (!article) 
    return (<NotFoundPage />);

  const addUpvote = async () => {
    const { data } = await axios.put(`/api/articles/${articleId}/upvote`);
    setArticleInfo(data);
  };
  
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has { articleInfo.upvotes } upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{ paragraph }</p>
      ))}
      <AddCommentForm 
        articleId={articleId}
        onArticleUpdated={comments => setArticleInfo({ upvotes: articleInfo.upvotes, comments })}
      />
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};
export default ArticlePage;