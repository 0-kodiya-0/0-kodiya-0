declare namespace NodeJS {
    export interface ProcessEnv {
        ADMIN_USERNAME: string;
        ADMIN_PASSWORD: string;
        JWT_SECRET: string;
        JWT_EXPIRES_IN: string;
        JSONBIN_API_URL: string;
        JSONBIN_MASTER_KEY: string;
        JSONBIN_PROJECTS_BIN_ID: string;
        JSONBIN_TESTIMONIALS_BIN_ID: string;

        NEXT_PUBLIC_GIT_BASE_URL: string;
        NEXT_PUBLIC_GIT_USERNAME: string;
    }
}
