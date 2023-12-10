import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./index.css"
import { useParams } from 'react-router';
import '@fortawesome/fontawesome-free/css/all.min.css';




function Details() {
    const [event, setEvent] = useState({
        images: [{ type: "profile", url: "" }],
        events: []
    });
    const { tournamentId } = useParams();

    const getEventById = async () => {
        const response = await axios.get(`http://localhost:4000/getEvent/${tournamentId}`)
        const data = response.data[0]
        setEvent(data)
        console.log(data)
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

    const getEntrants = (events) => {
        console.log(events);
        var entrants = []
    }

    useEffect(() => {
        getEventById()
    }, []);

    return (
        <div>

            <div className= "row">
                <h1>Event Details</h1>
            </div>
            {/*<div>*/}
            {/*    <button className="btn btn-danger" onClick={getEventById}>GET EVENT</button>*/}
            {/*</div>*/}
            <div className = " row title">{event.name}</div>
            <div className = "row event-details">
                <div className= "col-3 nopad">
                    <img className="event-profile-image"
                         src={event.images.find((i) => i.type === "profile").url}></img>
                </div>
                <br/> <br/>
                <div className=" col-5 list-group">
                    <div className="list-group-item">
                        <i className="fa-solid fa-location-dot"></i> {event.venueAddress}
                    </div>
                    <div className="list-group-item">
                        <i className="fa-regular fa-calendar"></i> {getDateFromUnix(event.startAt)}
                    </div>
                    <div className="list-group-item">
                        <div >
                            <h2>Events:</h2>

                            {event.events.map((e, i) => {
                                return (
                                    <div key={i}>
                                        {e.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="list-group-item">
                        <h2>Entrants:</h2>
                        {getEntrants(event.events)}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Details;