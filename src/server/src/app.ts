import * as express from 'express';
//import * as cors from 'cors';
import tickets from './routes/tickets';

const app = express();

//app.use(cors());
app.use(express.json({ type: 'application/json' }));

app.use('/tickets', tickets);

app.listen(3000, () => {console.log("The server is running on port 3000...")});