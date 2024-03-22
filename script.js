let rubrica = {
    contatti:
    [
        {
            nome: "Mirko",
            telefono: "3333333",
        },
        {
            nome: "Francesco",
            telefono: "3333334",
        },
        {
            nome: "Matteo",
            telefono: "3333335",
        },
        {
            nome: "Roberto",
            telefono: "3333336",
        }
    ],


    visualizza: function(){
        //console.log('Visualizza');
        this.contatti.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))
        let listaContatti = document.querySelector("#wrapperContacts")
        listaContatti.innerHTML =""

        this.contatti.forEach((contatto)=>{
            // let contattoElement = document.createElement("div")
            // contattoElement.classList.add("rubrica-card")
            // contattoElement.classList.add("shadow")

            // contattoElement.innerHTML = `
            // <div class="avatar">
            // <i class="fas fa-user fa-3x"></i>
            // </div>
            // <div class="info">
            // <span >${contatto.nome}</span>
            // <span>${contatto.telefono}</span>
            // </div>
            // `
            let contattoElement = this.creaCardContatto(contatto)
            listaContatti.appendChild(contattoElement)
        })
    },

    // astrazione della carta HTML dalla funzione Visualizza
    creaCardContatto: function(contatto, del=true){
        let contattoElement = document.createElement("div")
            contattoElement.classList.add("rubrica-card")
            contattoElement.classList.add("shadow")

            contattoElement.innerHTML = `
            ${del ? `
            <button class="btn btn-sm btn-outline-dark rubrica-card-close">
                <i class="fas fa-times"></i>
            </button>` : ""}
            <div class="avatar">
            <i class="fas fa-user fa-3x"></i>
            </div>
            <div class="info">
            <span >${contatto.nome}</span>
            <span>${contatto.telefono}</span>
            </div>
           `
        if(del){
            let removeButton = contattoElement.querySelector(".rubrica-card-close")
            removeButton.addEventListener('click',()=>{
                rubrica.cancella(contatto.nome)
            })
        }
        return contattoElement
    },

    nascondi: function(){
        let listaContatti = document.querySelector("#wrapperContacts")
        listaContatti.innerHTML =""
    },
    ricerca: function(nome){
        console.log(nome);
        if(!nome){
            throw `Scrivi un nome`
        }
        let wrapperSearch = document.querySelector("#wrapperSearch")
        wrapperSearch.innerHTML =""
        let contattoRicercato = this.contatti.find((contatto)=>
        contatto.nome.toLocaleLowerCase().includes(nome.toLowerCase()))
        console.log(contattoRicercato);
        if(contattoRicercato) {
            wrapperSearch.appendChild(this.creaCardContatto(contattoRicercato, false))
        } else{
            throw `Contatto ${nome} inesistente`
        }

        // this.contatti.forEach((contatto)=>{
        //     if(contatto.nome.toLowerCase() == nome.toLowerCase()){
        //         // la funzione creaCardContatto genera HTML card
        //         let contattoRicercato = this.creaCardContatto(contatto)
        //         wrapperSearch.appendChild(contattoRicercato)
        //         }
        //})
    },
    ricercaModifica: function(nome){
        console.log('Ricerca per Modifica');
        if(!nome){
            throw `Scrivi un nome`
        }
        let nomeEdit = document.querySelector("#nomeEdit")
        let telefonoEdit = document.querySelector("#telefonoEdit")
        let nomeEditHnomeEditHiddenidden = document.querySelector("#nomeEditHidden")



        let contattoRicercato = this.contatti.find((contatto)=> nome.toLowerCase() == contatto.nome.toLocaleLowerCase())
        if(contattoRicercato) {
            nomeEditHidden.value = contattoRicercato.nome
            nomeEdit.value = contattoRicercato.nome
            telefonoEdit.value = contattoRicercato.telefono
        } else{
            throw `Contatto ${nome} inesistente`
        }
    },

    cancella: function(nome){
        if(!nome){
            throw `Scrivi un nome`
        } else if (this.contatti.find((contatto)=> nome.toLowerCase() == contatto.nome.toLocaleLowerCase())){
            this.contatti = this.contatti.filter((contatto)=> contatto.nome.toLowerCase() != nome.toLowerCase())
            this.visualizza()
        } else {
            throw `Contatto ${nome} inesistente`
        }
    },

    // inserimento contatto singolo--------------------

    // inserisci: function(nome, telefono){
    //     console.log(`Aggiungi: Nome: ${nome}  Telefono: ${telefono}`);
    //     this.contatti.push({
    //         nome: nome,
    //         telefono: telefono
    //     })
    // },

    //inserimento multiplo--------------------
    inserisci: function (contattiDaInserire){
        contattiDaInserire.forEach((contattoDaInserire)=>{
            if(!contattoDaInserire.nome || !contattoDaInserire.telefono){
                throw "Inserisci sia il nome che il numero"
            }
            let contattoTrovato = this.contatti.find(
                (contatto)=> contatto.nome.toLowerCase() == contattoDaInserire.nome.toLocaleLowerCase() ||
                            contatto.telefono == contattoDaInserire.telefono)
            if(contattoTrovato){
                throw `Ho già inserito il nome: ${contattoDaInserire.nome} oppure il telefono: ${contattoDaInserire.telefono}`
            }
            this.contatti.push(contattoDaInserire)
        })
        this.visualizza()
    },
    // modifica: function(nome, telefono){
    //     console.log('Modifica');
    //     this.contatti.forEach((contatto)=>{
    //         if(nome.toLowerCase() == contatto.nome.toLowerCase()){
    //             contatto.nome = nome
    //             contatto.telefono = telefono
    //         }
    //     })
    // }
    modifica: function(nome, contattoModificato){
        console.log('Modifica');
        this.contatti.forEach((contatto)=>{
            if(nome.toLowerCase() == contatto.nome.toLowerCase()){
                contatto.nome = contattoModificato.nome
                contatto.telefono = contattoModificato.telefono
            }
        })
        this.visualizza()
    }
}
//rubrica.modifica('Matteo','00')

