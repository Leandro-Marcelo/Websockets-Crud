require("dotenv").config();

const config = {
    /* ********************************* Ports *******************************/
    port: process.env.PORT || 4000,

    /* *********************************** MongoDB *******************************/
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DD_HOST,
    db_name: process.env.DB_NAME,
};

module.exports = config;
