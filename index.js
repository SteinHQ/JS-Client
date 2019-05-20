const readSheet = require("./src/read"),
  appendRow = require("./src/append"),
  deleteRows = require("./src/delete"),
  editRows = require("./src/edit");

function SteinStore(storageURL) {
  this.url = storageURL.endsWith("/") ? storageURL : storageURL + "/";
}

SteinStore.prototype.read = function(
  sheetName,
  { limit, offset, search } = {}
) {
  return readSheet(this.url, sheetName, { limit, offset, search });
};

SteinStore.prototype.append = function(sheetName, rows) {
  return appendRow(this.url, sheetName, rows);
};

SteinStore.prototype.edit = function(sheetName, { search, set, limit }) {
  return editRows(this.url, sheetName, { search, set, limit });
};

SteinStore.prototype.delete = function(sheetName, { search, limit }) {
  return deleteRows(this.url, sheetName, { search, limit });
};

module.exports = SteinStore;
