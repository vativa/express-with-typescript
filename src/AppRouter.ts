import { Router } from 'express';

// Singleton
export class AppRouter {
    private static _instance: Router;

    public static get instance(): Router {
        if (!AppRouter._instance) {
            AppRouter._instance = Router();
        }
        return AppRouter._instance;
    }
}
