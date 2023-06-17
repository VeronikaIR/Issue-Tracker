export interface ITicket {
    id: number,
    title: string,
    description: string,
    priority: string;
    dueDate: Date,
    status: string,
    projectId: number,
    assigneeId: number
};
