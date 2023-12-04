import ArticlesList from "../components/ArticlesList";
import articles from "../assets/articlesContent";

const ArticlesListPage = () => (
  <>
    <h1 className="articles-list-title">Articles</h1>
    <ArticlesList articles={articles} />
  </>
);
export default ArticlesListPage;