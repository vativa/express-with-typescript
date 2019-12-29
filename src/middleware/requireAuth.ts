import { NextFunction, Request, Response } from 'express';

export function requireAuth(request: Request, response: Response, next: NextFunction): void {
    if (request.session && request.session.loggedIn) {
        next();
        return;
    }
    response.status(403);
    response.send(`
        <div>
            <div>Not permitted by requireAuth middleware!</div>
            <a href="/auth/login">Please login first</a>
        </div>
    `);
}
