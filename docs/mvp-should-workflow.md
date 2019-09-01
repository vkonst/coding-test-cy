# Workflow
_"SHOULD" specs of the [Definition of Done](definition-of-done.md)_ 
<pre>
      **Front-End SPApp**   :                                 :  **Fron-End server**
      Browser opens a link-->==GET /mvpFrontEnd.html==========>--Static page HTTP server 
      +-------------+       :               *                 :  |
      |  BootScreen |<------<====SPApp: HTML, CSS, JS=========<--+
      +------+------+       :  (incl. initial set of coins, authorization token)
          +Init and save state (coins,token)                                   
             |             _______________________________________________________________________
             |              :                                 :  ** Back-End Server**
             +-------------->==POST /api/atm/register=========>+-TM Devices Service
                            :                                 :  |  +>> emits "ATM Connected" event
+--------------------------->==POST /api/atm/update===========>--+
|     +------+------+<------<=Registed/Updated, JWT: {atmId}==<--+
|     | LoginScreen |       :                                 :
|     +------+------+       :                                 :
|            |              :                                 :
|       +Open Session------->==POST /api/session/open=========>--ATM Sessions Service
|                           :               *                 :  |  +-> calls "Authorize bank client" Plugin
|     +------+------+<------<====Opened, JWT:{atmId, sessId}==<--+  +>> emits "Client Connected" event
|  +->|SlctOpertScrn|       :                                 :     +>> emits "New ATM Session" event   
|  |  +-+----+------+       :                                 :
|  |         |              :                                 :
|  (cancel)  |              :                                 :
|  |         |              :                                 :
|  +-<+------+------+       :                                 :
|  |  |WithdrwScreen|       :                                 :
|  |  +------+------+       :                                 :
|  |         |              :                                 :
|  |      +Select Coins------>==POST /api/tx/wthdrw/authorize=>--Transactions Service
|  |       |                :                *                :  |  +-> calls "Authorize Client TX" Plugin
|  |       |    +-----------<====Authorized, TxId=============<--+  |
|  |       |  +Pay out      :                                 :  |  |
|  |       |  +Save state (coins)                             :  |  |
|  |       |    +----------->==POST /api/tx/withdraw/update===>--+  +-> updates TX status
|  |   (no_coins)           :                *                :  |  +>> emits "New Client Tx" event
|  |       |            +---<====Updated Tx status============<--+
|  +-<+----+--------+   |   :                                 :
|     |ResultsScreen|<--+   :                                 :
|     +---+---------+       :                                 :
|       ==Close Session----->====POST /api/session/close======>--TM Session Service
|                           :                *                :  |  +>> emits "ATM Session Closed" event
+---------------------------<====Closed, clear JWT============<--+
                            :                                 : 
</pre>                                                          
