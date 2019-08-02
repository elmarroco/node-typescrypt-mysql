"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql_1.default.createConnection({
            host: "localhost",
            user: "node_user2",
            password: "123456",
            database: "node_db"
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query', err);
                callback(err);
            }
            if (results.length == 0) {
                callback('El registro solicitado no existe');
            }
            callback(null, results);
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log("Base de datos online");
        });
    }
    ;
}
exports.default = MySQL;
