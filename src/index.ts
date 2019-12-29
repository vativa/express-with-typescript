import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/AuthController';
import './controllers/MasterController';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['random-string'] }));
app.use(AppRouter.instance);

app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})
