import {ITicket} from "../interfaces/tickets";
import {Timestamp} from "mongodb";

const CreateTaskDto = require("../database/dtos/create/CreateTaskDto");


export function parseTaskDtoToITicket(ticket): ITicket {
    return {
        id: ticket.id,
        taskKey: ticket.taskKey,
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
    let taskKey: string = ticket.taskKey;
    let title: string = ticket.title;
    let description: string = ticket.description;
    let priority: string = ticket.priority;
    let dueDate: Timestamp = ticket.dueDate;
    let status: string = ticket.status;
    let projectId: number = ticket.projectId;
    let assigneeId: number = ticket.assigneeId;

    if (inputTicket.taskKey
        && ticket.taskKey == !inputTicket.taskKey) {
        taskKey = inputTicket.taskKey;
    }

    if (inputTicket.title
        && ticket.title == !inputTicket.title) {
        title = inputTicket.title;
    }

    if (inputTicket.description
        && ticket.description == !inputTicket.description) {
        description = inputTicket.description;
    }

    if (inputTicket.priority
        && ticket.priority == !inputTicket.priority) {
        priority = inputTicket.priority;
    }

    if (inputTicket.dueDate
        && ticket.dueDate == !inputTicket.dueDate) {
        dueDate = new Timestamp(inputTicket.dueDate);
    }

    if (inputTicket.status
        && ticket.status == !inputTicket.status) {
        status = inputTicket.status;
    }

    if (inputTicket.projectId
        && ticket.projectId == !inputTicket.projectId) {
        projectId = inputTicket.projectId;
    }

    if (inputTicket.assigneeId
        && ticket.assigneeId == !inputTicket.assigneeId) {
        assigneeId = inputTicket.assigneeId;
    }

    return new CreateTaskDto(taskKey, title, description, priority, dueDate, status, projectId, assigneeId);
}