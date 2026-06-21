const MOVIEBOX_API_BASE_URL = process.env.MOVIEBOX_API_BASE_URL;
const MOVIEBOX_API_KEY = process.env.MOVIEBOX_API_KEY;

function normalizeQueryValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  return String(value);
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const path = req.query?.path;
  if (!path) {
    res.status(400).json({ error: 'Query parameter "path" is required.' });
    return;
  }

  if (!MOVIEBOX_API_BASE_URL || !MOVIEBOX_API_KEY) {
    res.status(500).json({
      error: 'Server configuration missing MovieBox environment variables.'
    });
    return;
  }

  try {
    const targetUrl = new URL(path.toString(), MOVIEBOX_API_BASE_URL);

    Object.entries(req.query || {})
      .filter(([key]) => key !== 'path')
      .forEach(([key, value]) => {
        targetUrl.searchParams.append(key, normalizeQueryValue(value));
      });

    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: `Bearer ${MOVIEBOX_API_KEY}`,
      'x-api-key': MOVIEBOX_API_KEY
    };

    const response = await fetch(targetUrl.toString(), {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined
    });

    const text = await response.text();
    const payload = text ? JSON.parse(text) : {};

    if (!response.ok) {
      res.status(response.status).json({
        error: payload?.error || response.statusText,
        details: payload
      });
      return;
    }

    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
}
