import { Request as ExpressRequest, Response } from 'express';
import { httpLogger, requireAuth } from '../middleware'
import { controller, get, use } from './decorators';

// Polyfill
interface Request extends ExpressRequest {
    body: { [key: string]: string | undefined };
}

@controller('')
export class MasterController {

    @get('/')
    @use(httpLogger('home'))
    homeGet(request: Request, response: Response): void {
        if (request.session && request.session.loggedIn) {
            response.send(`
        <div>
            <div>You are logged in</div>
            <a href="/protected">Protected</a>
            <a href="/auth/logout">Logout</a>
        </div>
        `);
        } else {
            response.send(`
        <div>
            <div>You are NOT logged in</div>
            <a href="/auth/login">Login</a>
        </div>
        `);
        }
    }

    @get('/protected')
    @use(requireAuth)
    protectedGet(request: Request, response: Response) {
        response.send(`
            <div>Welcome to protected route... Your're allowed to participate</div>
            <a href="/">Home</a>
            <a href="/auth/logout">Logout</a>
        `);
    }
}
