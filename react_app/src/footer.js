import React, { useState } from 'react';
import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './Capture.PNG';
function Footer() {

  return (
    <div className={styles.footer}>
      <Container>
        <Row>
          <Col xs={3}><img style={{width:"35%"}} src={logo}></img></Col>
          <Col xs={3}>
            <ul>
              <li>Contacts</li>
              <li>Forms</li>
              <li>About us</li>
            </ul>
          </Col>
          <Col xs={3}><h3>Tai Nguyen</h3>
          <p>+358 41 716 6879</p></Col>
          <Col xs={3}><h3>Lam Pham</h3>
          <p>+358 41 716 6879</p></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;