import {ITicket} from "../interfaces/tickets";

const CreateTaskDto = require("../database/dtos/create/CreateTaskDto");

export function parseTaskDtoToITicket(ticket): ITicket {
    return {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        dueDate: new Date(ticket.dueDate),
        status: ticket.status,
        projectId: ticket.projectId,
        assigneeId: ticket.assigneeId
    };
}

export function parsedInputTicket(ticket, inputTicket) {
    let title: string = ticket.title;
    let description: string = ticket.description;
    let priority: string = ticket.priority;
    let dueDate = ticket.dueDate;
    let status: string = ticket.status;
    let projectId: number = ticket.projectId;
    let assigneeId: number = ticket.assigneeId;

    if (inputTicket.title) {
        title = inputTicket.title;
    }

    if (inputTicket.description) {
        description = inputTicket.description;
    }

    if (inputTicket.priority) {
        priority = inputTicket.priority;
    }

    if (inputTicket.dueDate) {
        dueDate = inputTicket.dueDate;
    }

    if (inputTicket.status) {
        status = inputTicket.status;
    }

    if (inputTicket.projectId) {
        projectId = inputTicket.projectId;
    }

    if (inputTicket.assigneeId) {
        assigneeId = inputTicket.assigneeId;
    }

    return new CreateTaskDto(title, description, priority, dueDate, status, projectId, assigneeId);
}