import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./index.css"
import { useParams } from 'react-router';
import { useSearchParams, Link } from 'react-router-dom';

function SearchResult() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [events, setEvents] = useState([])
    console.log(searchParams)

    const search = async () => {
        const name = searchParams.get("name")
        var before = searchParams.get("before")
        var after = searchParams.get("after")

        before = Math.floor(new Date(before).getTime() / 1000)
        after = Math.floor(new Date(after).getTime() / 1000)
        
        const url = `http://localhost:4000/searchEvent/${name}/${before}/${after}`
        console.log(url)
        const response = await axios.get(url)
        const data = response.data
        setEvents(data)
    }

    const convertDay = (num) => {
        switch (num) {
            case 0: return "Sunday"
            case 1: return "Monday"
            case 2: return "Tuesday"
            case 3: return "Wednesday"
            case 4: return "Thursday"
            case 5: return "Friday"
            case 6: return "Saturday"
            default: break
        }
    }

    const getDateFromUnix = (timestamp) => {
        const d = new Date(timestamp * 1000)
        const date = d.getDate()
        const month = d.getMonth()
        const day = convertDay(d.getDay())
        var formatted = day + ", " + month + "/" + date
        return formatted
    }

    useEffect(() => {
        search()
    }, []);

    return (
        <div>
            <h1>Search Results</h1>
            <button className="btn btn-secondary" onClick={search}>Test</button>

            <div className="list-group eventListContainer">
                    {events.map((e, i) => {
                        return (
                            <div className="list-group-item eventListItem d-flex flex-row" key={e.id}>
                                <img className="eventListItemPic"
                                    src={e.images.find((i) => i.type === "profile").url}></img>
                                <div className="tournament-info-container">
                                    <Link to={`/Details/${e.id}`}> <b className="tournament-title"> {e.name}</b> </Link> 
                                    <div>{getDateFromUnix(e.startAt)}</div>
                                    <div>{e.city}, MA</div>
                                    <div>ID: {e.id}</div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            
        </div>

    );
}

export default SearchResult;