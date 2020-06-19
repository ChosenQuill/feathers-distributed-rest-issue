# Feathers Distributed REST Issue

### Info
There are three parts to this repo.
- The service, which is exposed on 3040, and contains the service "/message"
- The api, which is exposed on 3030, and contains the service "/gateway".
- The client, which runs the test script.

The test is composed of two parts.
1. The first part connects to socket.io and gets both services. It should be a success.
2. The second part uses fetch to get both endpoints. Only the gateway endpoint works here.

Note: If you fetch or curl from the api service itself (localhost:3040/message/1), it works. 

### How to replicate issue/use
1. Clone this repo
2. docker-compose up, or manually npm install each folder and run everything.