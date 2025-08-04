export type Break = {
    id: number;
    session_id: number;
    name: string;
    length: number;
    created_at: string;
    order: number;
};

export type SessionsBreaks = {
    breaks: Break[];
    session: {
        id: number;
        user_id: number;
        created_at: string;
        name: string;
        break_interval: number;
        length: number;
        minutes_worked: number | null;
    };
};
