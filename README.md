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


Para explicar o funcionamento dela, vamos supor 2 usuarios, 'jenny' e 'rafael' que enviam cargas de um lugar para o outro, então
*Importante: Todas as rotas abaixo enviam e recebem json, por tanto deve-se configurar o header de cada requisição para aceitar e enviar json*
#### Jenny e Rafael criam um usuario no sistema
---
- Usuario: Jenny
- Request: [http://localhost:3000/auth/create] [POST]
```json
{
	"username": "jenny",
	"password": "1234"
}
```
- Response:
```json
{
  "id": "5262ac93-26aa-4818-86aa-c7dd7c70b068",
  "createdAt": "2021-08-19T14:26:46.000Z",
  "updatedAt": "2021-08-19T14:26:46.000Z"
}
```
---
- Usuario: Rafael
- Request: [http://localhost:3000/auth/create] [POST]
```json
{
	"username": "rafael",
	"password": "1234"
}
```
- Response:
```json
{
  "id": "5362bc93-14aa-4818-86aa-c7dd7c70b068",
  "createdAt": "2021-08-19T14:26:56.000Z",
  "updatedAt": "2021-08-19T14:26:56.000Z"
}
```
#### Jenny Loga-se no sistema
---
- Usuario: Jenny
- Request: [http://localhost:3000/auth/login] [POST]
```json
{
	"username": "jenny",
	"password": "1234"
}
```
- Response:
```json
{
"token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjdlYWI3NGE2LWNhYjctNDYwOS1iZTIwLWQzYzE4MDc0MzMyZCIsInVzZXJuYW1lIjoicmFmYWVsIn0.lYdPI2_2XOmcVC2MVgNZrDz2XSUaWf6E8jvPKMsnhkI",
  "user": {
    "id": "7eab74a6-cab7-4609-be20-d3c18074332d",
    "username": "jenny"
  }
}
```
### Jenny Cria 2 Cotações
---
- Usuario: Jenny
- Configure O Header "Authorization: Bearer token"
onde *token* é o token retornado após o login de Jenny
- Request: [http://localhost:3000/position-quotation] [POST]
```json
{
	"load": {
		"weightKG": 1,
		"heightCM": 10,
		"widthCM": 100,
		"dephtCM": 24
	},
	"customer": {
		"name": "rafael",
		"phone": "+55839988281",
		"email": "rafael@gmail.com"
	},	
	"transport": {
		"destinationCity": "Grande São",
		"originCity": "Paulo Pessoa"
	}
}
```
- Response:
```json
{
  "id": "ce01fef5-006c-473e-b2a9-47e2632fd253",
  "createdAt": "2021-08-19T16:26:45.000Z",
  "updatedAt": "2021-08-19T16:26:45.000Z"
}
```
---
- Usuario: Jenny
- Configure O Header "Authorization: Bearer token"
onde *token* é o token retornado após o login de Jenny
- Request: [http://localhost:3000/position-quotation] [POST]
```json
{
	"load": {
		"weightKG": 1,
		"heightCM": 10,
		"widthCM": 100,
		"dephtCM": 12 
	},
	"customer": {
		"name": "jenny",
		"phone": "+55839988281",
		"email": "jenny@gmail.com"
	},	
	"transport": {
		"destinationCity": "Grande São",
		"originCity": "Paulo Joao"
	}
}
```
- Response:
```json
{
  "id": "5babce51-9f8a-48ce-8913-ebecd6a1bf1a",
  "createdAt": "2021-08-19T16:27:33.000Z",
  "updatedAt": "2021-08-19T16:27:33.000Z"
}
```
### Rafael Cria 1 Cotação:
---
- Usuario: Rafael
- Configure O Header "Authorization: Bearer token"
onde *token* é o token retornado após o login de Rafael
- Request: [http://localhost:3000/position-quotation] [POST]
```json
{
	"load": {
		"weightKG": 1,
		"heightCM": 10,
		"widthCM": 100,
		"dephtCM": 6
	},
	"customer": {
		"name": "rafael",
		"phone": "+55839988281",
		"email": "rafael@gmail.com"
	},	
	"transport": {
		"destinationCity": "Grande São",
		"originCity": "Paulo Joao"
	}
}
```
- Response:
```json
{
  "id": "6697ca45-e2e0-444d-aa99-22294777c5bc",
  "createdAt": "2021-08-19T16:33:16.000Z",
  "updatedAt": "2021-08-19T16:33:16.000Z"
}
```

### Um usuario busca todas as cotações:
---
- Usuario: *
- Request: [http://localhost:3000/position-quotation] [GET]
```
no body
```
- Response:
```json
[
  {
    "id": "282cfe74-43b3-4a15-a416-c6cbd95d0787",
    "load": {
      "id": "910c43b1-364c-44cf-bc15-d1be14d52369",
      "dephtCM": "12",
      "widthCM": "100",
      "heightCM": "10",
      "weightKG": "1"
    },
    "transport": {
      "id": "bfdc1c1e-1f23-42ca-93ab-9cbcdc0feef8",
      "originCity": "Paulo Joao",
      "destinationCity": "Grande São"
    },
    "customer": {
      "name": "jenny",
      "id": "ef305746-2ad9-4725-a580-7bf6cf33886f",
      "email": "jenny@gmail.com",
      "phone": "+55839988281"
    },
    "createdById": "5262ac93-26aa-4818-86aa-c7dd7c70b068",
    "cubedWeight": 2
  },
  {
    "id": "5babce51-9f8a-48ce-8913-ebecd6a1bf1a",
    "load": {
      "id": "24a571bb-c81c-4439-a0a3-02f5e231e570",
      "dephtCM": "12",
      "widthCM": "100",
      "heightCM": "10",
      "weightKG": "1"
    },
    "transport": {
      "id": "0774f5a3-b7c9-4ed5-be79-0574257d8f61",
      "originCity": "Paulo Joao",
      "destinationCity": "Grande São"
    },
    "customer": {
      "name": "jenny",
      "id": "3e643035-b77f-4a6c-becf-05f7305bb2de",
      "email": "jenny@gmail.com",
      "phone": "+55839988281"
    },
    "createdById": "5262ac93-26aa-4818-86aa-c7dd7c70b068",
    "cubedWeight": 2
  },
  {
    "id": "6697ca45-e2e0-444d-aa99-22294777c5bc",
    "load": {
      "id": "6951cf6d-b697-4b41-9805-53823e3349cf",
      "dephtCM": "6",
      "widthCM": "100",
      "heightCM": "10",
      "weightKG": "1"
    },
    "transport": {
      "id": "88a2d6a8-07af-4e38-99f4-5d3bf97af30c",
      "originCity": "Paulo Joao",
      "destinationCity": "Grande São"
    },
    "customer": {
      "name": "rafael",
      "id": "c7d86ea7-0801-4fcf-a687-459586130fe5",
      "email": "rafael@gmail.com",
      "phone": "+55839988281"
    },
    "createdById": "7eab74a6-cab7-4609-be20-d3c18074332d",
    "cubedWeight": 1
  }
]
``` 
### Jenny busca suas cotações:
---
- Usuario: jenny
- Configure O Header "Authorization: Bearer token"
onde *token* é o token retornado após o login de Jenny
- Request: [http://localhost:3000/position-quotation/my] [GET]
```
no body
```
- Response:
```json
[
  {
    "id": "282cfe74-43b3-4a15-a416-c6cbd95d0787",
    "load": {
      "id": "910c43b1-364c-44cf-bc15-d1be14d52369",
      "dephtCM": "12",
      "widthCM": "100",
      "heightCM": "10",
      "weightKG": "1"
    },
    "transport": {
      "id": "bfdc1c1e-1f23-42ca-93ab-9cbcdc0feef8",
      "originCity": "Paulo Joao",
      "destinationCity": "Grande São"
    },
    "customer": {
      "name": "jenny",
      "id": "ef305746-2ad9-4725-a580-7bf6cf33886f",
      "email": "jenny@gmail.com",
      "phone": "+55839988281"
    },
    "createdById": "5262ac93-26aa-4818-86aa-c7dd7c70b068",
    "cubedWeight": 2
  },
  {
    "id": "5babce51-9f8a-48ce-8913-ebecd6a1bf1a",
    "load": {
      "id": "24a571bb-c81c-4439-a0a3-02f5e231e570",
      "dephtCM": "12",
      "widthCM": "100",
      "heightCM": "10",
      "weightKG": "1"
    },
    "transport": {
      "id": "0774f5a3-b7c9-4ed5-be79-0574257d8f61",
      "originCity": "Paulo Joao",
      "destinationCity": "Grande São"
    },
    "customer": {
      "name": "jenny",
      "id": "3e643035-b77f-4a6c-becf-05f7305bb2de",
      "email": "jenny@gmail.com",
      "phone": "+55839988281"
    },
    "createdById": "5262ac93-26aa-4818-86aa-c7dd7c70b068",
    "cubedWeight": 2
  }
]
``` 

### Rafael busca todas as cotações:
---
- Usuario: rafael
- Configure O Header "Authorization: Bearer token" onde *token* é o token retornado após o login de Rafael
- Request: [http://localhost:3000/position-quotation/my] [GET]
```
no body
```
- Response:
```json
[
  {
    "id": "6697ca45-e2e0-444d-aa99-22294777c5bc",
    "load": {
      "id": "6951cf6d-b697-4b41-9805-53823e3349cf",
      "dephtCM": "6",
      "widthCM": "100",
      "heightCM": "10",
      "weightKG": "1"
    },
    "transport": {
      "id": "88a2d6a8-07af-4e38-99f4-5d3bf97af30c",
      "originCity": "Paulo Joao",
      "destinationCity": "Grande São"
    },
    "customer": {
      "name": "rafael",
      "id": "c7d86ea7-0801-4fcf-a687-459586130fe5",
      "email": "rafael@gmail.com",
      "phone": "+55839988281"
    },
    "createdById": "7eab74a6-cab7-4609-be20-d3c18074332d",
    "cubedWeight": 1
  }
]
``` 

