import { Surreal } from 'surrealdb.js';
import {
    PUBLIC_DATABASE_IP,
    PUBLIC_DATABASE_PORT,
} from '$env/static/public';

class DBClient {
    constructor() {
        this.db = new Surreal();
        this.connect();
    }

    async connect() {
        await this.db.connect(`ws://${PUBLIC_DATABASE_IP}:${PUBLIC_DATABASE_PORT}/rpc`);
        await this.db.use({
            namespace: 'magicboard',
            database: 'magicboard'
        });
        await this.db.signin({
            username: 'root',
            password: 'root'
        });
    }

    query(sql: string) {
        return this.db.query(sql);
    }

    live(table, callback) {
        return this.db.live(table, callback);
    }
}

export const dbClient = new DBClient(); 