import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentsList from "../components/CommentsList";
import NotFoundPage from "./NotFoundPage";

import articles from '../assets/articlesContent';
import axios from "axios";

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
  
  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has { articleInfo.upvotes } upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i}>{ paragraph }</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};
export default ArticlePage;