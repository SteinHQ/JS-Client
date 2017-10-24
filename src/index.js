import 'whatwg-fetch';
import {readSheet} from './read';
import {searchSheet} from './search';
import {appendRow} from "./append";
import {editRows} from "./edit";
import {deleteRows} from "./delete";

const url = 'http://localhost/storage/';

class Store {
    constructor(storageId) {
        this.id = storageId;
    }

    read(sheetName, limit, offset) {
        return readSheet(url, this.id, sheetName, limit, offset);
    }

    search(sheetName, searchObj,  limit, offset) {
        return searchSheet(url, this.id, sheetName, searchObj, limit, offset);
    }

    append(sheetName, rows){
        return appendRow(url, this.id, sheetName, rows);
    }

    edit(sheetName, searchObj, setObj, limit){
        return editRows(url, this.id, sheetName, searchObj, setObj, limit);
    }

    delete(sheetName, searchObj, limit){
        return deleteRows(url, this.id, sheetName, searchObj, limit);
    }
}

window.Store = Store;