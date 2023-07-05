import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateTicketPage from "./pages/CreateTicketPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import TicketDetails from "./components/TicketDetails";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets");
        const data = await response.json();
        setTickets(data);
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
      {/* Navigation */}
      <Navbar />

      <Header />

      {/* Route Switch */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/create-ticket" element={<CreateTicketPage />} />

        <Route path="/ticket-details/:id" element={<TicketDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
