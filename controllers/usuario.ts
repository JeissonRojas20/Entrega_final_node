import { Request, Response } from "express";
import db from "../db/conexion";

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const [usuarios] = await db.query('SELECT * FROM usuario');
        
        res.json({
            total: (usuarios as any[]).length,
            usuarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al consultar usuarios',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [[usuario]] = await db.query('SELECT * FROM usuario WHERE id = :id', {
            replacements: { id },
            raw: true
        });

        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró usuario con el ID: ${id}`
            });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al consultar usuario',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    const { nombre, correo } = req.body;

    try {
        await db.query(
            'INSERT INTO usuario (nombre, correo) VALUES (:nombre, :correo)',
            {
                replacements: { nombre, correo }
            }
        );
        
        res.status(201).json({
            msg: 'Usuario creado exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear usuario'
        });
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;

    try {
        await db.query(
            'UPDATE usuario SET nombre = :nombre, correo = :correo WHERE id = :id',
            {
                replacements: { nombre, correo, id }
            }
        );
        
        res.json({
            msg: 'Usuario actualizado exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar usuario'
        });
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await db.query(
            'DELETE FROM usuario WHERE id = :id',
            {
                replacements: { id }
            }
        );
        
        res.json({
            msg: 'Usuario eliminado exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar usuario'
        });
    }
}