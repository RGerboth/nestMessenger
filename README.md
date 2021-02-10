# nestMessenger

Nest Messenger store-and-forward messaging API written in TypeScript for Node/Express in the Nest.js framework with data storage in Postgres using TypeORM.

## Nest.js

[Nest.js](https://nestjs.com/) Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

## Installation


### Postgres Database
Nest Messenger stores messages in a single table in Postgres. The Postgres 

**Clone the repository**
`git clone https://github.com/RGerboth/nestMessenger.git`

**Run NPM Install**
`npm i`

**Switch to branch postgres**
`git checkout postgres`

**Start**
npm run start

**Confirm**
Navigate to http://localhost:3000/api

CREATE DATABASE nest_messenger;

## API Reference

The Nest Messages API includes all traditional CRUD operations.

To view the API documents via Swagger navigate to [Nest Messenger API](http://localhost:3000/api)

### POST

Post a new message.

**NOTE:** "from", "to" and "message" are required, all are strings, and no additional elements are allowed.

Method: POST
Route: /messages

>

    body (JSON)
    `{
        "from": "Robert",
        "to": "Steve",
        "message": "This is only a test."
    }`

>

### PATCH

Update an existing message by numeric message ID.

**NOTE:** All update (body) fields are optional.

Method: PATCH
Route: /messages/:id

    params:
        id (number)

    body (JSON)
    `{
        "from": "Robert",
        "to": "Steve",
        "message": "This is not a test."
    }`

### DELETE

Delete an existing message by numeric message ID.

Method: DELETE
Route: /messages/:id

>

    params:
        id (number)

### GET

On the GET routes, the names are case-sensitive: Steve != steve

Dates are all adjusted to MST (GMT - 07:00)

All GET routes support pagination and date-bracketing with the following filters:

- limit: limit results to this number of messages: the limit defaults to 100 entries if no limit is specified.
- offset: skip this number of results and return the remainder: the offset defaults to zero.
- dateFrom: only include messages after or on this date: the dateFrom defaults to messages from the past 30 days.
- dateTo: only include messages before or including the dateTo: the dateTo defaults to today.

There are three GET routes:

1. Get all messages from all senders

Method: GET
Route: /messages

>

    query params:
        limit (optional, default 100)
        offset (optional, default 0)
        dateFrom (optional, default past 30 days)
        dateTo (optional)

Example: `/messages?limit=2&offset=6&dateFrom=2021-02-01&dateTo=2021-02-07`

2. Get all messages from a particular sender to a particular receiver.

Method: GET
Route: /messages/bySenderName/:name

>

    params:
        name (name of sender, required)
    query params:
        recipient (name of recipient, required)
        limit (optional, default 100)
        offset (optional, default 0)
        dateFrom (optional, default past 30 days)
        dateTo (optional)

Example: `/messages/bySenderName/Steve?recipient=Robert&limit=1&offset=1&dateFrom=2020-12-30&dateTo=2021-02-10`

3. Get all messages to a particular receiver from a particular sender.

Method: GET
Route: /messages/byReceiverName/:name

>

    params:
        name (name of recipient, required)
    query params:
        recipient (name of sender, required)
        limit (optional, default 100)
        offset (optional, default 0)
        dateFrom (optional, default past 30 days)
        dateTo (optional)

Example: `/messages/byReceiverName/Robert?sender=Steve&limit=1&offset=1&dateFrom=2020-12-30&dateTo=2021-02-10`
