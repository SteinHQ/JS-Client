# Stein JavaScript Client

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e9bb8398b72743f3b7b04e20283194b5)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=SteinHQ/JS-Client&utm_campaign=Badge_Grade)

This JavaScript client helps you interact with the Stein API, both in the browser and in Node.js setups.

## Installation

### HTML

To setup the client on your front-end, add this external script in the `<head>` of your page.

```html
<script src="https://unpkg.com/stein-js-client"></script>
```

### Node.js

To install the package via NPM, run

```bash
npm install stein-js-client
```

And import it in your files.

```javascript
const SteinStore = require("stein-js-client");
```

## Initialise - Create a store

A store is a reference to a spreadsheet API.

Each store is initialised by providing the API URL.

```javascript
const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/5cca0542e52a3545102c1665"
);
```

You can now interact with the API using the methods on the store.

## Read & Search Data

#### `store.read(sheetName, {limit, offset, authentication, search})`

### Valid Options

| Parameter      | Description                                        | Format               | Requirement |
| -------------- | -------------------------------------------------- | -------------------- | ----------- |
| limit          | Maximum number of rows to be returned              | Number               | Optional    |
| offset         | Number of rows to be skipped (from the start)      | Number               | Optional    |
| authentication | Basic HTTP Authentication , if required by the API | {username, password} | Optional    |
| search         | The column values to search for                    | {column: value, ...} | Optional    |
|                |                                                    |                      |             |

### Return Value

This returns a promise which resolves providing an array of rows, with each row in the format `{column: value}`. On error, the promise rejects with the message.

```javascript
const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/5cc158079ec99a2f484dcb40"
);

store
  .read("Sheet1", { limit: 1, offset: 2, search: { author: "Shiven Sinha" } })
  .then(data => {
    console.log(data);
  });
```

## Add Rows

#### `store.append(sheetName, rows, {authentication})`

### Valid Options

| Parameter      | Description                                        | Format               | Requirement |
| -------------- | -------------------------------------------------- | -------------------- | ----------- |
| authentication | Basic HTTP Authentication , if required by the API | {username, password} | Optional    |
|                |                                                    |                      |             |

### Return Value

This returns a promise which resolves providing the updated range, e.g. `{ "updatedRange": "Sheet1!A6:D6" }`. On error, the promise rejects with the message.

```javascript
const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/5cc158079ec99a2f484dcb40"
);

store
  .append("Sheet2", [
    {
      title: "Awesome article",
      author: "Me!",
      content: "A brief summary",
      link: "blog.me.com/awesome-article"
    }
  ])
  .then(res => {
    console.log(res);
  });
```

## Update Rows

#### `store.edit(sheetName, {search, set, limit, authentication})`

### Valid Options

| Parameter      | Description                                        | Format               | Requirement |
| -------------- | -------------------------------------------------- | -------------------- | ----------- |
| search         | The column values to search for                    | {column: value, ...} | Required    |
| set            | The column values to set                           | {column: value, ...} | Required    |
| limit          | Maximum number of rows to be updated               | Number               | Optional    |
| authentication | Basic HTTP Authentication , if required by the API | {username, password} | Optional    |

### Return Value

This returns a promise which resolves providing the updated range, e.g. `{ "updatedRange": "Sheet1!A6:D6" }`. On error, the promise rejects with the message.

```javascript
const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/5cc158079ec99a2f484dcb40"
);

store
  .edit("Sheet1", {
    search: { author: "Shiven Sinha" },
    set: { title: "Currently Unavailable" }
  })
  .then(res => {
    console.log(res);
  });
```

## Delete Rows

#### `store.delete(sheetName, {search, limit, authentication})`

### Valid Options

| Parameter      | Description                                        | Format               | Requirement |
| -------------- | -------------------------------------------------- | -------------------- | ----------- |
| search         | The column values to search for                    | {column: value, ...} | Required    |
| limit          | Maximum number of rows to be updated               | Number               | Optional    |
| authentication | Basic HTTP Authentication , if required by the API | {username, password} | Optional    |

### Return Value

This returns a promise which resolves providing the updated range, e.g. `{ "updatedRange": "Sheet1!A6:D6" }`. On error, the promise rejects with the message.

```javascript
const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/5cc158079ec99a2f484dcb40"
);

store
  .delete("Sheet1", {
    search: { author: "Shiven Sinha" }
  })
  .then(res => {
    console.log(res);
  });
```

## Additional Guides

Find additional documentation and guides on [docs.steinhq.com](https://docs.steinhq.com).

## License

The Stein JavaScript client is [MIT licensed](./LICENSE).
