import type { APIRoute } from 'astro';
import { MongoClient, ServerApiVersion } from 'mongodb';

export const prerender = false;

const uri = import.meta.env.MONGODB_URI; // Vercelの環境変数から取得

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const POST: APIRoute = async ({ request }) => {
  if (!uri) {
    return new Response(JSON.stringify({ message: 'MongoDB URI is not configured.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    await client.connect();
    const database = client.db('ludo_tech_applications'); // あなたのデータベース名に置き換えてください
    const applications = database.collection('applications'); // 応募データを保存するコレクション名

    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const motivation = formData.get('motivation');
    // CVファイルは直接保存せず、ファイル名や保存場所の参照を保存する形が一般的です。
    // 今回は、CVファイルは受け取らず、後で対応を検討します。

    if (!name || !email || !motivation) {
      return new Response(JSON.stringify({ message: 'Missing required fields.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const result = await applications.insertOne({
      name,
      email,
      motivation,
      submittedAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Application submitted successfully!', insertedId: result.insertedId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to submit application:', error);
    return new Response(JSON.stringify({ message: 'Failed to submit application.', error: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await client.close();
  }
}; 