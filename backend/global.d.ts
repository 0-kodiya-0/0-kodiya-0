import { User } from "./src/models";
import { StringValue } from 'jsonwebtoken';

// Extend the Node.js process.env type definition
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Server configuration
            NODE_ENV?: 'development' | 'production' | 'test';
            PORT?: string;

            // Authentication
            JWT_SECRET: string;
            JWT_EXPIRES_IN: StringValue;
            ADMIN_USERNAME: string;
            ADMIN_PASSWORD: string;

            // CORS
            ALLOWED_ORIGIN?: string;
        }
    }

    namespace Express {
        interface Request {
            user?: User;
        }
    }
}