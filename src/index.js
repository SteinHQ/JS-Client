import 'whatwg-fetch';
import {readSheet} from './read';
import {searchSheet} from './search';
import restful, {fetchBackend} from 'restful.js';

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
}

window.Store = Store;