import {Router, Request, Response} from 'express';
import {ITicket} from '../interfaces/tickets';
import {TicketController} from '../controllers/tickets-controller';

//Define tickets controller
const ticketsController: TicketController = new TicketController();

const getTicketController = async (req: Request, res: Response, next: () => void) => {
    try {
            console.log('Controller initialization...');
            await ticketsController.init();
            console.log('Initialized controller');
           next();
        } catch (error) {
            console.error(error);
            throw new Error('Failed to initialize controller');
        }
};

//Define router for the tickets request
const ticketsRouter: Router = Router();
ticketsRouter.use(getTicketController);

//Tickets endpoints
ticketsRouter.get('/', async (request: Request, response: Response) => {
    try {
        const tickets = await ticketsController.getTicketsData();
        response.status(200).json(tickets);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: error.message});
    }
});

ticketsRouter.get('/:task_key', async (request: Request, response: Response) => {
    const {task_key} = request.params;

    try {
        const ticket = await ticketsController.getTicketByTaskKey(task_key);

        if (ticket) {
            response.status(200).json(ticket);
        } else {
            response.status(404).json({message: "Ticket not found"});
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({message: error.message});
    }
});

ticketsRouter.get('/tickets-by-project/:project_key', async (request: Request, response: Response) => {
    const {project_key} = request.params;

    try {
        const tickets = await ticketsController.getTicketsByProjectId(project_key);

        if (tickets.length > 0) {
            response.status(200).json(tickets);
        } else {
            response.status(404).json({message: "Tickets not found"});
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({message: error.message});
    }
});


ticketsRouter.post('/', async (request: Request, response: Response) => {
    const ticket: ITicket = request.body;

    try {
        console.log(ticket);
        const createdTicker = await ticketsController.addTicket(ticket);
        response.status(201).json(createdTicker);
    } catch (error) {
        console.error(error);
        response.status(500).json({message: error.message});
    }
});

ticketsRouter.patch('/:task_key', async (request: Request, response: Response) => {
    const {task_key} = request.params;
    const inputTicketDetails: ITicket = request.body;

    try {

        console.log(inputTicketDetails);
        await ticketsController.updateTicket(Number(task_key), inputTicketDetails);

        response.status(200).json({message: 'Ticket updated successfully'});
    } catch (error) {
        console.error(error);

        response.status(500).json({message: error.message});
    }
});

ticketsRouter.delete('/:task_key', async (request: Request, response: Response) => {
    const {task_key} = request.params;

    try {
        await ticketsController.deleteTicketByTaskKey(task_key);

        response.status(200).json({message: "Ticket deleted successfully"});
    } catch (error) {
        console.error(error);

        response.status(500).json({message: error.message});
    }
});

export default ticketsRouter;