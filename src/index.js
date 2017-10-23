import 'whatwg-fetch';
import restful, {fetchBackend} from 'restful.js';
import {readSheet} from './read';
import {searchSheet} from './search';
import {appendRow} from "./append";
import {editRows} from "./edit";

const api = restful('http://localhost/storage', fetchBackend(fetch));

class Store {
    constructor(storageId) {
        this.id = storageId;
    }

    read(sheetName, limit, offset) {
        return readSheet(api, this.id, sheetName, limit, offset);
    }

    search(sheetName, searchObj,  limit, offset) {
        return searchSheet(api, this.id, sheetName, searchObj, limit, offset);
    }

    append(sheetName, rows){
        return appendRow(api, this.id, sheetName, rows);
    }

    edit(sheetName, searchObj, setObj, limit){
        return editRows(api, this.id, sheetName, searchObj, setObj, limit);
    }
}

window.Store = Store;