let showContacts = document.querySelector('#showContacts')
showContacts.addEventListener(('click'),()=>{
    rubrica.visualizza()
})
let hideContacts = document.querySelector('#hideContacts')
hideContacts.addEventListener(('click'),()=>{
    rubrica.nascondi()
})
let searchContacts = document.querySelector('#searchContacts')
searchContacts.addEventListener(('click'),()=>{
    let  rch = document.querySelector('#nomeSearch')
        try{
            rubrica.ricerca(nomeSearch.value)
        } catch (error){
            showError(error)
        }
        nomeSearch.value = ""
})
let nomeSearch = document.querySelector("#nomeSearch")
nomeSearch.addEventListener(('keydown'),(event)=>{
    if(event.code == "Enter"){
        try {
            rubrica.ricerca(nomeSearch.value)
            nomeSearch.value =""

        } catch (error){
            showError(error)
        }
    }
})

let removeContact = document.querySelector("#removeContact")
removeContact.addEventListener(('click'),()=>{
    let nomeRemove = document.querySelector("#nomeRemove")
    try {
        rubrica.cancella(nomeRemove.value)
    } catch (error){
        showError(error)
    }
    nomeRemove.value = ""
})
let insertContact = document.querySelector("#insertContact")
insertContact.addEventListener(('click'),()=>{
    let nomeInsert = document.querySelector("#nomeInsert")
    let telefonoInsert = document.querySelector("#telefonoInsert")
    try {
        rubrica.inserisci([{
            nome: nomeInsert.value,
            telefono: telefonoInsert.value
        }])
        } catch (error){
            showError(error)
        }

    nomeInsert.value = ""
    telefonoInsert.value = ""
})
let editContact = document.querySelector("#editContact")
editContact.addEventListener(('click'),()=>{
    let nomeEditHidden = document.querySelector("#nomeEditHidden")
    let nomeEdit = document.querySelector("#nomeEdit")
    let telefonoEdit = document.querySelector("#telefonoEdit")
    try {
        rubrica.modifica(nomeEditHidden.value,{
            nome:nomeEdit.value,
            telefono: telefonoEdit.value
        })
        } catch (error){
            showError(error)
        }
    nomeEditHidden.value = ""
    nomeEdit.value = ""
    telefonoEdit.value = ""
})
let searchEditContact = document.querySelector("#searchEditContact")
searchEditContact.addEventListener(('click'),()=>{
    let nomeSearchEdit = document.querySelector("#nomeSearchEdit")
    try {
        rubrica.ricercaModifica(nomeSearchEdit.value)
        } catch (error){
            showError(error)
        }

    nomeSearchEdit.value = ""

})
let nomeSearchEdit = document.querySelector("#nomeSearchEdit")
nomeSearchEdit.addEventListener(('keydown'),(event)=>{
    if(event.code == "Enter"){
        let nomeSearchEdit = document.querySelector("#nomeSearchEdit")
    try {
        rubrica.ricercaModifica(nomeSearchEdit.value)
        } catch (error){
            showError(error)
        }

    nomeSearchEdit.value = ""
    }
})
function showError(error){
    let wrapperAlert = document.querySelector('#wrapperAlert')
    let alert = document.createElement('div')
    alert.classList.add("fixed-top", "alert", "alert-danger", "alert-dismissible", "m-4")
    alert.setAttribute("role","alert")
    alert.innerHTML = `
        <span>${error}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`
    wrapperAlert.appendChild(alert)
    setTimeout(() => {
        wrapperAlert.innerHTML = ""
    }, 2000);
}




//inserimento contatti multiplo------------------
// let contatti = [
//     {
//         nome: 'Vottorio',
//         telefono: '0'
//     },
//     {
//         nome: 'Maurizio',
//         telefono: '1'
//     }
// ]

//rubrica.inserisci(contatti)