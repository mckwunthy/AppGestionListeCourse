/*nous traitons specifiquement la validation des donnees saisie dans le formulaire d'ajout de liste*/

/*variables*/
var formRegister = document.forms['listForm']
var listeInput = document.forms[0]['listeInput']
var addBt = document.querySelector('.add-bt')
var check = {}

var listData = {}

/*listenerFunction: comprend les fonctions qui valide les différents champs du formulaire*/
var listenerFunction = {

    checkList: (ev) => {
        var input = ev.target
        var content = input.value
        var error = false
        if (!content) {
            error = true
        } else if (!/^[a-zA-Z ]{3,30}$/.test(content)) {
            error = true
        }

        if (error) {
            check = { ...check, title: false }
            // document.getElementById('title').classList.contains('wrong') ? null : document.getElementById('title').classList.add('wrong')
        } else {
            check = { ...check, title: true }
            var date = new Date()
            var dateCreation = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " à " + date.getHours() + "H" + date.getMinutes()

            listData = { ...listData, title: content, createdAt: dateCreation }
            // document.getElementById('title').classList.contains('correct') ? null : document.getElementById('title').classList.add('correct')
        }

    }
}

/*verifons si tous les elements du formulaire sont valide avant d'autoriser leur enregistrement*/
var checkFormValidity = () => {
    var result = true
    if (formRegister) {
        if (Object.keys(check).length === 1) {
            for (const key in check) {
                const value = check[key];
                result = result && value
                if (!result) return result
            }
            return result
        }
    }
    return false
}


/*les evenements*/
var setupListeners = () => {
    listeInput.onkeyup = listenerFunction.checkList
}