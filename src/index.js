import {readSheet} from './read';
import {appendRow} from './append';
import {editRows} from './edit';
import {deleteRows} from './delete';

class Store {
  constructor(storageURL) {
    this.url = storageURL.endsWith('/') ? storageURL : storageURL + '/';
  }

  read(sheetName, {limit, offset, search}) {
    return readSheet(this.url, sheetName, {limit, offset, search});
  }

  append(sheetName, rows) {
    return appendRow(this.url, sheetName, rows);
  }

  edit(sheetName, {search, set, limit}) {
    return editRows(this.url, sheetName, {search, set, limit});
  }

  delete(sheetName, {search, limit}) {
    return deleteRows(this.url, sheetName, {search, limit});
  }
}

window.Store = Store;