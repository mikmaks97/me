const four_o_four = (req, res) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
  }
  // respond with json
  else if (req.accepts('json')) {
    res.send({ error: 'Not found' });
  }
  else {
    // default to plain-text. send()
    res.type('txt').send('Not found');
  }
}

module.exports = { four_o_four };
