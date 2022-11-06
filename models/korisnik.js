const db = require('../db');

module.exports = class Korisnik {
    constructor(id_korisnika, email, korisnicko_ime, lozinka) {
        this.id_korisnika = id_korisnika
        this.email = email
        this.korisnicko_ime = korisnicko_ime
        this.lozinka = lozinka
    }

    static async fetchById(id_korisnika) {
        return (await db.query(
            `SELECT korisnicko_ime, email FROM korisnik WHERE id_korisnika = ` + id_korisnika
        )).rows
    }
    static async fetchByIdFixed(id_korisnika) {
        return (await db.query(
            `SELECT korisnicko_ime, email FROM korisnik WHERE id_korisnika = $1`, [id_korisnika]
        )).rows[0]
    } 

    static async fetchByUsername(korisnicko_ime) {
        return (await db.query(
            `SELECT * FROM korisnik WHERE korisnicko_ime = $1`, [korisnicko_ime]
        )).rows[0]
    }

    static async fetchByUsername2(korisnicko_ime) {
        return (await db.query(
            `SELECT * FROM korisnik_nesigurno WHERE korisnicko_ime = $1`, [korisnicko_ime]
        )).rows[0]
    }

    static async fetchByUsernameSafe(korisnicko_ime) {
        return (await db.query(
            `SELECT * FROM korisnik_sigurno WHERE korisnicko_ime = $1`, [korisnicko_ime]
        )).rows[0]
    }

    static async fetchByEmail(email) {
        return (await db.query(
            `SELECT * FROM korisnik_nesigurno WHERE email = $1`, [email]
        )).rows[0]
    }

    static async fetchByEmailSafe(email) {
        return (await db.query(
            `SELECT * FROM korisnik_sigurno WHERE email = $1`, [email]
        )).rows[0]
    }
    
    static async addNew(korisnicko_ime, email, lozinka) {
        return (await db.query(
            `INSERT INTO korisnik_nesigurno (korisnicko_ime, email, lozinka)
            VALUES ($1, $2, $3) RETURNING *`, [korisnicko_ime, email, lozinka]
        )).rows;
    }

    static async addNewSafe(korisnicko_ime, email, lozinka) {
        return (await db.query(
            `INSERT INTO korisnik_sigurno (korisnicko_ime, email, lozinka)
            VALUES ($1, $2, $3) RETURNING *`, [korisnicko_ime, email, lozinka]
        )).rows;
    }
}