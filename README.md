# nestMessenger

Nest Messenger store-and-forward messaging API written in TypeScript for Node/Express in the Nest.js framework with data storage in Postgres using TypeORM.

## Nest.js

[Nest.js](https://nestjs.com/) Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).


## The *master* branch

The *master* branch includes all the endopints and the linkage from the controller to the services, but no back-end data storage. It does include all the data validation for each endpoint. Each endpoint will more or less return an object mirroring the input params.

For a fully functional messenging service please see the *postgres* branch. 
