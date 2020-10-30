import React, { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import styles from './EventsItem.module.css'


const EventsItem = props => {
    const [dob, setDob] = useState(props.user)
    if (props.user != null) {

        //let start = new Date(dob);
        let end = new Date(props.user.dob);
        const discount = props.events.filter((i) => {
            let starting = new Date(i.starting_time)
            let end = new Date(props.user.dob);
            if (starting.getFullYear() - end.getFullYear() <= i.discount_rules) {
                return i
            }
        })
        console.log(discount)
        return (
            <div style={{ display: 'flex', minHeight: '100px',width: '100%', marginBottom: '20px' }}>
                <div className="block-example" style={{ width: '15%', background: "#000!important", marginTop: "20px", padding: "0" }}>
                </div>
                <div style={{ width: '70%' }}>
                    <Container>
                    <div id={styles.center}>
                            <div id={styles.headline}>
                                <img className={styles.img} src="https://i.imgur.com/YyXHyXv.png"></img>
                                <h2>Recommend for you</h2>
                                <div className={styles.line}></div>
                                <img src="https://i.imgur.com/U2PS6E6.png"></img>
                            </div>
                        </div>
                        <Row>
                            {discount.map(events =>
                                <Col xs={6} md={4} style={{ marginTop: '20px' }} key={events.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src="https://i.pinimg.com/236x/4a/59/e5/4a59e5361b15372fc7c2d0770ff14173--food-truck-events-food-trucks.jpg" style={{ height: "180px" }} />
                                        <Card.Body>
                                            <Card.Title>{events.event_name}</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                        </Card.Text>
                                            <Link to={`/events/${events.id}`}><Button variant="primary">Go somewhere</Button></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Container>

                    <Container>
                    <div id={styles.center}>
                            <div id={styles.headline}>
                                <img className={styles.img} src="https://i.imgur.com/YyXHyXv.png"></img>
                                <h2>Events in Oulu</h2>
                                <div className={styles.line}></div>
                                <img src="https://i.imgur.com/U2PS6E6.png"></img>
                            </div>
                        </div>
                        <Row>
                            {props.events.map(events =>
                                <Col xs={6} md={4} style={{ marginTop: '20px' }} key={events.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src="https://i.pinimg.com/236x/4a/59/e5/4a59e5361b15372fc7c2d0770ff14173--food-truck-events-food-trucks.jpg" style={{ height: "180px" }} />
                                        <Card.Body>
                                            <Card.Title>{events.event_name}</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                        </Card.Text>
                                            <Link to={`/events/${events.id}`}><Button variant="primary">Go somewhere</Button></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </div>
                <div className="block-example border" style={{ width: '10%', background: "#000!important", marginTop: "20px", padding: "0" }}>
                    <p style={{ color: '#a0a0a0', fontSize: '12px', margin: '0', textAlign: 'center', padding: '0' }}>ADVERTISEMENT</p>
                    <img src="https://i.pinimg.com/236x/4a/59/e5/4a59e5361b15372fc7c2d0770ff14173--food-truck-events-food-trucks.jpg" style={{ width: "100%", height: "600px" }} />
                    <h5 style={{ textAlign: "center", marginTop: "30px", padding: "0", fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: "200" }}>SHARE</h5>
                    <div style={{ textAlign: "center", padding: "0", marginBottom: "10px", fontSize: "2rem" }}>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="far fa-thumbs-up"></i>
                    </div>
                </div>
            </div>
        )

    }
    else {
        return (
            <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
                <div className="block-example" style={{ width: '15%', background: "#000!important", marginTop: "20px", padding: "0" }}>
                </div>
                <div style={{ width: '70%' }}>
                    <Container>
                        <div id={styles.center}>
                            <div id={styles.headline}>
                                <img className={styles.img} src="https://i.imgur.com/YyXHyXv.png"></img>
                                <h2>Events in Oulu</h2>
                                <div className={styles.line}></div>
                                <img src="https://i.imgur.com/U2PS6E6.png"></img>
                            </div>
                        </div>
                        <Row>
                            {props.events.map(events =>
                                <Col xs={6} md={4} style={{ marginTop: '20px' }} key={events.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src="https://i.pinimg.com/236x/4a/59/e5/4a59e5361b15372fc7c2d0770ff14173--food-truck-events-food-trucks.jpg" style={{ height: "180px" }} />
                                        <Card.Body>
                                            <Card.Title>{events.event_name}</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                    </Card.Text>
                                            <Link to={`/events/${events.id}`}><Button variant="primary">Go somewhere</Button></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </div>
                <div className="block-example border" style={{ width: '15%', background: "#000!important", marginTop: "20px", padding: "0" }}>
                    <p style={{ color: '#a0a0a0', fontSize: '12px', margin: '0', textAlign: 'center', padding: '0' }}>ADVERTISEMENT</p>
                    <img src="https://i.pinimg.com/236x/4a/59/e5/4a59e5361b15372fc7c2d0770ff14173--food-truck-events-food-trucks.jpg" style={{ width: "100%", height: "600px" }} />
                    <h5 style={{ textAlign: "center", marginTop: "30px", padding: "0", fontFamily: "Segoe UI, Arial, sans-serif", fontWeight: "200" }}>SHARE</h5>
                    <div style={{ textAlign: "center", padding: "0", marginBottom: "10px", fontSize: "2rem" }}>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="far fa-thumbs-up"></i>
                    </div>
                </div>
            </div>
        )
    }
}
export default EventsItem;