import * as SQLite from 'expo-sqlite';
import { Produto } from '../tipos/types';

//Conexão síncrona com banco
const database = SQLite.openDatabaseSync('produtos.db');

//Inicializa banco
export const initDatabase = () => {
  try {
    database.execSync(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL
      );
    `);
    console.log('Banco de dados inicializado');
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
  }
};

//CRUDs
export const produtoService = {
  getAll: (): Produto[] => {
    try {
      return database.getAllSync<Produto>('SELECT * FROM produtos');
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  },

  create: (nome: string, preco: number): boolean => {
    try {
      database.runSync('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco]);
      return true;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return false;
    }
  },

  update: (id: number, nome: string, preco: number): boolean => {
    try {
      database.runSync('UPDATE produtos SET nome = ?, preco = ? WHERE id = ?', [nome, preco, id]);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return false;
    }
  },

  delete: (id: number): boolean => {
    try {
      database.runSync('DELETE FROM produtos WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return false;
    }
  }
};