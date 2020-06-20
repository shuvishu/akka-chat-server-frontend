export interface LoginSuccess {
    message: string;
}

export interface Clients {
    clients: User[];
}

export class User {
    id: string;
    name: string;

    constructor(i: string, n: string) {
        this.id = i;
        this.name = n;
    }
}
