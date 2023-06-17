import {ITicket} from "../interfaces/tickets";
import {parsedInputTicket, parseTaskDtoToITicket} from "../utils/tickets-utils";
import { TaskDto } from "../database/dtos/TaskDto";

const CreateTaskDto = require('../database/dtos/create/CreateTaskDto');

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

    public async getTicketByTaskKey(taskKey: string): Promise<ITicket | undefined> {
        const foundTicket = await TaskRepository.getTaskById(taskKey);

        console.log(foundTicket);
        if (!foundTicket) {
            throw new Error("There is no task with this id found!");
        }
        return parseTaskDtoToITicket(foundTicket);

    };

    public async getTicketsByProjectId(project_id: string): Promise<ITicket[]> {
        const foundTickets = await TaskRepository.getAllTasksByProjectId(project_id);

        console.log(foundTickets);

        return foundTickets.map((ticket) => {
            console.log("Before: ");
            console.log(ticket);
            const parsedObej = parseTaskDtoToITicket(ticket);
            console.log("Parsed:");
            console.log(parsedObej);
            return parsedObej;
        });

    };


    public async addTicket(ticket: ITicket): Promise<ITicket | undefined> {
        console.log(ticket);

        const newTicket = new CreateTaskDto(ticket.title, ticket.description,
            ticket.priority, ticket.dueDate, ticket.status, ticket.projectId, ticket.assigneeId);

        console.log(newTicket);
        const createTicket: TaskDto = await TaskRepository.createTask(newTicket);
        console.log("Successfully created ticket" + createTicket);
        return parseTaskDtoToITicket(createTicket);
    };

    public async updateTicket(taskKey: number, inputTicket: ITicket): Promise<ITicket | undefined> {

        const foundTicket = await TaskRepository.getTaskById(taskKey);

        if (!foundTicket) {
            throw new Error("There is no task with this id found!");
        }

        console.log("Found ticket: ");
        console.log(foundTicket);
        console.log("Input ticket: ");
        console.log(inputTicket);

        const newTicket = parsedInputTicket(foundTicket, inputTicket);

        console.log("!New ticket: ");
        console.log(newTicket);
        const updatedTicket: TaskDto = await TaskRepository.updateTaskById(taskKey, newTicket);

        console.log("Successfully updated ticket" + updatedTicket);

        return parseTaskDtoToITicket(updatedTicket);

    };

    public async deleteTicketByTaskKey(ticket_num: string): Promise<void> {
        const deleteTicket: TaskDto = await TaskRepository.deleteTaskById(ticket_num);
        console.log("Delete ticket is: \n" + deleteTicket);
    };
}