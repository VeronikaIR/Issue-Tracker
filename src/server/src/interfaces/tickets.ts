export interface ITicket {
    id: Number,
    task_key: string,
    title: string,
    description: string,
    priority: string;
    due_date: Date,
    status: string,
    project_id: Number,
    assignee_id: Number
};

export interface ITicketData {
    tickets: ITicket[];
};
