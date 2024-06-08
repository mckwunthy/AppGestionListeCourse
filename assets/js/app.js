import { addList, getAllList, deleteList } from "./script.js"

window.onload = async () => {
    setupListeners()

    //ajout d'une liste : si click sur bt ajout && checkFormValidity ==true
    var addBt = document.querySelector('.add-bt')
    addBt.onclick = async () => {
        if (checkFormValidity()) {
            await addList(listData)
            window.location.reload()
        }
    }

    //on affiche la liste des taches à partir des donnees sauvegardees dans indexDB
    var listDataGet = await getAllList()

    let articles = ""

    if (listDataGet.length) {
        listDataGet.forEach(list => {
            articles += `
                        <div class="article" id="${list._id}" draggable="true">
                            <div class="delete-article" data-id="${list._id}">delete</div>
                            <div class="article-buy flex flex-column gap-5 aic jcc">
                                <i class="fa-regular fa-square"></i>
                                <i class="fa-solid fa-square-check none"></i>
                                <div class="buy-text">acheté</div>
                            </div>
                            <div class="article-content flex-1 flex flex-column gap-5 marg-t-15">
                                <div class="article-title">${list.title}</div>
                                <div class="article-createAt">${list.createdAt}</div>
                            </div>
                        </div>
            `
        });

        document.querySelector('.app-body').innerHTML = articles
    }

    if (!listDataGet.length) {
        document.querySelector('.app-body').innerHTML = "<div>aucunes donnees à afficher</div>"
    }
    //suppression d'un article
    var deleteBt = document.querySelectorAll('.delete-article')
    for (let index = 0; index < deleteBt.length; index++) {
        const articleClicked = deleteBt[index];
        articleClicked.onclick = async (event) => {
            let id = event.target.dataset.id
            let listToDelete = listDataGet.find(t => t._id == id)
            deleteList(listToDelete._id)
            window.location.reload()
        }
    }

    //marquage des articles achetés
    let articleBuy = document.querySelectorAll('.article-buy')
    for (let index = 0; index < articleBuy.length; index++) {
        const element = articleBuy[index];
        element.onclick = () => {
            element.children[0].classList.toggle('none')
            element.children[0].classList.toggle('achete')
            element.children[1].classList.toggle('none')
            element.children[1].classList.toggle('achete')
            element.children[2].classList.toggle('achete')
            element.parentNode.classList.toggle('bg-c')
        }
    }

    //vider toutes la liste = supprimer tout
    var emptyAll = document.querySelector('.empty-all')
    emptyAll.onclick = async (event) => {
        for (let index = 0; index < listDataGet.length; index++) {
            const articleClicked = listDataGet[index];
            let listToDelete = listDataGet.find(t => t._id == articleClicked._id)
            deleteList(listToDelete._id)
            window.location.reload()
        }
    }

    //drag event management
    let articlesToDrag = document.querySelectorAll('.article')
    //add drag event start
    for (let index = 0; index < articlesToDrag.length; index++) {
        const element = articlesToDrag[index];
        element.addEventListener('dragstart', (event) => {
            let newTarget
            if (!event.target.id) {
                newTarget = event.target.closest('.article')
            } else {
                newTarget = event.target
            }
            event.dataTransfer.setData("number", newTarget.id)
        })
    }

    //drag : qd on survole
    let startBox = document.querySelector('.start')

    startBox.addEventListener('dragover', (event) => {
        event.preventDefault()
        event.target.classList.add('over')
    })

    startBox.addEventListener('dragleave', (event) => {
        event.preventDefault()
        event.target.classList.remove('over')
    })

    startBox.addEventListener('drop', (event) => {
        event.preventDefault()
        if (event.target.classList.contains('app-body')) {
            let itemId = event.dataTransfer.getData("number")
            let item = document.getElementById(itemId)
            event.target.appendChild(item)
            event.target.classList.remove("over")
        } else {
            let newTarget = event.target.closest('.app-body')
            let itemId = event.dataTransfer.getData("number")
            let item = document.getElementById(itemId)
            newTarget.appendChild(item)
            event.target.classList.remove("over")
        }
    })

}