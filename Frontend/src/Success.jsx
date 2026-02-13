import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from './Header';

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    return (
        <div id="page" className="full-page">
            <Header />
            <main id="content" className="site-main">
                <section className="inner-banner-wrap">
                    <div className="inner-baner-container" style={{ backgroundImage: "url(/assets/images/inner-banner.jpg)" }}>
                        <div className="container">
                            <div className="inner-banner-content">
                                <h1 className="inner-title">Payment Successful</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <i className="fas fa-check-circle" style={{ fontSize: "60px", color: "green" }}></i>
                    </div>
                    <h2>Thank you for your booking!</h2>
                    <p>Your payment has been processed successfully.</p>
                    {sessionId && <p style={{ fontSize: "12px", color: "#888" }}>Session ID: {sessionId}</p>}
                    <div style={{ marginTop: "30px" }}>
                        <Link to="/bookings" className="button-primary">View My Bookings</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Success;
