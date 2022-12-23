migrate((db) => {
  const collection = new Collection({
    "id": "6p1q6qwm56no295",
    "created": "2022-12-22 20:21:02.746Z",
    "updated": "2022-12-22 20:21:02.746Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zmk5zmeu",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 160,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ridg0ekb",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6p1q6qwm56no295");

  return dao.deleteCollection(collection);
})
