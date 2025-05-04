export type UserProfileProps = {
    user_ID: string | null;
    name: string;
    email: string;
    cellphone: string;
    address: string;
    password ?: string;
    role_ID: number;
}