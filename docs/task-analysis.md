The task is to implement a simple web application that simulates withdrawal of cash from an
ATM.\
I am free to design the UI in the way you see fit.

Constraints on the ATM:
- coins and notes available: 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1
- there’s a finite amount of notes and coins
- IRRELEVANT for MVP: number and sizes of payout boxes, if it is a note or a banknote, sizes of coins

User stories:
- As a User I want to be able to enter an amount, so that I can specify how much
money to withdraw
- As a User I want to receive notes and coins that match the entered amount, so I can
go spend the money
- As a Bank I want the least number of notes and coins to be used for payout, so that I
don’t have to refill often

#### Q&As
##### The design scope.
**Q1.**
- Q: I should primarily focus on (a) algorithmic problem design and (b) object-oriented design issues (such as data structure, class hierarchy, etc.). Is that right?
- A: Your choice ;-)\
 The purpose of this is for you to show us how you think when solving problems and that you can write SOLID code. So it's also about finding the balance on what is important

**Q2.**
- Q: I should not dive into system design issues (such as whether or not there shall be a proxy, a load-balancer, a session manager or authorization manager micro-services) unless it is needed for (a) and (b). Is that right?
- A: Yes, no need for this in this context


##### Domain scope and Assumptions
**Q3.**
- Q: The ATMs in questions are NOT the traditional banking cards ATMs. And they are not a subject for VISA/Mastercard requirements (such as embedded Hardware Security Modules, NDC protocol, etc...).\
For example, the ATM may use Facebook account/authentication.\
And we can assume the front-end may be a browser that ATM runs.\
Can I use this assumption?
- A: Yes, no hard constraints here so do as you see fit

**Q4.**
- Q: The front-end (ATM) has a "normal consumer" internet connection (like 3g) to the server. There are dozens (but not hundreds and thousands) of ATMs in the network.\
So I can relay on HTTP(S)/WS as a transport and single-process node.js back-end.\
Can I use this assumption?
- A: Q4: Yes that is fine

**Q5.**
- Q: We do not use advanced banknotes/coins dispensing algorithms (such as optimizations based on historical usage, expected probablilities of banknotes/coins demand, fees/costs profile).  
Can I use this assumption?
- A: Q4: Yes that is fine

#### Outcomes

I shall demonstrate:
- declared issues:
    - transforming requirements into tools
    - nice and clear code
    - ability to write code that is
        - working
        - easy to use
        - SOLID
        - Maintainable
        - Testable
- imputed issues:
    - planning skills, prioritization, focusing
    - knowledge of algorithm, data structures, big O application
    - understanding of system design principles
        - distributed systems
        - monolith / micro-services
        - event-driven archetecture
    - knowledge of IPC, messaging, interfaces, transport protocols
