## Booking Service

- `npx sequelize init`

- Make new file `config.json` in `src/config` and Add this.
```
{
    "development": {
    "username": <DB USER NAME>,
    "password": <DB PASSWORD>",
    "database": <DATABASE NAME>,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

- Create New Database Using `npx sequelize db:create`.

- Creating New Model
`npx sequelize model:generate --name Booking --attributes userId:integer,flightId:integer,status:enum `

- Migration of Database
`npx sequelize db:migrate`

- Migrations Shows Incremental changes in Project !!
