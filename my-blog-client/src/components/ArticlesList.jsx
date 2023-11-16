import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => {
    return (
        <>
            {articles.map(article => (
                <Link key={article.name} to={article.id} className="article-list-item">
                    <h3>{article.title}</h3>
                    <p>{article.content[0].substring(0, 150).trim()}...</p>
                </Link>
            ))}
        </>
    );
};
export default ArticlesList;