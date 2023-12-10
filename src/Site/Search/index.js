import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import "./search.css"
import { useParams } from 'react-router';
import { useSearchParams, Link } from 'react-router-dom';
import {Button, Form} from "react-bootstrap";

function Search() {
    const [searchName, setSearchName] = useState("")
    const [searchBefore, setSearchBefore] = useState("2030-01-01")
    const [searchAfter, setSearchAfter] = useState("2000-01-01")

    return (
        <div>
            <h1>Search</h1>

            <Form>
                <Form.Group className="mb-3 search-form" controlId="formSearch">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="string" placeholder="Search"
                                  onChange={(e) => setSearchName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 search-form" controlId="formBefore">
                    <Form.Label> Before </Form.Label>
                    <Form.Control type="Date" placeholder="12/10/2024"
                                  onChange={(e) => setSearchBefore(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 search-form" controlId="formAfter">
                    <Form.Label> After </Form.Label>
                    <Form.Control type="Date" placeholder="12/10/2023"
                                  onChange={(e) => setSearchAfter(e.target.value)}/>
                </Form.Group>
            </Form>

            <Link to={`/SearchResult/?name=${searchName}&before=${searchBefore}&after=${searchAfter}`}>
            <Button className="btn-search"> Search </Button>
            </Link>

            {/*{searchName}*/}
            {/*{searchBefore}*/}
            {/*{searchAfter}*/}

        </div>

    );
}

export default Search;