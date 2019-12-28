import { NextFunction, Request, Response } from 'express';
import { controller, get, post, propsValidator, use } from './decorators';

function logger(request: Request, response: Response, next: NextFunction): void {
    console.log('request was made...');
    next();
}

@controller('/auth')
export class LoginController {
    @get('/login')
    @use(logger)
    getLogin(request: Request, response: Response): void {
        response.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" type="text" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" />
            </div>
            <button type="submit">Submit</button>
        </form>
        `);
    }

    @post('/login')
    @propsValidator('email', 'password')
    postLogin(request: Request, response: Response): void {
        const { email, password } = request.body;
        if (email && password && email === 'vativa4c@gmail.com' && password === 'center') {
            request.session = { loggedIn: true };
            response.redirect('/');
        } else {
            response.send("Invalid email or password");
        }
    }

}
