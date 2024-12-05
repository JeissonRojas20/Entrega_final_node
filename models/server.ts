import express, { Application } from 'express';
import userRoutes from '../routes/usuarios';
import cors from 'cors';
import db from '../db/conexion';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuario: '/api/Usuarios'
    }

    constructor(){

        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConection();
        this.middlaweres();
        this.routes();

    }

    async dbConection() {
        try {
            await db.authenticate();
            console.log('Base de datos en linea');
            
        } catch(error) {
            throw new Error(error);
        }
    }

    middlaweres() {

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuario, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
            
        })
    }
}

export default Server;