const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { PORT, DB_SYNC } = require("./config/serverConfig");
const db = require("./models/index");
const apiRoutes = require("./routes/index");

const server = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/api",apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server Started on PORT ${PORT}`);

        if(DB_SYNC){
            db.sequelize.sync({alter: true});
        }

    })

}

server();