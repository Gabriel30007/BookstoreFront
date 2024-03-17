export class User {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    roles?: string;

    constructor();
    constructor(id?: string);
    constructor(id?: string, name?: string, email?: string, password?: string, roles?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}
