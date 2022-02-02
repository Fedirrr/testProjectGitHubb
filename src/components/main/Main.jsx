import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from "../actions/repos";
import Repo from "./repo/Repo";
import {setCurrentPage} from "../../reducers/reposReducer";
import {createPages} from "../../utils/pagesCreator";
import {Input, Button, Form} from "antd";
import './main.less'


const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)
    const [searchValue, setSearchValue] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState([]);
    
    const pagesCount = Math.ceil(totalCount / perPage)
    const pages = []
    createPages(pages, pagesCount, currentPage)
    
    function searchHandler() {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue, currentPage, perPage))
    }
    
    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
        try {
            let getFavoriteRepoFromLocalStorage = localStorage.getItem("favorites");
            getFavoriteRepoFromLocalStorage = getFavoriteRepoFromLocalStorage
                ? JSON.parse(getFavoriteRepoFromLocalStorage)
                : [];
            setFavorites(getFavoriteRepoFromLocalStorage )
        } catch (error) {
            console.log(error)
        }
    }, [])

useEffect(() => {
    try {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    } catch (error) {
        console.log(error)
    }
}, [favorites.length])
return (
    <div>
        <div className="search">
            <Form
                initialValues={{remember: true}}
                autoComplete="off">
                <Form.Item
                    label="Search repo"
                    name="searchRepo"
                    rules={[{required: true, message: 'Please input repo!'}]}
                >
                    <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text"
                           placeholder="Input repo name" className="search-input"/>
                </Form.Item>
                
                <Button
                    disabled={!searchValue}
                    onClick={() => searchHandler()} className="search-btn"
                >
                    Search
                </Button>
            </Form>
        </div>
        {
            isFetching === false
                ?
                repos.map((repo) => {
                    return <Repo key={repo.id}
                                 repo={repo}
                                 favorites={favorites}
                                 setFavorites={setFavorites}
                    />
                })
                :
                <div className="fetching">Fedir</div>
        }
        
        <div className="pages">
            {
                pages.map((page, index) => <span
                    key={index}
                    className={currentPage == page ? "current-page" : "page"}
                    onClick={() => dispatch(setCurrentPage(page))}>{page}</span>
                )}
        </div>
    </div>
);
}
;

export default Main;