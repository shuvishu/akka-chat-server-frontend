export interface LoginSuccess {
    message: string;
}

export interface Clients {
    clients: User[];
}

export class ChatMessage {
    byMe: boolean;
    message: string;
    time: Date;
    constructor(m: string, bm: boolean, time: number) {
        this.message = m;
        this.byMe = bm;
        this.time = new Date(time);
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
}

export class User {
    id: string;
    name: string;

    constructor(i: string, n: string) {
        this.id = i;
        this.name = n;
    }
}
