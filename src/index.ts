import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import { AppRouter } from './AppRouter';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['random-string'] }));
app.use(router);
app.use(AppRouter.instance);

app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})
