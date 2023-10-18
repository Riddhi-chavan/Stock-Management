import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const query = request.nextUrl.searchParams.get("query");
  const uri = "mongodb+srv://riddhic164:riddhichavan@cluster0.9azx0hh.mongodb.net/";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('stock');
    const inventory = database.collection('inventory');

    const products = await inventory.aggregate([
      {
          $match: {
              $or: [
                  { slug: { $regex: query, $options: "i" } },
              ]
          }
      }
  ]).toArray();
  
 

    console.log(products);
    return NextResponse.json({  products , ok :true });
  } finally {
    await client.close();
  }
}



