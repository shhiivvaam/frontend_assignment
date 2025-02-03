const { Client } = require("pg");
const xlsx = require("xlsx");
const fs = require("fs");
const pg = require('pg');
const url = require('url');
require("dotenv").config();

// const filePath = "./data/data.xlsx";
const filePath = "./data/ComparisonSheet.xlsx";
// const filePath = "./data/CustomersDeviceSheet.xlsx";
// const filePath = "./data/ProductsSheet.xlsx";
const workbook = xlsx.readFile(filePath);

const sheets = workbook.SheetNames;

// const client = new Client({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT || 5432
// });

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 13051,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./data/ca.pem').toString()
    },
};

const client = new pg.Client(config);

async function connectAndQuery() {
    client.connect(function (err) {
        if (err)
            throw err;
        client.query("SELECT VERSION()", [], function (err, result) {
            if (err)
                throw err;

            console.log(result.rows[0].version);
            client.end(function (err) {
                if (err)
                    throw err;
            });
        });
    });
}

// const connectionString = process.env.DATABASE_URL;

// const client = new Client({
//     connectionString: connectionString,
// });

async function insertData() {
    await client.connect();
    // connectAndQuery();
    console.log("Connected to Database✅");

    for (const sheetName of sheets) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        console.log(`Inserting data into table: ${sheetName}`);

        for (const row of jsonData) {
            const keys = Object.keys(row);
            const values = Object.values(row);

            await client.query(`
        CREATE TABLE IF NOT EXISTS ${sheetName} (
            ${keys.map((key) => `"${key}" TEXT`).join(",")}
        );
    `);

            const query = `
        INSERT INTO ${sheetName} (${keys.map((key) => `"${key}"`).join(",")})
        VALUES (${values.map((_, i) => `$${i + 1}`).join(",")});
    `;

            await client.query(query, values);
        }
    }

    console.log("Data inserted successfully ✅");
    await client.end();
}

insertData().catch(console.error);