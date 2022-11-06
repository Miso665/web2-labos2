CREATE TABLE korisnik (
    id_korisnika INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(30) NOT NULL,
    korisnicko_ime VARCHAR(30) NOT NULL,
    lozinka VARCHAR(500) NOT NULL,
    PRIMARY KEY (id_korisnika)
)

CREATE TABLE korisnik_nesigurno (
    id_korisnika INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(30) NOT NULL,
    korisnicko_ime VARCHAR(30) NOT NULL,
    lozinka VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_korisnika)
)

CREATE TABLE korisnik_sigurno (
    id_korisnika INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(30) NOT NULL,
    korisnicko_ime VARCHAR(30) NOT NULL,
    lozinka VARCHAR(500) NOT NULL,
    PRIMARY KEY (id_korisnika)
)


INSERT INTO korisnik (email, korisnicko_ime, lozinka)
VALUES 
('email@mail.com', 'korisnik1', '12345678'),
('email2@mail.com', 'korisnik2', 'lozinka123'),
('email3@mail.com', 'korisnik3', 'nestoskriveno'),



INSERT INTO korisnik_nesigurno (email, korisnicko_ime, lozinka)
VALUES ('email@mail.com', 'korisnik1', '12345678')