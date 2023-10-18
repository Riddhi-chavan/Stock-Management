import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://riddhic164:riddhichavan@cluster0.9azx0hh.mongodb.net/";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('productDB');
    const salesCollection = database.collection('products');

    const query = {};
    const document = await salesCollection.findOne(query);

    console.log(document);
    return NextResponse.json({ "A": 32, document });
  } finally {
    await client.close();
  }
}
