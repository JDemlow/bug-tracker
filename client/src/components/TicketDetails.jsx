import React, { useEffect, useState } from "react";

const TicketDetails = ({ ticketId }) => {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    // Fetch ticket details from the server using an HTTP request
    fetch(`/api/tickets/${ticketId}`)
      .then((response) => response.json())
      .then((data) => setTicket(data))
      .catch((error) => console.error(error));
  }, [ticketId]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      {/* Display additional ticket details here */}
    </div>
  );
};

export default TicketDetails;
