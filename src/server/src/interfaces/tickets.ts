export interface ITicket {
    task_key: Number,
    title: string,
    description: string,
    priority: string;
    due_date: Date,
    status: string
};

export interface ITicketData {
    tickets: ITicket[];
};
