import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import {expect} from 'chai';
import fetch from 'node-fetch';

const url = process.env.docker ? 'http://api:3030' : 'http://localhost:3030';
const socket = io(url);
const app = feathers();

// Set up Socket.io client with the socket
app.configure(socketio(socket));


async function test1() {
    console.log("Starting socket feathers client test!");
    let gatewayService = app.service("/gateway");
    console.log("Getting from gateway");
    console.log("Result:", await gatewayService.get(1));
    console.log("Gateway call successful");
    let messageService = app.service("/message");
    console.log("Getting from service");
    console.log("Result:", await messageService.get(1));
    console.log("Message call successful");
    console.log("Test 1 success!")
    disconnect();
}

async function test2() {
    console.log("Starting REST test");
    let res1 = await fetch(url + '/gateway/1');
    expect(res1.status).to.equal(200);
    console.log(await res1.json());
    console.log("Gateway fetch successful");
    let res2 = await fetch(url + '/message/1');
    expect(res2.status).to.equal(200);
    console.log(await res2.json());
    console.log("Message fetch successful");
}

async function disconnect() {
    console.log("Disconnecting Socket Client.");
    socket.disconnect();
}


console.log("Waiting 20 seconds for each service to recognize eachother before testing.");

setTimeout(()=> {
    test1().catch((e)=>{
        console.log("Ran into an issue!",e.message);
        stop();
    }).then(test2).catch((e)=>{
        console.log("Expected an issue and got one...", e);
    });
}, 1);