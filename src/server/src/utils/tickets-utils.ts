import {ITicket} from "../interfaces/tickets";
import {Timestamp} from "mongodb";
import tickets from "../routes/tickets";

const CreateTaskDto = require("../database/dtos/create/CreateTaskDto");


export function parseTaskDtoToITicket(ticket): ITicket {
    return {
        id: ticket.id,
        task_key: ticket.task_key,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        due_date: new Date(ticket.due_date),
        status: ticket.status,
        project_id: ticket.project_id,
        assignee_id: ticket.assignee_id
    };
}

export function parsedInputTicket(ticket, input_ticket) {
    let task_key: string = ticket.task_key;
    let title: string = ticket.title;
    let description: string = ticket.description;
    let priority: string = ticket.priority;
    let due_date: Timestamp = ticket.due_date;
    let status: string = ticket.status;
    let project_id: number = ticket.project_id;
    let assignee_id: number = ticket.assignee_id;

    console.log(input_ticket.description);

    if (input_ticket.task_key
        && ticket.task_key == !input_ticket.task_key) {
        task_key = input_ticket.task_key;
    }

    if (input_ticket.title
        && ticket.title == !input_ticket.title) {
        title = input_ticket.title;
    }

    if (input_ticket.description
        && ticket.description == !input_ticket.description) {
        description = input_ticket.description;
    }

    if (input_ticket.priority
        && ticket.priority == !input_ticket.priority) {
        priority = input_ticket.priority;
    }

    if (input_ticket.due_date
        && ticket.due_date == !input_ticket.due_date) {
        due_date = new Timestamp(input_ticket.due_date);
    }

    if (input_ticket.status
        && ticket.status == !input_ticket.status) {
        status = input_ticket.status;
    }

    if (input_ticket.project_id
        && ticket.project_id == !input_ticket.project_id) {
        project_id = input_ticket.project_id;
    }

    if (input_ticket.assignee_id
        && ticket.assignee_id == !input_ticket.assignee_id) {
        assignee_id = input_ticket.assignee_id;
    }

    return new CreateTaskDto(task_key, title, description, priority, due_date, status, project_id, assignee_id);
}