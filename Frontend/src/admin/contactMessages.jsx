import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import DashboardSidebar from './dashboardSidebar';
import DashboardHeader from './dashboardHeader';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all');

    useEffect(() => {
        fetchMessages();
    }, [typeFilter]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (typeFilter !== 'all') {
                query = query.eq('type', typeFilter);
            }

            const { data, error } = await query;

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            alert('Error loading messages: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setMessages(messages.filter(msg => msg.id !== id));
            setShowModal(false);
            setSelectedMessage(null);
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Error deleting message: ' + error.message);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div id="container-wrapper">
            <div id="dashboard" className="dashboard-container">
                <DashboardHeader />
                <DashboardSidebar />

                <div className="db-info-wrap db-package-wrap">
                    <div className="dashboard-box table-opp-color-box">
                        <h4>Messages & Subscriptions</h4>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                            Manage contact inquiries and newsletter subscriptions
                        </p>

                        {/* Filters */}
                        <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="form-control"
                                style={{ width: 'auto' }}
                            >
                                <option value="all">All Types</option>
                                <option value="contact">Contact Messages</option>
                                <option value="newsletter">Newsletter Subscriptions</option>
                            </select>
                        </div>

                        {/* Statistics Cards */}
                        <div className="row" style={{ marginBottom: '30px' }}>
                            <div className="col-md-4 mb-3">
                                <div style={{
                                    background: '#fff',
                                    padding: '20px',
                                    borderRadius: '15px',
                                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                                    border: '2px solid #e8f4f8'
                                }}>
                                    <div style={{ color: '#0791BE', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                                        TOTAL
                                    </div>
                                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#101F46' }}>
                                        {messages.length}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div style={{
                                    background: '#fff',
                                    padding: '20px',
                                    borderRadius: '15px',
                                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                                    border: '2px solid #e8f8ee'
                                }}>
                                    <div style={{ color: '#28a745', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                                        CONTACT
                                    </div>
                                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#101F46' }}>
                                        {messages.filter(m => m.type === 'contact').length}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div style={{
                                    background: '#fff',
                                    padding: '20px',
                                    borderRadius: '15px',
                                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                                    border: '2px solid #fff3e0'
                                }}>
                                    <div style={{ color: '#F56960', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                                        NEWSLETTER
                                    </div>
                                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#101F46' }}>
                                        {messages.filter(m => m.type === 'newsletter').length}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages Table */}
                        {loading ? (
                            <div style={{ padding: '60px', textAlign: 'center' }}>
                                <i className="fas fa-spinner fa-spin" style={{ fontSize: '48px', color: '#0791BE' }}></i>
                                <p style={{ marginTop: '20px', color: '#666' }}>Loading...</p>
                            </div>
                        ) : messages.length === 0 ? (
                            <div style={{ padding: '60px', textAlign: 'center' }}>
                                <i className="fas fa-envelope-open" style={{ fontSize: '64px', color: '#ddd', marginBottom: '20px' }}></i>
                                <h3 style={{ color: '#666' }}>No entries found</h3>
                                <p style={{ color: '#999' }}>Contact messages and newsletter subscriptions will appear here.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                                            <th>Type</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Date</th>
                                            <th style={{ textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.map((message) => (
                                            <tr key={message.id}>
                                                <td>
                                                    <span style={{
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        fontSize: '11px',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        background: message.type === 'newsletter' ? '#e8f8f5' : '#e8f4f8',
                                                        color: message.type === 'newsletter' ? '#28a745' : '#0791BE'
                                                    }}>
                                                        {message.type === 'newsletter' ? 'Newsletter' : 'Contact'}
                                                    </span>
                                                </td>
                                                <td style={{ fontWeight: '600', color: '#101F46' }}>
                                                    {message.name || '-'}
                                                </td>
                                                <td>{message.email}</td>
                                                <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {message.subject || '-'}
                                                </td>
                                                <td style={{ fontSize: '13px', color: '#999' }}>
                                                    {formatDate(message.created_at)}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedMessage(message);
                                                            setShowModal(true);
                                                        }}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        <i className="fas fa-eye" style={{ marginRight: '6px' }}></i>
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal */}
                {showModal && selectedMessage && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '20px'
                    }}
                        onClick={() => setShowModal(false)}>
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            maxWidth: '700px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}
                            onClick={(e) => e.stopPropagation()}>
                            {/* Modal Header */}
                            <div style={{
                                padding: '30px',
                                borderBottom: '2px solid #f0f0f0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'start'
                            }}>
                                <div>
                                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#101F46', marginBottom: '10px' }}>
                                        {selectedMessage.type === 'newsletter' ? 'Newsletter Subscription' : 'Contact Message'}
                                    </h2>
                                    <p style={{ color: '#999', fontSize: '14px' }}>
                                        Received on {formatDate(selectedMessage.created_at)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-link"
                                    style={{ fontSize: '24px', color: '#999' }}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div style={{ padding: '30px' }}>
                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                                        Type
                                    </label>
                                    <span style={{
                                        padding: '6px 14px',
                                        borderRadius: '15px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        background: selectedMessage.type === 'newsletter' ? '#e8f8f5' : '#e8f4f8',
                                        color: selectedMessage.type === 'newsletter' ? '#28a745' : '#0791BE',
                                        display: 'inline-block'
                                    }}>
                                        {selectedMessage.type === 'newsletter' ? 'Newsletter' : 'Contact'}
                                    </span>
                                </div>

                                {selectedMessage.name && (
                                    <div style={{ marginBottom: '25px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                                            Name
                                        </label>
                                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#101F46' }}>
                                            {selectedMessage.name}
                                        </p>
                                    </div>
                                )}

                                <div style={{ marginBottom: '25px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                                        Email
                                    </label>
                                    <p style={{ fontSize: '16px', color: '#0791BE' }}>
                                        <a href={`mailto:${selectedMessage.email}`} style={{ color: '#0791BE', textDecoration: 'none' }}>
                                            {selectedMessage.email}
                                        </a>
                                    </p>
                                </div>

                                {selectedMessage.phone && (
                                    <div style={{ marginBottom: '25px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                                            Phone
                                        </label>
                                        <p style={{ fontSize: '16px', color: '#101F46' }}>
                                            <a href={`tel:${selectedMessage.phone}`} style={{ color: '#101F46', textDecoration: 'none' }}>
                                                {selectedMessage.phone}
                                            </a>
                                        </p>
                                    </div>
                                )}

                                {selectedMessage.subject && (
                                    <div style={{ marginBottom: '25px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                                            Subject
                                        </label>
                                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#101F46' }}>
                                            {selectedMessage.subject}
                                        </p>
                                    </div>
                                )}

                                {selectedMessage.message && (
                                    <div style={{ marginBottom: '25px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                                            Message
                                        </label>
                                        <div style={{
                                            background: '#f8f9fa',
                                            padding: '20px',
                                            borderRadius: '12px',
                                            fontSize: '15px',
                                            lineHeight: '1.7',
                                            color: '#101F46',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                            {selectedMessage.message}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div style={{
                                padding: '20px 30px',
                                borderTop: '2px solid #f0f0f0',
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'flex-end'
                            }}>
                                <button
                                    onClick={() => deleteMessage(selectedMessage.id)}
                                    className="btn btn-danger"
                                >
                                    <i className="fas fa-trash" style={{ marginRight: '8px' }}></i>
                                    Delete
                                </button>
                                <a
                                    href={`mailto:${selectedMessage.email}`}
                                    className="btn btn-primary"
                                >
                                    <i className="fas fa-reply" style={{ marginRight: '8px' }}></i>
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactMessages;
