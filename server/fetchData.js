const { Client } = require("pg");
const xlsx = require("xlsx");
const fs = require("fs");
const pg = require('pg');
const url = require('url');
require("dotenv").config();

const filePath = "./data/data.xlsx";
// const filePath = "./data/ComparisonSheet.xlsx";
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

async function fetchData() {
    try {
        await client.connect();
        console.log("Connected to Database ✅");

        let sheetCounter = 1;

        for (const _ of sheets) {
            const tableName = `sheet${sheetCounter}`;
            sheetCounter++;

            console.log(`Fetching data from table: ${tableName}`);

            const tableExistsQuery = `
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = '${tableName}'
                );
            `;
            const tableExists = await client.query(tableExistsQuery);
            if (!tableExists.rows[0].exists) {
                console.warn(`Table ${tableName} does not exist. Skipping...`);
                continue;
            }

            // const res = await client.query(`SELECT * FROM ${sheetName} LIMIT 10;`);
            const res = await client.query(`SELECT * FROM ${tableName} LIMIT 10;`);
            console.table(res.rows);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        await client.end();
        console.log("Database connection closed ✅");
    }
}

fetchData().catch(console.error);