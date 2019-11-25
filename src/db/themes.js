import Dexie from "dexie";

    // connect
const db = new Dexie("themes");

db.version(1).stores({
    themes: "++id,date,name,html,css,layout"
});


// fetch everything in the database
export async function fetchAll() {
    var themes = await db.themes.toArray();

    return themes;
}

// fetch a specific profile
export async function fetchProfileById(index) {
    var themes = await db.themes.where({"id": parseInt(index)}).toArray();

    return themes;
}


// add profile
export async function addTheme(data) {
    var id = await db.themes.put(data);
    return id;
}


// edit profile
export async function editTheme(index, data) {
    var resp = await db.themes.where({"id": parseInt(index)}).modify(data);

    return resp;
}


// delete profile
export async function deleteTheme(index) {
    // fetch the track info, move to a second table, then delete the old entry
    db.themes.where({"id": parseInt(index)}).delete();
    return true;
}
