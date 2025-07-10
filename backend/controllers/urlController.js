const { nanoid } = require('nanoid');
const db = require('../db');
const cache = require('../services/cacheService');

// Shorten URL
exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  const short_code = nanoid(6);
  const shortUrl = `http://localhost/${short_code}`;

  try {
    await db.execute(
      'INSERT INTO urls (short_code, long_url) VALUES (?, ?)',
      [short_code, longUrl]
    );
    await cache.set(short_code, longUrl);
    res.json({ shortUrl });
  } catch (err) {
    console.error('Error shortening URL:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Redirect to original URL
exports.redirectUrl = async (req, res) => {
  const { code } = req.params;

  try {
    let longUrl = await cache.get(code);

    if (!longUrl) {
      const [rows] = await db.execute(
        'SELECT long_url FROM urls WHERE short_code = ?',
        [code]
      );

      if (!rows.length) {
        return res.status(404).send('Not Found');
      }

      longUrl = rows[0].long_url;
      await cache.set(code, longUrl);
    }

    res.redirect(longUrl);
  } catch (err) {
    console.error('Error during redirection:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
