import { Router, Request, Response } from 'express';
import { read, write } from '../utils/file-utils';
import { ITicket, ITicketData } from '../interfaces/tickets';
import { TicketController } from '../controllers/tickets-controller';

const ticketsRouter: Router = Router();

//TODO: remove this after addind the db
const ticketsJSON: string = 'resources/tickets.json';

let ticketsController: TicketController;

const getTicketController = async (req: Request, res: Response, next: () => void) => {
    try {
        ticketsController = new TicketController();
        console.log('Controller initialization...')
        await ticketsController.init();
        console.log('Initialized constroller')
        next();
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

ticketsRouter.use(getTicketController);

ticketsRouter.get('/', async (request: Request, response: Response) => {
    try {
        const tickets = await ticketsController.getTicketsData();
        response.status(200).json(tickets);
    } catch (error) {
        console.error(error);
        response.status(500).json('Internal server error');
    }
});

ticketsRouter.get('/:task_key', async (request: Request, response: Response) => {
    const { task_key } =  request.params;

    try {
        const ticket = await ticketsController.getTicketByTaskKey(Number(task_key));
    
        if (ticket) {
            response.status(200).json(ticket);
        } else {
            response.status(404).json({ message: "ticket not found" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json('Internal server error');
    }
});

ticketsRouter.post('/', async (request: Request, response: Response) => {
    const ticket: ITicket = request.body;

    try {
        await ticketsController.addticket(ticket);
        response.status(201).json({ message: "ticket added successfully" });
    } catch(error) {
        console.error(error);
        response.status(500).json({ error: "Internal server error"});
    }
});

ticketsRouter.put('/:task_key', async (request: Request, response: Response) => {
    const { task_key } = request.params;
    const ticketData = request.body;

    try {
        const tickets = await read(ticketsJSON);
        const parsedtickets = JSON.parse(tickets);

        const updatedtickets = parsedtickets.tickets.map(ticket => {
            if (ticket.task_key === Number(task_key)) {
                return ticketData;
            }

            return ticket;
        });

        parsedtickets.tickets = updatedtickets;

        await write(ticketsJSON, JSON.stringify(parsedtickets));

        response.status(200).json({ message: 'Ticket updated successfully' });
    } catch(error) {
        console.error(error);

        response.status(500).json({ error: 'Internal server error' });
    }
});

ticketsRouter.patch('/:task_key', async (request: Request, response: Response) => {
    const { task_key } = request.params;
    const { title_param } = request.body;

    try {
        const tickets = await read(ticketsJSON);
        const parsedtickets = JSON.parse(tickets);

        const updatedtickets = parsedtickets.tickets.map(ticket => {
            if (ticket.task_key === Number(task_key)) {
                ticket.title = title_param;
            }

            return ticket;
        });

        parsedtickets.tickets = updatedtickets;

        await write(ticketsJSON, JSON.stringify(parsedtickets));

        response.status(200).json({ message: 'Ticket updated successfully' });
    } catch(error) {
        console.error(error);

        response.status(500).json({ error: 'Internal server error' });
    }
});

ticketsRouter.delete('/:task_key', async (request: Request, response: Response) => {
    const { task_key } = request.params;

    try {
        await ticketsController.deleteTicketByTaskKey(Number(task_key));

        response.status(200).json({ message: "ticket deleted successfully" });
    } catch(error) {
        console.error(error);

        response.status(500).json({ error: 'Internal server error' });
    }
});

export default ticketsRouter;