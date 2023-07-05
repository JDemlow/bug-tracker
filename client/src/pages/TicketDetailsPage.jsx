import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`/api/tickets/${id}`);
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, [id]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Ticket Details Page</h2>
      {ticket ? (
        <div>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          {/* Display other ticket details */}
        </div>
      ) : (
        <p>Loading ticket details...</p>
      )}
    </div>
  );
}

export default TicketDetailsPage;
