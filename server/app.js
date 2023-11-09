
const express = require('express');
const cors = require('cors');
const BookDAO = require('./DAO/bookDAO');
const UserDAO = require('./DAO/userDAO');
const db = require('./connectionDB/db');

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cors());


// Маршрут для отримання списку книг
app.get('/api/books', async (req, res) => {
    console.log('Запит на отримання списку книг отримано');
    const books = await BookDAO.getAllBooks();
    //console.log('Книги, які відправляються:', books);
    res.setHeader('Content-Type', 'application/json');
    res.json(books);
});

app.post('/api/books', async (req, res) => {

    try {
        const newBook = await BookDAO.addBook(req.body);
        res.status(201).json(newBook);

    } catch (error) {
        console.error('Помилка додавання книги:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await BookDAO.deleteBook(id);
        res.json(deletedBook);

    } catch (error) {
        console.error('Помилка видалення книги:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Маршрут для оновлення існуючої книги
app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const updatedBookData = req.body;

    try {
        if (1===1) {

            const updatedBook = await BookDAO.updateBook(id, updatedBookData);
            res.json(updatedBook);
        } else {
            // Якщо користувач не є адміністратором, відправте помилку доступу заборонено
            res.status(403).json({ error: 'Доступ заборонено. Недостатні права.' });
        }
    } catch (error) {
        console.error('Помилка оновлення книги:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await UserDAO.authenticateUser(username, password);

    if (user) {
        res.json({ role: 'admin' });
    } else {
        res.status(401).json({ error: 'Неправильний логін або пароль' });
    }
});
app.get('/books/genre/:genre', async (req, res) => {
    const genre = req.params.genre;

    try {
        const books = await BookDAO.getBooksByGenre(genre);
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(8888, () => {
    console.log('Сервер запущено на порту 8888');
});
