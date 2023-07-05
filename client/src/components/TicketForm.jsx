import React, { useState } from "react";

const TicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Additional form fields

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the user input before submitting the form
    // Display error messages for invalid input

    // Send an HTTP request to create a new ticket
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        // Additional form fields
      }),
    });

    if (response.ok) {
      // Ticket created successfully
      // Reset the form fields
      setTitle("");
      setDescription("");
      // Reset additional form fields
    } else {
      // Handle error if ticket creation fails
    }
  };

  return (
    <div>
      <h3>Create a New Ticket</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {/* Additional form fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
