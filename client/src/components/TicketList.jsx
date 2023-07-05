import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [sortBy, setSortBy] = useState("status"); // Default sort by status
  const [pageNumber, setPageNumber] = useState(1);
  const [ticketsPerPage] = useState(10);

  useEffect(() => {
    // Fetch the list of tickets from the server using an HTTP request
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets");
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.log("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Sort tickets based on selected sorting option
  useEffect(() => {
    const sortTickets = () => {
      // Sort tickets based on selected sorting option (e.g., status, date)
      // Update the 'tickets' state with the sorted tickets
      // You can use Array.prototype.sort() method for sorting the tickets array
    };

    sortTickets();
  }, [sortBy]);

  // Paginate tickets
  const indexOfLastTicket = pageNumber * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  return (
    <div>
      <div>
        Sort by:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="date">Date</option>
        </select>
      </div>

      {currentTickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}

      <div>
        Pagination:
        {Array.from({ length: Math.ceil(tickets.length / ticketsPerPage) }).map(
          (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TicketList;
