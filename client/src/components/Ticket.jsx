import React, { useState } from "react";

const Ticket = ({ ticket }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(ticket.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    ticket.description
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedTicketData = {
      title: updatedTitle,
      description: updatedDescription,
      // Add other updated fields as needed
    };

    // Send an HTTP request to update the ticket
    const response = await fetch(`/api/tickets/${ticket.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTicketData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Ticket updated successfully
      // Perform any necessary actions (e.g., updating the ticket details)
      setIsEditing(false); // Exit editing mode
    } else {
      // Handle error if ticket update fails
    }
  };

  const handleCancel = () => {
    // Cancel the editing and revert back to the original ticket details
    setIsEditing(false);
    setUpdatedTitle(ticket.title);
    setUpdatedDescription(ticket.description);
  };

  const handleDeleteTicket = async () => {
    // Send an HTTP request to delete the ticket
    const response = await fetch(`/api/tickets/${ticket.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Ticket deleted successfully
      // Perform any necessary actions (e.g., updating the ticket list)
    } else {
      // Handle error if ticket deletion fails
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            required
          />
          <label>Description:</label>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            required
          />
          {/* Additional form fields */}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <p>Created by: {ticket.createdBy}</p>
          <p>Creation Date: {ticket.creationDate}</p>
          {/* Additional ticket details */}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDeleteTicket}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Ticket;
