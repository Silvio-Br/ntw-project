export type Message = {
    from: string;
    to: string;
    message: string;
    date: Date;
    seen: boolean;
    lastSeen: Date;
}
