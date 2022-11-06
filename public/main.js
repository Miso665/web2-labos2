function searchId() {
    const id_korisnika = document.getElementById("idinput1").value;
    var innerElement = document.getElementById("iddiv1");
    axios.post(window.location.protocol + "/korisnik", {
        id_korisnika: id_korisnika
    })
    .then((results) => 
    {
        innerElement.innerHTML = JSON.stringify(results.data)
    })
    .catch((err) => alert("Neispravan ID"))
}

function searchIdFixed() {
    const id_korisnika = document.getElementById("idinput2").value;
    var innerElement = document.getElementById("iddiv2");
    axios.post(window.location.protocol + "/korisnik/fixed", {
        id_korisnika: id_korisnika
    })
    .then((results) => 
    {
        innerElement.innerHTML = JSON.stringify(results.data)
    })
    .catch((err) => alert("Neispravan ID"))
}

function pokaziSQL(c) {
    if (c.value === "1") {

        document.getElementById("nesigurno").style.visibility = 'visible';
        document.getElementById("sigurno").style.visibility = 'hidden';
    } else if (c.value === "2") {
        document.getElementById("nesigurno").style.visibility = 'hidden';
        document.getElementById("sigurno").style.visibility = 'visible';
    }
}

function sendLogin() {
    const korisnicko_ime = document.getElementById("username").value;
    const lozinka = document.getElementById("password").value;
    var innerElement = document.getElementById("povratnaporuka");
    if (document.getElementById("nes").checked) {
        axios.post(window.location.protocol + "/prijava", {
            korisnicko_ime: korisnicko_ime,
            lozinka: lozinka
        })
        .then((results) => {
            console.log(results)
            if (results.status == 200) {
                innerElement.style.color = "green"
                innerElement.innerHTML = "Uspješno ste se prijavili"
            } else {
                innerElement.style.color = "red"
                innerElement.innerHTML = JSON.stringify(results.data)
            }
        })
        .catch((err) => {
            //alert("Greška pri prijavi: " + err)
            innerElement.style.color = "red"
            innerElement.innerHTML = err.response.data.poruka
        })

    } else {
        axios.post(window.location.protocol + "/prijava/fixed", {
            korisnicko_ime: korisnicko_ime,
            lozinka: lozinka
        })
        .then((results) => {
            console.log(results)
            if (results.status == 200) {
                innerElement.style.color = "green"
                innerElement.innerHTML = "Uspješno ste se prijavili"
            } else {
                innerElement.style.color = "red"
                innerElement.innerHTML = JSON.stringify(results.data)
            }
        })
        .catch((err) => {
            //alert("Greška pri prijavi: " + err)
            innerElement.style.color = "red"
            innerElement.innerHTML = err.response.data.poruka
        })
    }
}

function sendRegister() {
    const korisnicko_ime = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const lozinka = document.getElementById("password").value;
    const lozinka2 = document.getElementById("password2").value;
    var innerElement = document.getElementById("povratnaporuka");
    if (korisnicko_ime.length !== 0 && email.length !== 0 && lozinka.length !== 0 && lozinka2.length !== 0) {
        if (lozinka !== lozinka2) {
            innerElement.style.color = "red"
            innerElement.innerHTML = "Lozinke moraju biti jednake!"
        } else {
            if (document.getElementById("nes").checked) {
                axios.post(window.location.protocol + "/registracija", {
                    korisnicko_ime: korisnicko_ime,
                    email: email,
                    lozinka: lozinka
                })
                .then((results) => {
                    console.log(results)
                    if (results.status == 200) {
                        innerElement.style.color = "green"
                        innerElement.innerHTML = "Uspješna registracija, lozinka: " + results.data[0].lozinka
                    } else {
                        innerElement.style.color = "red"
                        innerElement.innerHTML = JSON.stringify(results.data)
                    }
                })
                .catch((err) => {
                    //alert("Greška pri prijavi: " + err)
                    innerElement.style.color = "red"
                    innerElement.innerHTML = err.response.data.poruka
                })
        
            } else {
                axios.post(window.location.protocol + "/registracija/fixed", {
                    korisnicko_ime: korisnicko_ime,
                    email: email,
                    lozinka: lozinka
                })
                .then((results) => {
                    console.log(results)
                    if (results.status == 200) {
                        innerElement.style.color = "green"
                        innerElement.innerHTML = "Uspješna registracija, lozinka: " + results.data[0].lozinka
                    } else {
                        innerElement.style.color = "red"
                        innerElement.innerHTML = JSON.stringify(results.data)
                    }
                })
                .catch((err) => {
                    //alert("Greška pri prijavi: " + err)
                    innerElement.style.color = "red"
                    innerElement.innerHTML = err.response.data.poruka
                })
            }
        }
    } else {
        innerElement.style.color = "red"
        innerElement.innerHTML = "Potrebno je popuniti sva polja!"
    }
    
}