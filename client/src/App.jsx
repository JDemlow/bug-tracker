import React from "react";

import { useState, useEffect } from "react";

function TicketDetails({ ticket, onTicketSelect }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Ticket Details</h2>
      {ticket ? (
        <div>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          {/* Display other ticket details */}
        </div>
      ) : (
        <p>No ticket selected</p>
      )}
      <button onClick={() => onTicketSelect(null)}>Clear Selection</button>
    </div>
  );
}

function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets");
        const data = await response.text();
        console.log("API response:", data); // Log the response as text
        const parsedData = JSON.parse(data);
        console.log("Parsed data:", parsedData); // Log the parsed data
        setTickets(parsedData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Bug Tracker</h1>

      {/* Ticket creation form */}
      <form className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Create a New Ticket</h2>
        <div className="flex flex-col mb-2">
          <label htmlFor="title" className="mb-1">
            Title
          </label>
          <input type="text" id="title" className="border rounded py-1 px-2" />
        </div>
        {/* Add more form fields for description, status, priority, etc. */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-4 rounded"
        >
          Create Ticket
        </button>
      </form>

      {/* Display list of tickets */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Tickets</h2>
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id}>{ticket.title}</li>
          ))}
        </ul>
      </div>

      {/* Ticket details */}
      <div>
        <TicketDetails ticket={selectedTicket} />
      </div>
    </div>
  );
}

export default App;
