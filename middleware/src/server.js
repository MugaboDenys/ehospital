import express from 'express';
import router from './routes/routes.js';

const app = express();

app.use(express.json());

app.use('/api', router);

const PORT = 5500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
