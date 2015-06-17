

export default class Repository{

    constructor(connection) {
        this.connection = connection;
    }
    getUser() {
        return this.connection.get('/user');
    }
    login(login, password) {
        return this.connection.post('/login', {
            login: login,
            password: password
        });
    }
    logout() {
        return this.connection.get('/logout');
    }
}
