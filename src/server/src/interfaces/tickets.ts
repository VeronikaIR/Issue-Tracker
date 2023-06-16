export interface ITicket {
    id: number,
    taskKey: string,
    title: string,
    description: string,
    priority: string;
    dueDate: Date,
    status: string,
    projectId: number,
    assigneeId: number
};
