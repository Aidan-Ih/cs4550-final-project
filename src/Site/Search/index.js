import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./index.css"
import { useParams } from 'react-router';
import { useSearchParams, Link } from 'react-router-dom';

function Search() {
    const [searchName, setSearchName] = useState("")
    const [searchBefore, setSearchBefore] = useState("2030-01-01")
    const [searchAfter, setSearchAfter] = useState("2000-01-01")

    return (
        <div>
            <h1>Search</h1>
            <div className="m-1">
                <div className="m-2 form-group">
                    <label for="name-search">name</label>
                    <input id="name-search" type="text" onChange={(e) => setSearchName(e.target.value)}></input>
                </div>
                <div className="m-2 form-group">
                    <label for="before-search">Before</label>
                    <input id="before-search" type="date" onChange={(e) => setSearchBefore(e.target.value)}></input>
                </div>
                <div className="m-2 form-group">
                    <label for="after-search">After</label>
                    <input id="after-search" type="date" onChange={(e) => setSearchAfter(e.target.value)}></input>
                </div>
            </div>

            <Link to={`/SearchResult/?name=${searchName}&before=${searchBefore}&after=${searchAfter}`}
                className="btn btn-secondary">Search</Link>

            {searchName}
            {searchBefore}
            {searchAfter}

        </div>

    );
}

export default Search;