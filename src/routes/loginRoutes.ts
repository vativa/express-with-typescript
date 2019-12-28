import { NextFunction, Request as ExpressRequest, Response as ExpressResponse, Router } from 'express';

interface Request extends ExpressRequest {
    body: { [key: string]: string | undefined };
}

interface Response extends ExpressResponse {}

const router = Router();

function requireAuth(request: Request, response: Response, next: NextFunction): void {
    if (request.session && request.session.loggedIn) {
        next();
        return;
    }
    response.status(403);
    response.send(`
    <div>
        <div>Not permitted by requireAuth middleware!</div>
        <a href="/login">Please login first</a>
    </div>
`);
}

router.get('/', (request: Request, response: Response): void => {
    if (request.session && request.session.loggedIn) {
        response.send(`
        <div>
            <div>You are logged in</div>
            <a href="/protected">Protected</a>
            <a href="/logout">Logout</a>
        </div>
        `);
    } else {
        response.send(`
        <div>
            <div>You are NOT logged in</div>
            <a href="/login">Login</a>
        </div>
        `);
    }
});

router.get('/logout', (request: Request, response: Response) => {
    request.session = undefined;
    response.redirect('/');
});

router.get('/protected', requireAuth, (request: Request, response: Response) => {
    response.send(`
    <div>Welcome to protected route... Your're allowed to participate</div>
    <a href="/">Home</a>
    <a href="logout">Logout</a>
`);
});

export { router };
