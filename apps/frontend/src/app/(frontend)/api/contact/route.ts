import { NextResponse, type NextRequest } from 'next/server';

import MailerLite from '@mailerlite/mailerlite-nodejs';

import { contactFormSchema } from '@/components/contact/schema';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY!,
});

const newsletterGroupId = process.env.MAILERLITE_NEWSLETTER_GROUP!;
const volunteerGroupId = process.env.MAILERLITE_VOLUNTEER_GROUP!;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = contactFormSchema.parse(data);

    const parsedGroups = [];

    if (parsedData.newsletter) {
      parsedGroups.push(newsletterGroupId);
    }

    if (parsedData.join) {
      parsedGroups.push(volunteerGroupId);
    }

    // Add subscriber to MailerLite
    const params = {
      email: parsedData.email,
      fields: {
        name: parsedData.firstName,
        last_name: parsedData.lastName,
        z_i_p: parsedData.postcode || '',
      },
      groups: parsedGroups,
    };

    mailerlite.subscribers
      .createOrUpdate(params)
      .then(() => {
        console.log('Subscriber added/updated successfully');
      })
      .catch((error) => {
        console.error('Error adding/updating subscriber:', error);
      });

    return NextResponse.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing the form submission' },
      { status: 500 }
    );
  }
}
