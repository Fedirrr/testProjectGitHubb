import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom"
import {getCotributors, getCurrentRepo} from "../actions/repos";
import './card.less'
import {Button} from "antd";
import {useSelector} from "react-redux";

const Card = (props) => {
    const {username, reponame} = useParams()
    const [repo, setRepo] = useState({owner: {}})
    const [contributors, setContributors] = useState([])

    useEffect(() => {
        getCurrentRepo(username, reponame, setRepo)
        getCotributors(username, reponame, setContributors)
    }, [])
    
    return (
        <div>
            
            <Link to={"/"}><Button className="back-btn">Back</Button></Link>
            <div className="card">
                
                <img src={repo.owner.avatar_url} alt=""/>
                <div className="name">{repo.name}</div>
                <div className="stars">Stars: {repo.stargazers_count}</div>
            </div>
            
            {
                contributors.map((c, index) =>
                    <div key={index}>{index + 1}. {c.login}</div>)
            }
        </div>
    );
};

export default Card;
