import React from 'react';
import { Button } from 'react-bootstrap';

export default function DetailsEvents(props) {

    const eventsData = props.getEventsInfo(parseInt(props.match.params.id));
    console.log(eventsData)
    return (
        <div style={{ width: "1200px", height: "893px", marginLeft: "2rem" }}>
            <h1 style={{ fontWeight: "800", fontSize: "56px", lineHeight: "1", padding: "0", margin: "0", fontFamily: "sans-serif" }}>{eventsData.event_name}</h1>
            <div style={{ marginTop: "1rem", marginBottom: "1.5rem", width: "100%", display: 'flex' }}>
                <div style={{ width: "50%" }}>
                    <h2>
                        <div style={{ fontSize: "1.375rem", lineHeight: "1.2", fontWeight: "800" }}>Special Event</div>
                        <div style={{ fontSize: "1.375rem", lineHeight: "1.2", fontWeight: "400" }}>Lil Team</div>
                    </h2>
                </div>
                <div style={{ width: "25%" }}>
                    <div>
                        <i class="fas fa-calendar-plus" style={{ marginRight: "1rem" }}></i>
                        <i style={{ color: "#3578E5", fontWeight: "800", fontStyle: "normal" }}>{eventsData.starting_time}</i>
                    </div>
                    <div>
                        <i class="fas fa-tags" style={{ marginRight: "0.6rem" }}></i>
                        <i style={{ color: "#3578E5", fontWeight: "800", fontStyle: "normal", marginRight: "0.5rem" }}>{eventsData.price}</i>
                        <i class="fas fa-euro-sign" style={{ fontSize: "0.8rem" }}></i>
                    </div>
                </div>
                <div style={{ width: "25%" }}>
                    <div>
                        <i class="fas fa-calendar-minus" style={{ marginRight: "1rem" }}></i>
                        <i style={{ color: "#3578E5", fontWeight: "800", fontStyle: "normal" }}>{eventsData.ending_time}</i>
                    </div>
                    <div>
                        <i class="fas fa-percent" style={{ marginRight: "1rem" }}></i>
                        <i style={{ color: "#3578E5", fontWeight: "800", fontStyle: "normal" }}>{eventsData.discount_rate}</i>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1.5rem", width: "100%", display: 'flex' }}>
                <div style={{ fontSize: "3rem", width: "50%", lineHeight: "1" }}>
                    <i style={{ marginRight: ".25rem" }} class="fab fa-twitter-square"></i>
                    <i style={{ marginRight: ".25rem" }} class="fab fa-facebook-square"></i>
                    <i style={{ marginRight: ".25rem" }} class="fab fa-google-plus-square"></i>
                </div>
                <div style={{ fontSize: "3rem", width: "50%", lineHeight: "1" }}>
                    <i style={{ marginRight: "1rem" }} class="fas fa-users"></i>
                    <i style={{ fontSize: "2rem", marginRight: ".25rem", fontStyle: "normal" }} >200</i>
                    <i style={{ fontSize: "2rem", fontStyle: "normal" }}>People</i>
                </div>
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1.5rem", width: "100%", display: 'flex', position: "relative" }}>
                <div style={{ width: "50%", fontSize: "1.25rem", lineHeight: "1.2" }}>
                    No more champagne And the fireworks are through
                    Here we are, me and you
                    Feeling lost and feeling blue
                    It's the end of the party
                    And the morning seems so grey
                    So unlike yesterday
                    Now's the time for us to say...
                    <Button variant={props.join} onClick={props.getJoinEvent} style={{ marginLeft: "35%", marginTop: "10px", textAlign: "center", left: "0", color: "#fff", border: "1px solid transparent", fontSize: "1rem", position: "absolute", bottom: "0", margin: "0" }}>Join</Button>
                </div>
                <div style={{ width: "50%", textAlign: "center" }}>
                    <img src="https://i.pinimg.com/236x/4a/59/e5/4a59e5361b15372fc7c2d0770ff14173--food-truck-events-food-trucks.jpg" style={{ width: "477.469px", height: "477.469px" }} />
                </div>
            </div>
            <div style={{ marginTop: "3rem", marginBottom: "1.5rem", textAlign: "center" }}>
                <h2 style={{ color: "#757575", fontSize: ".75em", fontWeight: "1.3", marginBottom: ".5rem", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "sans-serif" }}>ADVERTISEMENT</h2>
                <img src="https://cdn.flashtalking.com/xre/423/4231456/2787246/image/2787246.gif?268196194" alt="Click here" style={{ width:"728px", height: "90px", border: "0px" }}/>
            </div>
        </div>
    )
}


