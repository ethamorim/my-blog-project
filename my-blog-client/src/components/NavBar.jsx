import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();

    const [ activeLink, setActiveLink ] = useState(location.pathname);
    const links = [
        {
            name: 'Home',
            route: '/',
        },
        {
            name: 'Articles',
            route: '/articles'
        }
    ];
    const renderNav = () => {
        return links.map(link => (
            <li 
                key={link.route} 
                className={activeLink === link.route ? 'link-active' : ''}
                onClick={() => {
                    setActiveLink(link.route);
                    navigate(link.route);
                }}>
                <Link to='#'>{link.name}</Link>
            </li>
        ));
    };

    return (
        <header className="blog-header">
            <div className="my-logo">
                <span className="my-logo__eth">Eth</span>
                <span className="my-logo__amorim">Amorim</span>
            </div>

            <nav className="blog-header__nav">
                <ul>
                    { renderNav() }
                </ul>
            </nav>

            <div className="blog-header__user-action">
                {
                    user 
                    ? (
                        <button onClick={() => signOut(getAuth())}>
                            <i className="material-symbols-outlined">logout</i>
                            Log out
                        </button>
                    ) 
                    : <button onClick={() => navigate('/login')}>Log in</button>
                }
            </div>
        </header>
    );
};

export default NavBar;