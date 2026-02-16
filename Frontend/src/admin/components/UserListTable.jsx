import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserListTable = ({ users, onDelete }) => {
    const navigate = useNavigate();

    if (users.length === 0) {
        return <div className="text-center p-4">No users found.</div>;
    }

    return (
        <div className="table-responsive">
            <table className="modern-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id || user._id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="avatar-circle sm mr-2">
                                        {user.first_name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="font-weight-bold">
                                        {user.first_name} {user.last_name}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <a href={`mailto:${user.email}`} className="text-primary">
                                    {user.email}
                                </a>
                            </td>
                            <td>{user.mobile || "-"}</td>
                            <td>
                                {user.city && user.country
                                    ? `${user.city}, ${user.country}`
                                    : (user.country || user.city || "-")}
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary mr-2"
                                    onClick={() => navigate(`/admin/user-edit/${user.id}`)}
                                    title="Edit User"
                                >
                                    <i className="far fa-edit"></i>
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onDelete(user)}
                                    title="Delete User"
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

export default UserListTable;
