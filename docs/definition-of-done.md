## Definition of Done
**MUST**\
_(the task is considered as done if all of the following done)_:

0. The App must implements the following [workflow](mvp-must-workflow.md)
1. The code must implement three components 
    - the front-end (FE)
        - simulates ATM
    - the back-end (BE)
        - simulates bank server(s)
    - the "dispense optimizer"
        - selects coins and notes for a given amount
            - with the least possible number of notes and coins from available ones
        - may be a part of either the BE or the FE
2. The FE must display withdraw transaction screen
    - it let user input the amount
3. The BE must expose a RestApi for the following request
4. The FE must send and the BE must response to RestApi request (over HTTP(s))
    - authorize withdrawal transaction
5. Either the FE or the BE shall run the "dispense optimizer"
6. The FE shall display the result of withdrawal
    - either the set of coins and notes in the payout, or failure message
7. The FE shall upload its initial state (coins avaliable) with the SPA code
8. u-Tests for "dispense optimizer" must be created and pass
9. Scripts (e.g. sh, npm) shall automate App start and running above tests

**SHOULD**\
_(if there are time/resources left after MUST gets done)_

0. The App must implements the following [workflow](mvp-should-workflow.md)
1. Scripts (e.g. sh, npm) shall automate building, tests, deploying
2. The FE shall simulates UI (screens) for boot->login->tx->result 
3. The BE shall provides RestApi over HTTP(s) for requests stated bellow  
4. The FE shall request and the BE shall response to the following requests
    - register/authorize ATM on the network
    - authorize user (ATM customer)
    - authorize withdrawal transactions (see "MUST #4")
    - register transaction results
5. The BE code shall have distinct "services"
- modules that simulates micro-services
- which could be "plugged" not just via RESTApi but via RPC
    - ATM Devices Service
        - authorizes ATM on the network, keeps records of their state
    - ATM Sessions Service
        - authorizes clients, tracks client statuses
        - tracks/controls client sessions
    - Transactions Service
        - authorizes/tracks/controls transactions to ATMs
6. BE services shall emits following events
    - ATM Connected event
    - New ATM Session event
    - New Client Tx event
    - ATM Session Closed event
7. The FE should save/read its state (coins avaliable)
    - to/from the browser local storge
8. The FE should provide access token on registration with the BE
9. The BE should simulate JWT-based assess-control
    - ATM Device Id coded in JWT
    - ATM Session Id coded in JWT

**COULD**
_(if there are time/resources left after SHOULD gets done)_

1. The App could run on public cloud services (e.g. AWS, GCS)
2. The FE and BE could communicate via RPC over Websockets
3. The App could run as a Docker Swarm stack 
4. BE code could have "core banking plugins"
    - modules which simulates requests to "core banking systems" (e.g. "authorize spending for a client")
5. BE "services" could use "core plugins" via DI
    - services shall depend upon the interface but not the realization  
6. The BE could implement JWT-based assess-control
7. The BE and the BE could deliver ocasional messages to an ATM client (e.g. special offers)
    - the BE could subscribe to a message queue via a RabbitMQ broker
    - the BE could push messages from the queue to the FE over WS
    - the FE could display the messages in the end of an ATM session 

**WON'T**\
_(will not do it if time/resources left)_

1. BE services won't be separate HTTP/RPC (micro-servers)
2. "Core banking plugins" won't be separate HTTP/RPC servers 
2. "Core banking systems" won't be separate HTTP/RPC servers 
2. The App won't be a Kubernetes stack
