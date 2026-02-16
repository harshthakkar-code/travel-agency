import React from 'react';

const BookingListTable = ({ bookings, onDelete, onStatusChange }) => {
    if (bookings.length === 0) {
        return <div className="text-center p-4">No bookings found.</div>;
    }

    return (
        <div className="table-responsive">
            <table className="modern-table">
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
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="avatar-circle sm mr-2">
                                        {booking.user?.first_name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <span className="font-weight-bold d-block">
                                            {booking.user?.first_name} {booking.user?.last_name}
                                        </span>
                                        <small className="text-muted">{booking.user?.email}</small>
                                    </div>
                                </div>
                            </td>
                            <td>{new Date(booking.created_at).toLocaleDateString()}</td>
                            <td>{booking.package_destination || booking.packages?.destination || '-'}</td>
                            <td>{booking.package_title || booking.packages?.title || '-'}</td>
                            <td>
                                <select
                                    value={booking.status}
                                    onChange={(e) => onStatusChange(booking.id, e.target.value)}
                                    className={`badge badge-${booking.status === 'Confirmed' ? 'success' :
                                        booking.status === 'Cancelled' ? 'danger' : 'primary'}`}
                                    style={{
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        padding: '5px 10px',
                                        height: 'auto'
                                    }}
                                >
                                    <option value="Pending" style={{ color: 'black' }}>Pending</option>
                                    <option value="Confirmed" style={{ color: 'black' }}>Confirmed</option>
                                    <option value="Cancelled" style={{ color: 'black' }}>Cancelled</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onDelete(booking.id)}
                                    title="Delete Booking"
                                >
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingListTable;
