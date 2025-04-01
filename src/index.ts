import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { serverConfig, connectMongoDb } from './configs/config';
import { routes } from './routes/routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

connectMongoDb();

app.get('/', (_req: Request, res: Response): any => {
	try {
		return res.status(200).json({ message: 'Hello, World!' });
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.use('/api', routes);

app.listen(serverConfig.port, () => {
	console.log(
		`========== Server is running on port ${serverConfig.port}, ${app.get(
			'env'
		)}, ${serverConfig.developerName} ==========`
	);
});
