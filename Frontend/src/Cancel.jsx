
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Cancel = () => {
    return (
        <div id="page" className="full-page">
            <Header />
            <main id="content" className="site-main">
                <section className="inner-banner-wrap">
                    <div className="inner-baner-container" style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}>
                        <div className="container">
                            <div className="inner-banner-content">
                                <h1 className="inner-title">Payment Cancelled</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <i className="fas fa-times-circle" style={{ fontSize: "60px", color: "red" }}></i>
                    </div>
                    <h2>Payment was cancelled</h2>
                    <p>Your booking has not been confirmed.</p>
                    <div style={{ marginTop: "30px" }}>
                        <Link to="/" className="button-primary">Return to Home</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cancel;
