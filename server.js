const express = require('express');
const bodyParser = require('body-parser')

const storage = require('node-persist');

var contadorPost = 0;
var contadorGet = 0;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/books', (req, res) => {

    async function ler(){
        await storage.init();
        const some = await storage.getItem('livros');
        res.send(some);
    }
    ler();
    
});
//-----------------------------------------

app.get('/log', (req, res) => {
    async function lerLog(){
        await storage.init();
        const some = await storage.getItem('nGetPost');
        res.send(some);
    }
    lerLog();
})


app.post('/books', (req, res) => {
    const newBook = req.body;

    let bookId = newBook.ID;
    let bookName = newBook.name;
    let bookAuthor = newBook.author;

    contadorPost++;
    
    async function gravaGetPost(){
        await storage.init();
        if(!await storage.getItem('nGetPost')){
            await storage.setItem('nGetPost', [{requisicoesGet: contadorGet, requisicoesPost: contadorPost}]);
            
        }
        await storage.updateItem('nGetPost', [{requisicoesGet: contadorGet, requisicoesPost: contadorPost}]);        
    }




    async function gravar(){
        
        await storage.init();

        //se nao existir algum arquivo ele cria um e seta com os dados do post
        if(!await storage.getItem('livros')){
            await storage.setItem('livros', [{ID: bookId, name: bookName, author: bookAuthor}]);
            res.send('Bood Added');
            return;
        }
        
        //se existir ele verifica se o ID que esta sendo enviado no post existe, se existir
        //ele nao permite a gravação.
        const array = await storage.getItem('livros');
        if(array.findIndex(b => b.ID === bookId) !== -1){
            res.status(500).send('Existing book ID');
            return;
        }else{
            //se a verificação não encontrar o ID ele grava o livro no arquivo            
            const livros = await storage.getItem('livros')
            livros.push({ID: bookId, name: bookName, author: bookAuthor});
            await storage.updateItem('livros', livros);
            res.send('Book Added');
            return;   
            }   

    }
    gravaGetPost();
    gravar().catch(console.log);

});





//------------------------------

app.get('/books/:bookId', (req, res) => {
    contadorGet++;

    async function gravaGetPost(){
        await storage.init();
        if(!await storage.getItem('nGetPost')){
            await storage.setItem('nGetPost', [{requisicoesGet: contadorGet, requisicoesPost: contadorPost}]);
            
        }
        await storage.updateItem('nGetPost', [{requisicoesGet: contadorGet, requisicoesPost: contadorPost}]);        
    }
    gravaGetPost();





    res.send('Retornaria os livros por ID');


    // const book = books.find(b => b.ID === bookId);
    // if (!book) {
    //     res.status(500).send('Invalid book ID');
    //     return;
    // }

    // res.send(book);
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})