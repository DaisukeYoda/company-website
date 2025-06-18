import type { APIRoute } from 'astro';
import { MongoClient, ServerApiVersion } from 'mongodb';

export const prerender = false;

const uri = import.meta.env.MONGODB_URI;

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

    const database = client.db('ludo_tech_inquiries');
    const inquiries = database.collection('inquiries');

    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const service = formData.get('service');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Missing required fields (Name, Email, Message).', fields: { name, email, message } }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const result = await inquiries.insertOne({
      name,
      email,
      company: company || null,
      service: service || null,
      subject: subject || null,
      message,
      submittedAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Inquiry submitted successfully!', insertedId: result.insertedId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    return new Response(JSON.stringify({ message: 'Failed to submit inquiry.', error: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}; 