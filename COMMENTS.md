## Processo de Desenvolvimento

Primeiramente, tive que idealizar como seria minha aplicação. Escolhi criar uma aplicação bem simples para gerenciamento de repositórios públicos do github. Nessa aplicação o usuário adiciona os repositórios públicos que desejar e então poderá visualizar em uma única tela seus pull requests em aberto, issues, branches ativas, colaboradores, etc.

A aplicação se divide uma duas páginas, uma `Home` onde você possui uma visão de algumas pendências existentes nos repositórios, e uma página `Repositories`, onde estão listados todos os repositórios adicionados e onde o usuário poderá visualizar cada um em detalhes, além de poder adicionar ou remover repositórios.

Como passo inicial, resolvi adotar o `create-react-app` para gerar meu boilerplate base do APP react e `express` como framework para meu servidor em `NodeJs`.

### Back-end

#### Estrutura de arquivos
```
|-- server
  |-- server.js  // arquivo de inicialização
  |-- routes.js  // rotas da api rest disponíveis para minha aplicação react
  |-- controller.js  // onde são realizadas as queries para a API graphql fornecida pelo Github
  |-- queries // pasta onde estão localizadas as queries graphql
```

Para a comunicação com a API graphql do GitHub utilizei a lib `node-github-graphql` e abriguei toda essa lógica no arquivo `controller.js`. Em seguida visando proterger minha `API_KEY`, adotei o lib `dotenv` apra gerenciar minhas variáveis de ambiente. Precisei também guardar o estado da minha aplicação (repositórios adicionados), resolvi então utilizar a sessão do usuário, tendo em vista de que se trata de uma aplicação somente para fins de seleção.

### Front-end

#### Estrutura de arquivos
```
|-- src
  |-- __mocks__   // MOCKs necessários para os testes
  |-- __tests__   // testes da aplicação
  |-- components  // componentes da aplciação
  |-- contexts    // contextos
    |-- RepositoryContext.js  // contexto dos repositórios
    |-- ToastContext.js  // contexto do toast
  |-- images      // imagens usadas na aplicação
  api.js          // modulo que realiza as requisições para a API rest
  index.js        // arquivo de inicialização
  styles.css      // css da aplicação
  tachyons.css    // arquivo base do framework
```

Para a estilização da aplicação tentei utilizar ao máximo o framework `tachyons`. 

Durante o desenvolvimento precisei de algo para gerenciar o estado da aplicação e para isso utilizei a 'nova' funcionalidade do react 16.3, a `Context API`.

### Deploy

Para o deploy da demo utilizei a PasS `Heroku`, cujo setup já estava configurado desde o início.

Link da aplicação em produção ->  https://github-overview.herokuapp.com



### Comandos Úteis

``` 
  yarn test           // run test
  yarn run server     // run server
  yarn start          // run react app
``` 
