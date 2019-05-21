const readSheet = require("./src/read"),
  appendRow = require("./src/append"),
  deleteRows = require("./src/delete"),
  editRows = require("./src/edit");

function SteinStore(storageURL) {
  this.url = storageURL.endsWith("/") ? storageURL : storageURL + "/";
}

SteinStore.prototype.read = function(
  sheetName,
  { limit, offset, search, authentication } = {}
) {
  return readSheet(this.url, sheetName, {
    limit,
    offset,
    search,
    authentication
  });
};

SteinStore.prototype.append = function(
  sheetName,
  rows,
  { authentication } = {}
) {
  return appendRow(this.url, sheetName, rows, { authentication });
};

SteinStore.prototype.edit = function(
  sheetName,
  { search, set, limit, authentication }
) {
  return editRows(this.url, sheetName, { search, set, limit, authentication });
};

SteinStore.prototype.delete = function(
  sheetName,
  { search, limit, authentication }
) {
  return deleteRows(this.url, sheetName, { search, limit, authentication });
};

module.exports = SteinStore;
