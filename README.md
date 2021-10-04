#### Subindo o servidor
  1. Clone/Baixe este repositório na sua máquina;
  2. Abra o terminal na raiz da pasta do projeto e rode o comando *``` yarn install```*  ou ainda *``` npm install```* para instalar as dependências do projeto;
  3. Rode o comando *``` yarn dev ```* ou *``` npm run dev ```* para subir o servidor express;
  4. Pronto, seu servidor backend estará no ar e pronto pra ser acessado no endereço "http://localhost:3333" ou na porta setada no arquivo *``` .env ```*.

## Rotas e Parâmetros

#### /login
```
- Verbo: POST
- Rota para realizar login na aplicação;
- Parâmetros: nenhum;

  body {
    email: string,
    password: string
  }

- Retorno: um objeto com um novo token JWT;
```

#### /users
```
- Verbo: GET
- Rota para visualizar todas os Users cadastrados;
- Parâmetros: nenhum;
- Retorno: um array de Users ou um array vazio;
```

#### /users
```
- Verbo: POST
- Rota para cadastrar um novo User;
- Parâmetros: nenhum;

  body {
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
  }

- Retorno: um objeto com os dados do novo User cadastrado;
```

#### /user/:id
```
- Verbo: PUT
- Rota para alterar/atualizar um User;
- Parâmetros: id(route param);

  body {
    name?: string,
    email?: string,
    phone?: string,
    password?: string,
  }

- Retorno: um objeto com os novos dados do User alterado;
```


## Tecnologias Utilizadas no Projeto

| **Backend**|
|----------- |
| *NodeJS*   |
| *Express*    |
| *BcryptJS*    |
| *Eslint*     |
| *Nodemon*     |
| *Yup*     |
| *UUDIV4*     |
| *JWT*    |
