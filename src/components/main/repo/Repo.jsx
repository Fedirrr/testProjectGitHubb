import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import './repo.less'

const Repo = (props) => {
    console.log(props)
    const { favorites, setFavorites, repo } = props;
    const isFavorites = favorites.includes(repo.id);
    
    const handleChangeFavorites = () => {
        if (isFavorites) {
            setFavorites(favorites.filter((el) => el.id !== repo.id));
        } else {
            setFavorites([...favorites,repo.id]);
        }
    }
    
    const starClassname = isFavorites ? "fas fa-star done" : 'fas fa-star';
    
    
    return (
        <div className="repo">
            <div className="repo-header">
                <div className="repo-header-name">
                    <NavLink
                        className={"navLink"}
                        to={`/card/${repo.owner.login}/${repo.name}`}>{repo.name}
                    </NavLink></div>
                <div>
                    <div className="repo-header-stars">Количество звезд: {repo.stargazers_count}</div>
                    <i
                        onClick={handleChangeFavorites}
                        className={starClassname}>
                    </i>
                </div>
            </div>
            <div className="repo-last-commit">Последний коммит: {repo.updated_at}</div>
            <a href={repo.html_url} className="repo-link">Ссылка на репозиторий: {repo.html_url}</a>
        </div>
    );
};

export default Repo;
