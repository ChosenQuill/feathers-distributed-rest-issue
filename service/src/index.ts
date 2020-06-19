import feathers, { Id, Params } from '@feathersjs/feathers';
import express from '@feathersjs/express';
const distribution = require("@kalisio/feathers-distributed");

const app = express(feathers());
// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.configure(distribution());

app.use("/message", {
    async get(id: Id, params?: Params): Promise<any> {
        return {
            'id': id,
            'message': "Returning message from service!",
            'datetime': new Date().toISOString().substr(11,8)
        };
    }
});

app.listen(3040);
console.log("Service Created on 3040!")