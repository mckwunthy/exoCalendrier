//varibales liste des mois
var moisTable = [
    "janvier",
    "fevrier",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "aout",
    "septembre",
    "octobre",
    "novembre",
    "decembre"
]

var moisNbreJours = {
    janvier: 31,
    fevrier: 28,
    mars: 31,
    avril: 30,
    mai: 31,
    juin: 30,
    juillet: 31,
    aout: 31,
    septembre: 30,
    octobre: 31,
    novembre: 30,
    decembre: 31
}

var joursTable = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi"
]

//var jour
var jourPremier = 1
nbreBloc = 42
nbreBlocParLigne = 7



//select
var selectTag = document.getElementById("annee")
// var selectTag2 = document.getElementById("annee")
var selectTagMois = document.getElementById("mois")
var chevronFermant = document.querySelector(".chevron-fermant")
var chevronOuvrant = document.querySelector(".chevon-ouvrant")
var jourStandards = document.querySelector(".calendrier-date")

//functionlistener
var functionListener = {
    initMoisEnCours: () => {
        var date = new Date()
        var mois = date.getMonth()
        var moisEncours = moisTable[mois]

        var moisListe = document.getElementById(moisEncours)
        moisListe.selected = true

        functionListener.afficheJours()
    },
    initAnnee: () => {
        var annees = document.getElementById("annee")
        var date = new Date()
        var anneeEnCours = date.getFullYear()
        // console.log(anneeEnCours);
        var anneeDebut = 1970

        for (let index = anneeDebut; index < anneeEnCours + 1; index++) {
            var option = document.createElement("option")
            var optionText = document.createTextNode(index)
            option.id = index
            option.value = index
            if (index == anneeEnCours) {
                option.selected = true
            }
            option.appendChild(optionText)
            // console.log(option);
            annees.appendChild(option)
        }

    },
    initMoisSiAnneeChange: () => {
        var janvier = document.getElementById("janvier")
        // console.log(janvier);
        janvier.selected = true

    },
    afficheJours: () => {
        var annee = document.querySelectorAll("select#annee option")

        for (let index = 0; index < annee.length; index++) {
            const element = annee[index];
            if (element.selected) {
                var anneeValeur = element.value
                // console.log(anneeValeur);
            }
        }


        /*maj fevrir*/
        /*maj nbre jr fevrier*/
        var obtenirAnnee = document.querySelectorAll("select#annee option")
        for (let i = 0; i < obtenirAnnee.length; i++) {
            const element = obtenirAnnee[i];
            if (element.selected) {
                var valeurAnnee = element.value
            }

        }

        var majFev = new Date(anneeValeur, 1, 29)
        // console.log(anneeValeur);
        // console.log(majFev);
        // console.log(majFev.getDate());
        if (majFev.getDate() == 1) {

            Object.defineProperty(moisNbreJours, 'fevrier', {
                value: 28,
                writable: true
            });
        } else {
            Object.defineProperty(moisNbreJours, 'fevrier', {
                value: 29,
                writable: true
            });
        }
        /*fin maj nbre jr fevrier*/
        /*maj fevrir*/


        var mois = document.querySelectorAll("select#mois option")
        for (let index = 0; index < mois.length; index++) {
            const element = mois[index];
            if (element.selected) {
                var moisValeur = element.value
                // console.log(moisValeur);
            }
        }

        var InfosPourRemplissageJours = () => {
            for (let i = 0; i < moisTable.length; i++) {
                const elementMois = moisTable[i];
                if (elementMois == moisValeur) {
                    var date = new Date(anneeValeur, i, jourPremier)
                    var dateJour = date.getDay()
                    var dateMois = date.getMonth()
                    return [dateJour, dateMois]
                }
            }
        }

        var dateJourEtMois = InfosPourRemplissageJours()

        var remplissageJour = () => {
            // console.log(dateJourEtMois[1]);
            var nbreJourdansMois = moisNbreJours[moisValeur]

            //mettre a jour les style
            var initJoursStyle = () => {
                for (let ind = 0; ind < nbreBloc; ind++) {
                    var jourAreinitialiser = document.getElementById(ind)
                    jourAreinitialiser.style.backgroundColor = "white"
                    // jourAreinitialiser.style.color = "#CBD6D5"
                    jourAreinitialiser.style.color = "#ccc"

                }
            }
            initJoursStyle()

            //annule les cases non concernees avant date jours

            // console.log(dateJourEtMois[1]);
            var IndexMoisPrecedent
            if (dateJourEtMois[1] > 0) {
                IndexMoisPrecedent = dateJourEtMois[1] - 1
                var anneeValeurPrecedant = anneeValeur
            }

            if (dateJourEtMois[1] == 0) {
                IndexMoisPrecedent = dateJourEtMois[1] - 1 + 12
                var anneeValeurPrecedant = anneeValeur - 1
            }

            var nbreJrMoisNouveau = moisNbreJours[moisTable[IndexMoisPrecedent]]
            var nbreJrPrecedant = nbreJrMoisNouveau - dateJourEtMois[0]

            // console.log(dateJourEtMois[0]);
            let nIndex = dateJourEtMois[0] - 1
            let compteur = 0

            for (let index = nIndex; index >= 0; index--) {
                const element = document.getElementById(index)
                // console.log(element);
                element.innerHTML = nbreJrMoisNouveau - compteur
                compteur++
            }

            //annule les case non concernee apres date jours
            var indexx = dateJourEtMois[0] + nbreJourdansMois
            var k = 1
            for (let index = indexx; index < nbreBloc; index++) {
                var joursMoisSuivant = document.getElementById(index)
                // console.log(joursMoisSuivant);
                joursMoisSuivant.innerHTML = k
                k++
            }

            //gestion jours corrects
            var j = 1
            // console.log(indexx)
            for (let e = dateJourEtMois[0]; e < indexx; e++) {
                var jourAactiver = document.getElementById(e)
                jourAactiver.style.color = "black"


                var dateJourJ = new Date()
                var moisJ = dateJourJ.getMonth()
                var moisEncoursJ = moisTable[moisJ]
                var jourJ = dateJourJ.getDay()
                // console.log(moisEncoursJ);
                // console.log(dateJourEtMois[1]);

                /*
                choix date du jour*/
                if (jourJ == e && moisTable[dateJourEtMois[1]] == moisEncoursJ) {
                    jourAactiver.style.color = "red"
                }

                jourAactiver.innerHTML = j
                j++
            }
        }
        remplissageJour()

    },
    miseAjourAnneeAuClickAvance: () => {

        var clickAvance = document.querySelector(".chevron-fermant")

        var compteurClickAvance = 0

        var nbreAnneeAajouter = 0

        clickAvance.addEventListener('click', () => {
            compteurClickAvance += 1
            // console.log(compteurClickAvance);

            var functionCibleAnnee = () => {
                var cibleAnnee = document.querySelectorAll("select#annee option")
                for (let index = 0; index < cibleAnnee.length; index++) {
                    const element = cibleAnnee[index];
                    if (element.selected) {
                        return [element, element.value]
                    }
                }
            }
            var cibleAnneeSelectionne = functionCibleAnnee()

            //  console.log(cibleAnneeSelectionne);

            var functionCibleMois = () => {
                var cibleMois = document.querySelectorAll("select#mois option")
                for (let index = 0; index < cibleMois.length; index++) {
                    const element = cibleMois[index];
                    if (element.selected) {
                        return [element, element.value, index]
                    }
                }
            }
            var cibleMoisSelectionne = functionCibleMois()

            //  console.log(cibleMoisSelectionne);

            var indexMoisCible = Number.parseInt(cibleMoisSelectionne[2])

            //console.log(compteurClickAvance);

            if (indexMoisCible == 0) {
                nbreAnneeAajouter++
            }

            // console.log(nbreAnneeAajouter);

            nouvelleAnnee = Number.parseInt(cibleAnneeSelectionne[1]) + nbreAnneeAajouter
            // console.log(nouvelleAnnee);
            cibleAnneeSelectionne[0].innerHTML = nouvelleAnnee
            // console.log(cibleAnneeSelectionne[0]);
            cibleAnneeSelectionne[0].value = nouvelleAnnee
            cibleAnneeSelectionne[0].id = nouvelleAnnee
            cibleAnneeSelectionne[0].selected = true


            functionListener.afficheJours()

            //remise a zero de lincrementeur
            nbreAnneeAajouter = 0

        })
    },
    miseAjourAnneeAuClickPrecedent: () => {

        var clickRecule = document.querySelector(".chevon-ouvrant")

        var nbreAnneeAretrancher = 0

        clickRecule.addEventListener('click', () => {

            var functionCibleAnnee = () => {
                var cibleAnnee = document.querySelectorAll("select#annee option")
                for (let index = 0; index < cibleAnnee.length; index++) {
                    const element = cibleAnnee[index];
                    if (element.selected) {
                        return [element, element.value]
                    }
                }
            }
            var cibleAnneeSelectionne = functionCibleAnnee()

            //  console.log(cibleAnneeSelectionne);

            var functionCibleMois = () => {
                var cibleMois = document.querySelectorAll("select#mois option")
                for (let index = 0; index < cibleMois.length; index++) {
                    const element = cibleMois[index];
                    if (element.selected) {
                        return [element, element.value, index]
                    }
                }
            }
            var cibleMoisSelectionne = functionCibleMois()

            //  console.log(cibleMoisSelectionne);

            var indexMoisCible = Number.parseInt(cibleMoisSelectionne[2])

            if (indexMoisCible == 11) {
                nbreAnneeAretrancher++
            }

            //console.log(nbreAnneeAretrancher);

            nouvelleAnnee = Number.parseInt(cibleAnneeSelectionne[1]) - nbreAnneeAretrancher
            // console.log(nouvelleAnnee);
            cibleAnneeSelectionne[0].innerHTML = nouvelleAnnee
            // console.log(cibleAnneeSelectionne[0]);
            cibleAnneeSelectionne[0].value = nouvelleAnnee
            cibleAnneeSelectionne[0].id = nouvelleAnnee
            cibleAnneeSelectionne[0].selected = true


            functionListener.afficheJours()

            //remise a zero de lincrementeur
            nbreAnneeAretrancher = 0

        })
    },
    avanceMois: () => {
        var mois = document.querySelectorAll("select#mois option")

        for (let index = 0; index < mois.length; index++) {
            const element = mois[index];
            if (element.selected) {

                if (index + 1 > 11) {
                    index += 1
                    index %= 11
                    index -= 1
                } else {
                    index += 1
                }
                var moisAafficher = document.getElementById(moisTable[index])
                moisAafficher.selected = true
                functionListener.afficheJours()
                return
            }
        }

    },
    reculeMois: () => {
        var mois = document.querySelectorAll("select#mois option")

        for (let index = 0; index < mois.length; index++) {
            const element = mois[index];
            if (element.selected) {

                if (index - 1 < 0) {
                    index -= 1
                    index += 12
                } else {
                    index -= 1
                }
                var moisAafficher = document.getElementById(moisTable[index])
                moisAafficher.selected = true

                functionListener.afficheJours()

                return
            }
        }
    },
    remplissageStandard: () => {

        var largeurTot = getComputedStyle(jourStandards).getPropertyValue('width')
        largeurTot = parseInt(largeurTot)
        var largeurBloc = largeurTot / nbreBlocParLigne
        largeurBloc = Math.round(largeurBloc)

        var heuteurBloc = largeurBloc / 2
        heuteurBloc = Math.round(heuteurBloc)

        //console.log(largeurBloc);

        for (let index = 0; index < nbreBloc; index++) {
            const jour = document.createElement("div")
            jour.id = index
            jour.className = "listeJourBloc"
            jour.value = index

            var jourContent = document.createTextNode(index)
            jour.appendChild(jourContent)

            jourStandards.appendChild(jour)
        }

        var listeJourBloc = document.querySelectorAll(".listeJourBloc")
        for (let index = 0; index < listeJourBloc.length; index++) {
            const element = listeJourBloc[index];

            // element.style.backgroundColor = "red"
            element.style.width = `${largeurBloc}px`
            element.style.height = `${heuteurBloc}px`
            element.style.textAlign = "center"
            element.style.lineHeight = "40px"
            element.style.fontWeight = "bold"
            // element.style.color = "white"
        }




    }
}

//setupListener
var setupFunction = () => {
    //initiatliser
    // functionListener.initMoisEnCours()
    functionListener.initAnnee()

    //si l'annee change
    selectTag.addEventListener('change', () => {
        functionListener.initMoisSiAnneeChange()
        functionListener.afficheJours()
        // functionListener.majFevrierJr()
    })

    selectTagMois.onchange = functionListener.afficheJours

    functionListener.remplissageStandard()

    //si on click sur la fleche avant ou arriere

    chevronFermant.onclick = functionListener.avanceMois
    chevronOuvrant.onclick = functionListener.reculeMois

    functionListener.miseAjourAnneeAuClickAvance()
    functionListener.miseAjourAnneeAuClickPrecedent()
    // functionListener.majFevrierJr()
}