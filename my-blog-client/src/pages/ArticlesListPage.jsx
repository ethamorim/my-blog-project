import ArticlesList from "../components/ArticlesList";
import articles from "../assets/articlesContent";

const ArticlesListPage = () => (
  <>
    <h1>Articles</h1>
    <ArticlesList articles={articles} />
  </>
);
export default ArticlesListPage;