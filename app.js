const express = require('express');
const app = express();
const port = 5501;
const host = '127.0.0.1';

// Хранилище 
const keywordsToUrls = {
  'apple' : ['https://www.svgrepo.com/show/506709/apple.svg', 'https://www.svgrepo.com/show/489696/apple.svg'],
  'pear': ['https://www.svgrepo.com/show/402306/pear.svg', 'https://www.svgrepo.com/show/227262/pear.svg'],
  'grape' : ['https://www.svgrepo.com/show/489688/grape.svg', 'https://www.svgrepo.com/show/384969/grapes-fruit-emoj-symbol-food.svg']

};

app.use(express.static('public'));

app.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const urls = keywordsToUrls[keyword];
  if (urls) {
    res.json(urls);
  } else {
    res.status(404).send('Ключевое слово не найдено');
  }
});

app.listen(port, host, () => {
  console.log(`Сервер запущен по адресу: http://${host}:${port}`);
});

app.get('/download/:url', async (req, res) => {
  const url = req.params.url;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const content = await response.text();
      res.send(content);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});