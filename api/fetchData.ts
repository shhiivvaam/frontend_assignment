import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { table } = req.query;

    if (!table) {
        return res.status(400).json({ error: "Table name is required" });
    }

    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: Number(process.env.DB_PORT),
        ssl: {
            rejectUnauthorized: true,
            // ca: process.env.DB_SSL_CA,
            ca: fs.readFileSync('./data/ca.pem').toString()
        },
    });

    try {
        await client.connect();

        const validTables = ["sheet1", "sheet2", "sheet3"];
        if (!validTables.includes(table as string)) {
            return res.status(400).json({ error: "Invalid table name" });
        }

        const result = await client.query(`SELECT * FROM "${table}"`);
        await client.end();

        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: "Database error", details: error });
    }
}
