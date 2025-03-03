// lib/models/jwt.ts
import { JWTPayload } from 'jose';

export interface JWTCustomPayload extends JWTPayload {
    username: string;
    role: string;
}