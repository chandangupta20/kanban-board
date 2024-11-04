// /components/TicketCard.js
import React from 'react';
import './ticketCard.css'

const TicketCard = ({ ticket, user }) => {
    return (
        <div className="ticket-card">
            <p className="ticket-id">{ticket.id}</p>
            <h3 className="ticket-title">{ticket.title}</h3>
            <div className="ticket-metadata">
                <span className="ticket-status">{ticket.status}</span>
                <span className={`priority-badge priority-${ticket.priority}`}>
                    {["No Priority", "Low", "Medium", "High", "Urgent"][ticket.priority]}
                </span>
            </div>
            <div className="ticket-user">
                <p><strong>Assigned to:</strong> {user ? user.name : "Unassigned"}</p>
            </div>
            <div className="ticket-tags">
                {ticket.tag.map((tag, index) => (
                    <span key={index} className="tag-badge">{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default TicketCard;
