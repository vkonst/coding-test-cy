# Workflow
_"MUST" specs of the [Definition of Done](definition-of-done.md)_ 
<pre>
      **Front-End SPApp**   :                                 : **Fron-End HTTP server**
      Browser opens a link-->==GET /mvpFrontEnd.html==========> Static page HTTP server 
      +-------------+       :               *                 : |
      |  BootScreen |<------<====SPApp: HTML, CSS, JS=========<-+
      +------+------+       :  (incl. initial set of coins)
       +Set initial coins   :
             |              :                                 : ** Back-End**
   +->+-------------+       :                                 :
   |  |WithdrwScreen|       :                                 :
   |  +------+------+       :                                 :
   |         |              :                                 :
   |      +Select Coins------>==POST /api/tx/wthdrw/authorize=> Transactions Service
   |       |                :                *                : +
   |       |      +---------<====Authorized===================<-+
   |       |      |         :                                 :
   |       |   (success)    :                                 :       
   |       |   +Update coins:                                 :
   |       |      |         :                                 :
   |   (no_coins) |         :                                 :
   |       |      |         :                                 :  
   |  +----+------+-+       :                                 :
   |  |ResultsScreen|       :                                 :
   +<-+---+---------+       :                                 :
                            :                                 :
</pre>
