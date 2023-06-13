export interface ITicket {
    id: number,
    task_key: string,
    title: string,
    description: string,
    priority: string;
    due_date: Date,
    status: string,
    project_id: number,
    assignee_id: number
};

export interface ITicketData {
    tickets: ITicket[];
};
