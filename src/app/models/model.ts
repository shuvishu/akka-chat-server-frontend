export interface LoginSuccess {
    message: string;
}

export interface Clients {
    clients: User[];
}

export class ChatMessage {
    from: string;
    to: string;
    message: string;
    time: number;
    constructor(m: string, time: number, frm: string, t: string) {
        this.message = m;
        this.time = time;
        this.from = frm;
        this.to = t;
    }

}

export class Chats {
    id: User;
    chat: ChatMessage[];
    isOnline: boolean;

    constructor(id: User) {
        this.id = id;
        this.isOnline = true;
        this.chat = [];
    }

    getStatus(): string {
        return this.isOnline ? 'Online' : 'Offline';
    }

    getColor() {
        return this.isOnline ? {color: 'green'} : {color: '#ff0101'};
    }
}

export class User {
    id: string;
    name: string;

    constructor(i: string, n: string) {
        this.id = i;
        this.name = n;
    }
}

export interface UnreadMessage {
    from: string;
    messages: ChatMessage[];
}

export interface PollSuccess {
    unread: UnreadMessage[];
}
