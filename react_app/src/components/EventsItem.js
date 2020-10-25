import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

const EventsItem = props => {
    return (
        <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
            <div style={{ width: '90%' }}>
                <Container>
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
                                        <Link to={ `/events/${events.id}`}><Button variant="primary">Go somewhere</Button></Link>
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
export default EventsItem;