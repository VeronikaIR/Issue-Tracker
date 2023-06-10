// const sendRequest = require('../utils/fetch-utils');
// const showtickets = require('../utils/show-tickets');
// const handleError = require('../utils/handle-error');

const getTicketsData = () => {
    const url = 'http://localhost:3000/tickets';

    const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    sendRequest(url, options, showTickets, handleError);
};

const sendTicketData = ticketData => {
    const url = 'http://localhost:3000/tickets';

    const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
    };

    sendRequest(url, options, handleSuccessMessage, handleError);
};

const deleteTicketByTaskKey = ticket_key => {
    const url = `http://localhost:3000/tickets/${ticket_key}`;

    const options = {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    sendRequest(url, options, handleSuccessMessage, handleError);
};

// module.exports = { getticketsData };