import React, { useState, useEffect } from "react";
import DashboardHeader from "./dashboardHeader";
import DashboardSidebar from "./dashboardSidebar";
import { supabase } from "../supabaseClient";

const DbComment = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const from = (currentPage - 1) * ITEMS_PER_PAGE;
                const to = from + ITEMS_PER_PAGE - 1;

                const { data, error, count } = await supabase
                    .from('reviews')
                    .select(`
            *,
            user:users(first_name, last_name, email),
            package:packages(title)
          `, { count: 'exact' })
                    .order('created_at', { ascending: false })
                    .range(from, to);

                if (error) throw error;

                setReviews(data || []);
                setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE) || 1);
            } catch (err) {
                console.error("Error fetching reviews:", err);
                setError("Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            const { error } = await supabase
                .from('reviews')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setReviews(reviews.filter(r => r.id !== id));
        } catch (err) {
            console.error("Error deleting review:", err);
            alert("Failed to delete review");
        }
    };

    return (
        <div id="container-wrapper">
            <div id="dashboard" className="dashboard-container">
                <DashboardHeader />
                <DashboardSidebar />

                <div className="db-info-wrap db-comment">
                    <div className="dashboard-box table-opp-color-box">
                        <h4>Comments & Reviews</h4>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Author</th>
                                            <th>Reference (Package)</th>
                                            <th>Rating</th>
                                            <th>Comment</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews.length === 0 ? (
                                            <tr><td colSpan="6">No reviews found</td></tr>
                                        ) : (
                                            reviews.map((review) => (
                                                <tr key={review.id}>
                                                    <td>
                                                        <span className="list-ename">
                                                            {review.user?.first_name} {review.user?.last_name}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {review.package?.title || 'General'}
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-warning">
                                                            {review.rating} / 5
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <p style={{ maxWidth: '300px', whiteSpace: 'normal' }}>
                                                            {review.comment}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        <span
                                                            className="badge badge-danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDelete(review.id)}
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

export default DbComment;
