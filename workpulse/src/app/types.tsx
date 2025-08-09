export type Break = {
    id: number;
    session_id: number;
    name: string;
    length: number;
    created_at: string;
    order: number;
};

export type Logs = {
    id: number;
    session_id: number;
    started_at: string;
    ended_at: string;
    duration: number;
};

export type SessionsBreaks = {
    breaks: Break[];
    logs: Logs[];
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
