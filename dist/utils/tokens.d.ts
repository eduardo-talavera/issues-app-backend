export interface TokenPayload {
    id: string;
    email: string;
    name: string;
    iat: number;
    exp: number;
}
export declare const signAccessToken: (user: {
    id: string;
    email: string;
    name: string;
}) => string;
export declare const signRefreshToken: (user: {
    id: string;
    email: string;
}) => string;
export declare const verifyRefreshToken: (token: string) => TokenPayload;
