# Workflow
_"SHOULD" specs of the [Definition of Done](definition-of-done.md)_ 
<pre>
      **Front-End SPApp**   :                                 : **Fron-End HTTP server**
      Browser opens a link-->==GET /mvpFrontEnd.html==========> Static page HTTP server 
      +-------------+       :               *                 : |
      |  BootScreen |<------<====SPApp: HTML, CSS, JS=========<-+
      +------+------+       :  (incl. initial set of coins, and authorization token)
      +Init/save coins,token: 
             |              :                                 : ** Back-End Server**
             +-------------->==POST /api/atm/register=========> ATM Devices service
                            :               *                 : | +>> emits "ATM Connected" event
      +------+------+<------<====Registed, JWT: {atm_id}======<-+
+---->| LoginScreen |       :                                 :
|     +------+------+       :                                 :
|            |              :                                 :
|       +Open Session------->==POST /api/session/open=========> ATM Sessions service 
|                           :               *                 : | +-> calls Client Authorization Service
|     +------+------+<------<====Opened, JWT:{+session_id}====<-+ |   +-> calls Authorize bank client Plugin
|  +->|SelectService|       :                                 :   |   +>> emits "Client Connected" event
|  |  +-+----+------+       :                                 :   +>> emits "New ATM Session" event
|  |                        :                                 : 
|  (cancel)                 :                                 :
|  |                        :                                 :
|  +-<+-------------+       :                                 :
|  |  |WithdrwScreen|       :                                 :
|  |  +------+------+       :                                 :
|  |         |              :                                 :
|  |      +Select Coins------>==POST /api/tx/wthdrw/authorize=> Transactions Service
|  |       |                :                *                : +-> calls Authorize Client TX Plugin
|  |       |    +-----------<====Authorized, TxId=============<-+  |
|  |       |  +Pay out      :                                 : |  |
|  |       |  +Save coins   :                                 : |  |       
|  |       |    +----------->==POST /api/tx/withdraw/status===>-+  +-> updates TX status
|  |   (no_coins)           :                *                : |  +>> emits "New Client Tx" event
|  |       |            +---<====Updated Tx statu+s===========<-+
|  +-<+----+--------+   |   :                                 :
|     |ResultsScreen|<--+   :                                 :
|     +---+---------+       :                                 :
|       ==Close Session----->====POST /api/session/open++=====> ATM Session Service
|                           :                *                : |  +>> emits "ATM Session Closed" event
+---------------------------<====Closed, JWT: empty===========<-+
                            :                                 :
</pre>
