const axios = require('axios').default;

(async () => {

    await axios.post('http://localhost:3000/books', { //Adicionando livro
        ID: 3,
        name: 'My Boook',
        author: 'Me and only me'
    })
    .then((res) =>{
        console.log(res.data);
    })
    .catch(err =>{
        console.log(err.response.data);
    });

    await axios.post('http://localhost:3000/books', { //Adicionando um novo livro
        ID: 4,
        name: 'Um novo Livro',
        author: 'Lucas'
    })
    .then((res) =>{
        console.log(res.data);
    })
    .catch(err =>{
        console.log(err.response.data);
    });

    await axios.post('http://localhost:3000/books', { //Adicionando um livro com id existente
        ID: 4, 
        name: 'Um livro com ID existente',
        author: 'Lucas'
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.response.data);
    });

    const res = await axios.get('http://localhost:3000/books');
    console.log(res.data);

})();

(async () => {

    const busca1 = await axios.get('http://localhost:3000/books/1');
    const busca2 = await axios.get('http://localhost:3000/books/2');
    const busca3 = await axios.get('http://localhost:3000/books/3');
    const busca4 = await axios.get('http://localhost:3000/books/4');
    const busca5 = await axios.get('http://localhost:3000/log');

    console.log(busca1.data);
    console.log(busca2.data);
    console.log(busca3.data);
    console.log(busca4.data);
    console.log(busca5.data);

})();