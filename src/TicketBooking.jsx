// TicketBooking.jsx
import React, { useState } from 'react';
import './ext.css';

const TicketBooking = ({ movie, onClose }) => {
  const [numTickets, setNumTickets] = useState(1);

  const handleNumTicketsChange = (e) => {
    setNumTickets(parseInt(e.target.value, 10));
  };

  const handleBookTickets = () => {
    // In a real application, you would typically send a booking request to a backend here.
    // For simplicity, we'll show an alert for successful booking.
    const successMessage = `Successfully booked ${numTickets} ticket(s) for ${movie.Title}`;
    alert(successMessage);

    // Reset the state and reopen the booking modal
    setNumTickets(1);
    onClose();
  };

  return (
    <div className="ticket-booking">
      <h2>Book Tickets</h2>
      <img src={movie.Poster} alt={movie.Title}/>
      <p>{movie.Title}</p>
      <div>
        <label htmlFor="numTickets">Number of Tickets:</label>
        <input
          type="number"
          id="numTickets"
          value={numTickets}
          onChange={handleNumTicketsChange}
        />
      </div>
      <button onClick={handleBookTickets} className='a'>Book</button>
      <button onClick={onClose} className='a'>Close</button>
    </div>
  );
};

export default TicketBooking;
