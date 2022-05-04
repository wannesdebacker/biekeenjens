const { SiteClient } = require('datocms-client');

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    console.log('POST request received: checkin');

    try {
      const { body } = req;
      const { naam, dag, genodigden, honing } = body;

      if (honing) {
        return res.status(200).json({ succes: true, body });
      }

      if (naam !== '' && dag !== '' && genodigden !== '') {
        async function addCheckin() {
          const client = new SiteClient(process.env.NEXT_DATOCMS_API_TOKEN);
          const record = await client.items.create({
            itemType: '218135', // model ID checkin
            naam,
            dag,
            genodigden,
          });

          return record;
        }

        addCheckin();

        return res.status(200).json({ succes: true, body });
      }

      return res.status(400).json({ message: 'malformed request' });
    } catch (error) {
      console.warn('Error:', error);
      return res.status(400).json({ message: 'error' });
    }
  } else {
    // Handle any other HTTP method
    return res.status(200).json({ message: 'Hi there, nice to meet you!' });
  }
}
