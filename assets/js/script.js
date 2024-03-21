/*dans ce fichier nous eclatons toutes les methodes de la class necessaires pour notre programme*/
/*ensuite nous exportons ces methodes pour les rendre accessibles dans d'autres fichiers*/
/*la ligne 7 : nous creons notre bdd database nommee moviedb avec une table listTask*/

import { LocalDatabase } from "./LocalDatabase.js";

const database = new LocalDatabase('listdb', ['listTask'], 1)

export const addList = async (listData) => {
    await database.addData('listTask', listData)
}

export const getAllList = async () => {
    return await database.getAllData('listTask')
}

export const deleteList = async (key) => {
    await database.deleteData('listTask', key)
}


