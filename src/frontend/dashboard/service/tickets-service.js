const getTicketsData = (project_key) => {
    const url = `http://localhost:3000/tickets/tickets-by-project/${project_key}`;

    const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    sendRequest(url, options, showTickets, handleError);
};


const getTicketDataByTicketNumber = async (task_key) => {
    const url = `http://localhost:3000/tickets/${task_key}`;

    const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await sendAndReturnRequest(url, options, showTicket, handleError);
};

const sendUpdatedTicketDataByTaskKey = (ticketData, ticket_key) => {
    const url = `http://localhost:3000/tickets/${ticket_key}`;

    const options = {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
    };

    sendRequest(url, options, handleSuccessMessage, handleError);
};

const sendTicketData = async (ticketData) => {
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

    return await sendAndReturnRequest(url, options, handleSuccessCreation, handleError);
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
