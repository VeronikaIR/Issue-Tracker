import * as express from 'express';
import tickets from './routes/tickets';
import projects from './routes/projects';

const app = express();

app.use(express.json({ type: 'application/json' }));

app.use('/tickets', tickets);
app.use('/projects', projects);

app.listen(3000, () => {console.log("The server is running on port 3000...")});