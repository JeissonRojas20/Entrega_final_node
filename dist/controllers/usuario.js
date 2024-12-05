"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [usuarios] = yield conexion_1.default.query('SELECT * FROM usuario');
        res.json({
            total: usuarios.length,
            usuarios
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al consultar usuarios',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [[usuario]] = yield conexion_1.default.query('SELECT * FROM usuario WHERE id = :id', {
            replacements: { id },
            raw: true
        });
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró usuario con el ID: ${id}`
            });
        }
        res.json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al consultar usuario',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo } = req.body;
    try {
        yield conexion_1.default.query('INSERT INTO usuario (nombre, correo) VALUES (:nombre, :correo)', {
            replacements: { nombre, correo }
        });
        res.status(201).json({
            msg: 'Usuario creado exitosamente'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear usuario'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    try {
        yield conexion_1.default.query('UPDATE usuario SET nombre = :nombre, correo = :correo WHERE id = :id', {
            replacements: { nombre, correo, id }
        });
        res.json({
            msg: 'Usuario actualizado exitosamente'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar usuario'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield conexion_1.default.query('DELETE FROM usuario WHERE id = :id', {
            replacements: { id }
        });
        res.json({
            msg: 'Usuario eliminado exitosamente'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar usuario'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
