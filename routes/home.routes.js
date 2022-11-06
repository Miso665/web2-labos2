const express = require("express");
const router = express.Router();
const req = require("express/lib/request");
const moment = require("moment-timezone");
const Korisnik = require("../models/korisnik");
const bcrypt = require("bcrypt");

const externalUrl = process.env.RENDER_EXTERNAL_URL;

const adminEmail = "supermail@mailinator.com"

router.get("/utakmice", async (req, res) => {
    try {
        const results = await Utakmica.getAll();
        res.render("pregledUtakmica",
        {
            title: "pregledUtakmica",
            utakmice: results,
            user: req.oidc.user,
            admin: (req.oidc.user && req.oidc.user.email === adminEmail) ? true : false
    })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/korisnik", async (req, res) => {
    const { id_korisnika } = req.body;
    try {
        const results = await Korisnik.fetchById(id_korisnika);
        res.status(200);
        return res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

router.post("/korisnik/fixed", async (req, res) => {
    const { id_korisnika } = req.body;
    try {
        const results = await Korisnik.fetchByIdFixed(parseInt(id_korisnika));
        res.status(200);
        return res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

router.post("/prijava", async (req, res) => {
    const {korisnicko_ime, lozinka} = req.body;
    try {
        const results = await Korisnik.fetchByUsername(korisnicko_ime);
        if (results) {
            if (lozinka !== results.lozinka) {
                res.status(401)
                return res.json({poruka: "Neispravna lozinka za korisničko ime: " + korisnicko_ime})
            } else {
                res.status(200)
                return res.json({poruka: "Uspješna prijava!"})
            }
        } else {
            res.status(401)
            return res.json({poruka: "Ne postoji korisnik sa tim korisničkim imenom!"})
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/prijava/fixed", async (req, res) => {
    const {korisnicko_ime, lozinka} = req.body;
    try {
        const results = await Korisnik.fetchByUsername(korisnicko_ime);
        if (results) {
            if (lozinka !== results.lozinka) {
                res.status(401)
                return res.json({poruka: "Neispravno korisničko ime ili lozinka!"})
            } else {
                res.status(200)
                return res.json({poruka: "Uspješna prijava!"})
            }
        } else {
            res.status(401)
                return res.json({poruka: "Neispravno korisničko ime ili lozinka!"})
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/registracija", async (req, res) => {
    const {korisnicko_ime, email, lozinka} = req.body;
    try {
        const zauzeto_ki = await Korisnik.fetchByUsername2(korisnicko_ime);
        if (zauzeto_ki) {
            res.status(403)
            return res.json({poruka: "Zauzeto korsničko ime!"})
        }
        const zauzeto_em = await Korisnik.fetchByEmail(email);
        if (zauzeto_em) {
            res.status(403)
            return res.json({poruka: "Zauzet email!"})
        }
        const results = await Korisnik.addNew(korisnicko_ime, email, lozinka);
        res.status(200)
        return res.json(results);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

router.post("/registracija/fixed", async (req, res) => {
    const {korisnicko_ime, email, lozinka} = req.body;
    try {
        const zauzeto_ki = await Korisnik.fetchByUsernameSafe(korisnicko_ime);
        if (zauzeto_ki) {
            res.status(403)
            return res.json({poruka: "Zauzeto korsničko ime!"})
        }
        const zauzeto_em = await Korisnik.fetchByEmailSafe(email);
        if (zauzeto_em) {
            res.status(403)
            return res.json({poruka: "Zauzet email!"})
        }
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(lozinka, salt);
        const results = await Korisnik.addNewSafe(korisnicko_ime, email, bcryptPassword);
        res.status(200)
        return res.json(results);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

router.get("/sqlinjection", async (req, res) => {
    res.render("sqlInjection",
    {
        title: "SQL injection",
        results: undefined
    })
});

router.get("/brokenauth", async (req, res) => {
    res.render("brokenAuth",
    {
        title: "Broken authentication",
        results: undefined
    })
});

router.get("/brokenregister", async (req, res) => {
    res.render("brokenRegister",
    {
        title: "Broken register",
        results: undefined
    })
});

router.get("/", (req, res) => {
    res.render("home",
        {
            title: "home"
        });
    
});

module.exports = router;