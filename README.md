<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

## Descrição
Este é um projeto está escrito em NodeJs usando a super tipagem do Typescript.

## Pre-Requisitos
### Banco De dados MySQL:
Esse sistema, foi desenvolvivo utilizando o banco de dados MySql na versão 8, certifique-se também de criar schema de banco de dados (em minha maquina local chama-se de flapper_system), certifique-se também de executar nesse schema o script de ddl disponivel em database/ddl.sql, 
certifique-se também de criar um usuario com senha para a conexão.
### NodeJs:
A versão do NodeJs utilizada foi a v14.17.5 junto com npm 6.14.14.
### Criando a conexão com o Banco de dados: 
acesse src/infra/modules/database/ConnectionConfiguration.ts, e altere as propriedades de username, password, database, host e port para a correspondencia com o seu setup local
### Certifique-se de que a porta para a api subir esteja disponivel:
a porta dessa aplicação é a 3000, caso não seja possivel usar essa porta isso pode ser configurado em src/main.ts
```
await app.listen(3000); // basta mudar para uma porta disponivel
```

## Instação

```bash
$ npm install
```

## Rodando a aplicação

```bash
# para rodar a aplicação
$ npm run start:dev
```

## Test

```bash
# Para rodar os testes
$ npm run test


# Para verificar a cobertura de codigo
$ npm run test:cov
```

### Considerações Sobre a arquitetura:
Está sendo empregada a arquitetura limpa, nesse sistema
sendo assim existe uma divisão em camadas do nosso sistema
* infra: Lida com a parte externa a nossa aplicação
    * api: Tudo aqui se refere as nossas requisições e respostas
        * controllers: a entidade http responsavel por lidar com a entrada de request e o retorno de responses
    * database: Tudo aqui se refere ao nosso banco de dados
        * entities: São as classes que serão mapeadas em tabelas do banco de dados
        *  repositories: São as classes responsaveis por lidar com as entidades e o banco de dados, seguindo a API desenvolvida pela equipe do TypeOrm 
    *  decorators: Um decorator é uma expressão que retorna uma função e pode receber um destino, um nome e um descritor de propriedade como argumentos. Você o aplica prefixando o decorador com um caractere @ e colocando-o bem no topo do que você está tentando decorar. Os decoradores podem ser definidos como uma classe, um método ou uma propriedade
    * filters: Um filtro servirá para lidar com uma exceção lançada durante a execução e transforma-lá em uma entidade de resposta HTTP
    * guards: Um guarda servirá para proteger determinada rota
    * interceptors: Um interceptador atua diretamente no fluxo de entrada ou saida da api (request/resposta) podendo modificar o objeto enviado ou recebido
    * modules: Aqui ficarão os arquivos para configuração da injeção de dependencias
* adapter: É a camada que faz a intermediação entre a nossa camada de infra e a nossa camada de negocio 'core'
    * connectors: Atuam como mediador entre as chamadas requeridas pelos casos de uso, e os metodos fornecidos pelos mesmo, bem como a adaptação de entidades em modelos e vice versa
    * services: Atuam respondendo as requisições impostas pelos controllers e delegando a responsabilidade para os cados de uso
* core: É a camada de negocio do sistema
    * interfaces: As classes dentro desta pasta definem como será o contrato implementado pelos usecases
    *  usecases: As classes de ação do sistema que implementam as interfaces, assim realizando o seus contratos
    * protocols: são interfaces que atuam mediando as requisições impostas pelos usecases, e o executor (connector) que irá trazer os dados necessarios para responde-lás
    * modelos: os modelos de negocio do sistema

### Sobre essa API:
Essa API tem 5 rotas
1. Criar um Usuario no sistema
2. Fazer login 
3. Criar uma cotação
4. Visualizar todas as cotações
5. Visualizar minhas cotações
6. 

Para explicar o funcionamento dela, vamos supor 2 usuarios, 'jenny' e 'rafael' que enviam cargas de um lugar para o outro, então
*Importante: Todas as rotas abaixo enviam e recebem json, por tanto deve-se configurar o header de cada requisição para aceitar e enviar json*
#### Jenny e Rafael criam um usuario no sistema
---
- Usuario: Jenny
- Request: [URL] [TIPO]
```
```
- Response:
```
```
---
- Usuario: Rafael
- Request: [URL] [TIPO]
```
```
- Response:
```
```

para a rota "user", como nas imagens abaixo:
#### Jenny Loga-se no sistema
---
- Usuario: Jenny
- Request: [URL] [POST]
```
```
- Response:
```
```
### Jenny Cria 2 Cotações
---
- Usuario: Jenny
- Request: [URL] [POST]
```
```
- Response:
```
```
---
- Usuario: Jenny
- Request: [URL] [POST]
```
```
- Response:
```
```
### Rafael Cria 1 Cotação:
---
- Usuario: Rafael
- Request: [URL] [POST]
```
```
- Response:
```
```
### Um usuario busca todas as cotações:
---
- Usuario: *
- Request: [URL] [GET]
```
```
- Response:
```
```
### Um usuario busca todas as cotações:
---
- Usuario: *
- Request: [URL] [GET]
```
```
- Response:
```
``` 
### Jenny busca todas as cotações:
---
- Usuario: jenny
- Request: [URL] [GET]
```
```
- Response:
```
``` 

### Rafael busca todas as cotações:
---
- Usuario: jenny
- Request: [URL] [GET]
```
```
- Response:
```
``` 

