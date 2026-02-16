import React from 'react';

const RecentBookingsTable = ({ bookings, loading, error }) => {
    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (bookings.length === 0) return <p>No bookings found.</p>;

    return (
        <div className="table-responsive">
            <table className="modern-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Package</th>
                        <th>Date</th>
                        <th>Destination</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="avatar-circle sm mr-2">
                                        {booking.user?.first_name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <span className="font-weight-bold">{booking.user?.first_name} {booking.user?.last_name}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{booking.package_title}</td>
                            <td>{new Date(booking.booking_date || booking.created_at).toLocaleDateString()}</td>
                            <td>{booking.package_destination}</td>
                            <td>
                                <span className={`badge badge-${booking.status === 'Confirmed' ? 'success' : booking.status === 'Pending' ? 'warning' : 'danger'}`}>
                                    {booking.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentBookingsTable;
