import { Request as ExpressRequest, Response } from 'express';
import { controller, get, post, propsValidator, use } from './decorators';
import { httpLogger } from '../middleware/httpLogger';
import { loginForm } from '../views/loginForm';

// Polyfill
interface Request extends ExpressRequest {
    body: { [key: string]: string | undefined };
}

@controller('/auth')
export class AuthController {

    @get('/login')
    @use(httpLogger('login'))
    loginGet(request: Request, response: Response): void {
        response.send(loginForm);
    }

    @post('/login')
    @propsValidator('email', 'password')
    loginPost(request: Request, response: Response): void {
        const { email, password } = request.body;
        if (email && password && email === 'vativa4c@gmail.com' && password === 'center') {
            request.session = { loggedIn: true };
            response.redirect('/');
        } else {
            response.send(`
                <p>Invalid email or password</p>
                ${loginForm}
            `);
        }
    }

    @get('/logout')
    logoutGet(request: Request, response: Response): void {
        request.session = undefined;
        response.redirect('/');
    }
}
