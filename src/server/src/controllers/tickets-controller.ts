import { ITicket, ITicketData} from "../interfaces/tickets";
import { readFile, write } from "../utils/file-utils";
// import { DataBase } from '../db/index';
// import { MongoClient } from "mongodb";

const ticketsJSON: string = 'resources/tickets.json';
const ticketsCollection = 'tickets';

export class TicketController {
    private ticketsData: ITicketData;
    private ticketsCollection;

    constructor() {}

    public async init() {
        // try {
        //     const db = await new DataBase().connectDB();
        //     this.ticketsCollection = await db.collection('tickets');
        // } catch (error) {
        //     console.error(error);
        // }

        const ticketsData = await readFile(ticketsJSON);
        
        this.ticketsData = JSON.parse(ticketsData);
    }

    public async getTicketsData(): Promise<ITicketData> {
        //return this.ticketsCollection.find({});
        return this.ticketsData;
    }

    public async getTicketByTaskKey(task_key: number): Promise<ITicket | undefined> {
        //const ticket = await this.ticketsCollection.findOne({ fn });
        const ticket = this.ticketsData.tickets.filter(ticket => ticket.task_key === task_key)

        return ticket[0];
    }

    public async addticket(ticket: ITicket): Promise<void> {
        ticket.task_key = Number(ticket.task_key);
        ticket.title = ticket.title;
        
        //this.ticketsCollection.insertOne(ticket);

        this.ticketsData.tickets.push(ticket);

        await this.saveTicketsData();
    }

    public async deleteTicketByTaskKey(ticket_num: number): Promise<void> {
       // this.ticketsCollection.deleteOne({ task_key: ticket_num });

        const updatedtickets = this.ticketsData.tickets.filter(ticket => ticket.task_key !== ticket_num);
        this.ticketsData.tickets = updatedtickets;
        await write(ticketsJSON, JSON.stringify(this.ticketsData));
    }

    private async saveTicketsData(): Promise<void> {
        await write(ticketsJSON, JSON.stringify(this.ticketsData));
    }
}