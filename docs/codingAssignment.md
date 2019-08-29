# Developer Homework
As a part of a recruitment process we always ask our candidates to complete a
practical development challenge. The challenge consists of two parts:
1. You do your magic, solve the provided task, and send the results to us.
2. We host a session where you present your solution to us, and we all have a nice talk
about it.

The task is to implement a simple web application that simulates withdrawal of cash from an
ATM. The ATM can payout both notes and coins. You are free to design the UI in the way you see fit.

There are a number of physical constraints on the ATM:
- There are 3 payout boxes: 1 for notes, 1 for coins > 20mm and 1 for coins <= 20mm
- 5 notes are available: 1000, 500, 200, 100, 50
- 5 coins are available: 20 (40mm), 10 (20mm), 5 (50mm), 2 (30mm) and 1 (10mm)
- There’s a finite amount of notes and coins

We have the following user stories:
- As a User I want to be able to enter an amount, so that I can specify how much
money to withdraw.
- As a User I want to receive notes and coins that match the entered amount, so I can
go spend the money
- As a Bank I want the least number of notes and coins to be used for payout, so that I
don’t have to refill often

Example​ : User wants to withdraw 578. The ATM responds with: Notes 1x500, 1x50, coins
1x20, 1x5, 1x2, 1x1

There are many ways to solve this, some requiring very few lines of code. Keep in mind that
while we do not expect your code to be production ready, this your opportunity to show your
skills. What we're looking for is to see if you have the ability to transform a set of user
requirements into a working tool, preferably creating some nice and clean code along the
way.

We will appreciate if your solution is:
- Working
- Easy to use
- SOLID
- Maintainable
- Testable

When presenting the solution you’re welcome to bring your own laptop if that suits you
better. In case you have questions, please do not hesitate to ask.

Happy coding :)
