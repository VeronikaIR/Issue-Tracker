import {ITicket} from "../interfaces/tickets";
import {parsedInputTicket, parseTaskDtoToITicket} from "../utils/tickets-utils";

const CreateTaskDto = require('../database/dtos/create/CreateTaskDto');
import {TaskDto} from "../database/dtos/TaskDto.js";

const TaskRepository = require('../database/repositories/TaskRepository.js');

export class TicketController {
    private ticketsCollection: ITicket[];

    constructor() {
    }

    public async init() {
        try {
            const tickets: TaskDto[] = await TaskRepository.findAllTasks();
            console.log(tickets);
            this.ticketsCollection = tickets.map((ticket) => {
                console.log("Before: ");
                console.log(ticket);
                const parsedObej = parseTaskDtoToITicket(ticket);
                console.log("Parsed:");
                console.log(parsedObej);
                return parsedObej;
            });
        } catch (error) {
            console.error(error);
        }
    };


    public async getTicketsData(): Promise<ITicket[]> {
        return this.ticketsCollection;
    };

    public async getTicketByTaskKey(task_key: string): Promise<ITicket | undefined> {
        const foundTicket = await TaskRepository.getTaskById(task_key);

        console.log(foundTicket);

        return parseTaskDtoToITicket(foundTicket);
    };

    public async addTicket(ticket: ITicket): Promise<void> {
        console.log(ticket);

        const newTicket = new CreateTaskDto(ticket.task_key, ticket.title, ticket.description,
            ticket.priority, ticket.due_date, ticket.status, ticket.project_id, ticket.assignee_id);

        console.log(newTicket);
        const createTicket = await TaskRepository.createTask(newTicket);
        console.log("Successfully created ticket" + createTicket);
        return createTicket;
    };

    public async updateTicket(task_key: Number, input_ticket: ITicket): Promise<ITicket | undefined> {

        const foundTicket = await TaskRepository.getTaskById(task_key);

        if (!foundTicket) {
            throw new Error("There is no task with this id found!");
        }

        console.log("Found ticket: ");
        console.log(foundTicket);
        console.log("Input ticket: ");
        console.log(input_ticket);

        const newTicket = parsedInputTicket(foundTicket, input_ticket);

        console.log("New ticket: ");
        console.log(newTicket);
        const updatedTicket: TaskDto = await TaskRepository.updateTaskById(task_key, newTicket);

        console.log("Successfully updated ticket" + updatedTicket);

        return parseTaskDtoToITicket(updatedTicket);

    };

    public async deleteTicketByTaskKey(ticket_num: string): Promise<void> {
        const deleteTicket: TaskDto = await TaskRepository.deleteTaskById(ticket_num);
        console.log("Delete ticket is: \n" + deleteTicket);
    };
}