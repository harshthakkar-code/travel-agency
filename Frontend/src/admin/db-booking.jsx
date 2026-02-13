import React, { useState, useEffect } from "react";
import DashboardHeader from "./dashboardHeader";
import DashboardSidebar from "./dashboardSidebar";
import { supabase } from "../supabaseClient";

const DbBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const from = (currentPage - 1) * ITEMS_PER_PAGE;
                const to = from + ITEMS_PER_PAGE - 1;

                const { data, error, count } = await supabase
                    .from('bookings')
                    .select(`
            *,
            user:users(first_name, last_name, email),
            packages:package_id(title, destination) 
          `, { count: 'exact' })
                    .order('created_at', { ascending: false })
                    .range(from, to);

                if (error) throw error;

                console.log("Bookings data:", data);

                setBookings(data || []);
                setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE) || 1);
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("Failed to load bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setBookings(bookings.filter(b => b.id !== id));
        } catch (err) {
            console.error("Error deleting booking:", err);
            alert("Failed to delete booking");
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setBookings(bookings.map(b =>
                b.id === id ? { ...b, status: newStatus } : b
            ));
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status");
        }
    };

    return (
        <div id="container-wrapper">
            <div id="dashboard" className="dashboard-container">
                <DashboardHeader />
                <DashboardSidebar />

                <div className="db-info-wrap db-booking">
                    <div className="dashboard-box table-opp-color-box">
                        <h4>Recent Bookings</h4>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Date</th>
                                            <th>Destination</th>
                                            <th>Package</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.length === 0 ? (
                                            <tr><td colSpan="6">No bookings found</td></tr>
                                        ) : (
                                            bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td>
                                                        <span className="list-ename">
                                                            {booking.user?.first_name} {booking.user?.last_name}
                                                        </span>
                                                        <br />
                                                        <small>{booking.user?.email}</small>
                                                    </td>
                                                    <td>
                                                        {new Date(booking.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        {/* Handling both snapshot and relation data */}
                                                        {booking.package_destination || booking.packages?.destination || '-'}
                                                    </td>
                                                    <td>
                                                        {booking.package_title || booking.packages?.title || '-'}
                                                    </td>
                                                    <td>
                                                        <select
                                                            value={booking.status}
                                                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                            className={`badge badge-${booking.status === 'Confirmed' ? 'success' :
                                                                    booking.status === 'Cancelled' ? 'danger' : 'primary'
                                                                }`}
                                                            style={{ border: 'none', cursor: 'pointer' }}
                                                        >
                                                            <option value="Pending" style={{ color: 'black' }}>Pending</option>
                                                            <option value="Confirmed" style={{ color: 'black' }}>Confirmed</option>
                                                            <option value="Cancelled" style={{ color: 'black' }}>Cancelled</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className="badge badge-danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDelete(booking.id)}
                                                        >
                                                            <i className="far fa-trash-alt"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="pagination-wrap">
                            <nav className="pagination-inner">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                    </li>
                                    <li className="page-item active">
                                        <span className="page-link">{currentPage} / {totalPages}</span>
                                    </li>
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="copyrights">
                    Copyright © 2025 Travele. All rights reserveds.
                </div>
            </div>
        </div>
    );
};

export default DbBooking;
