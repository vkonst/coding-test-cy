/* eslint-disable @typescript-eslint/no-use-before-define */

// eslint-disable-line @typescript-eslint/no-unused-vars
const mvpFrontend = (() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", onload, false);

  const getInitialStateUrl = atmId =>
    `assets/mvpFrontEnd.atm${atmId}.initialState.json`;

  const atmState = {
    atmId: 1,
    isAtmIdLocked: false,
    token: "",
    cashItems: [],
    isServiceScreenOn: false
  };

  const router = {
    curScreenInd: 0,
    screens: [
      /*0*/ ["boot-screen", 1, 0],
      /*1*/ ["welcome-screen", 2, 1],
      /*2*/ ["login-screen", 3, 1],
      /*3*/ ["withdraw-screen", 4, 1],
      /*4*/ ["results-screen", 3, 1]
    ],
    onChanged: (fromId, toId) => {
      log(`Screen switched: ${fromId} => ${toId}`);
      // TODO: emmit an event
    }
  };

  return {
    bootEndOnclick,
    clientLoginOnclick,
    clientLogoutOnclick,
    nextScreen,
    logCash,
    toggleServiceScreen,
    withdrawOnclick
  };

  function toggleServiceScreen() {
    const serviceScreen = document.getElementById("service-screen");
    if (atmState.isServiceScreenOn) {
      serviceScreen.classList.add("invisible");
    } else {
      serviceScreen.classList.remove("invisible");
    }
    atmState.isServiceScreenOn = !atmState.isServiceScreenOn;
  }

  function nextScreen(backword = false) {
    const [curScrId, fwdScrInd, bwdScrInd] = router.screens[
      router.curScreenInd
    ];
    const nextScrInd = backword ? bwdScrInd : fwdScrInd;
    const nextScrId = router.screens[nextScrInd][0];
    const curScrEl = document.getElementById(curScrId);
    const nextScrEl = document.getElementById(nextScrId);

    router.curScreenInd = nextScrInd;
    curScrEl.classList.add("invisible");
    nextScrEl.classList.remove("invisible");
    if (typeof router.onChanged === "function") {
      router.onChanged(curScrId, nextScrId);
    }
  }

  function onload() {
    displayAtmDeviceId();
    const atmSelect = document.getElementById("atm-select");
    atmSelect.onchange = () => {
      const value = document.getElementById("atm-select").value;
      setAtmDeviceId(value);
    };
  }
  function setAtmDeviceId(id) {
    const prevId = atmState.atmId;
    if (atmState.isAtmIdLocked) {
      log(`Can't change ATM Device Id: locked to ${prevId}`);
    } else {
      atmState.atmId = id;
      // TODO: emit an event
      log(`ATM Device Id changed: ${prevId} => ${id}`);
      displayAtmDeviceId();
    }
  }
  function displayAtmDeviceId() {
    document.getElementById(
      "title"
    ).innerHTML = `<h1>ATM device #${atmState.atmId}</h1>`;
  }
  function hideAtmSelector() {
    document.getElementById("atm-select-form").classList.add("invisible");
  }
  function clientLoginOnclick() {
    nextScreen();
  }
  function clientLogoutOnclick() {
    nextScreen("back");
  }
  function withdrawOnclick() {
    nextScreen();
  }
  function bootEndOnclick() {
    setInitialState()
      .then(() => nextScreen())
      .then(() => hideAtmSelector())
      .catch(() => nextScreen("back"));
  }

  function log(...args) {
    console.log(...args);
    const panel = document.getElementById("info");
    panel.innerHTML += `${args}<br\>`;
  }

  function logCash() {
    log(">>> cashItems:");
    const [num, value] = atmState.cashItems.reduce(
      ([totalNum, totalValue], e) => {
        log(`${e.num} x ${e.item.ccy}${e.item.value} (${e.item.form})`);
        return [totalNum + e.num, totalValue + e.num * e.item.value];
      },
      [0, 0]
    );
    log(`>>> Total: ${num} items valued to ${value}`);
  }

  function readToken() {
    const token = window.localStorage.getItem(`atm:${atmState.atmId}:token`);
    log(`token ${token ? "read from" : "not found in"} the local storage`);
    return token;
  }

  function saveToken(token) {
    window.localStorage.setItem(`atm:${atmState.atmId}:token`, token);
    log("token saved to the local storage");
  }

  function readCashItems() {
    const str = window.localStorage.getItem(`atm:${atmState.atmId}:cashItems`);
    log(`cash items ${str ? "read from" : "not found in"} the local storage`);
    return str ? JSON.parse(str) : null;
  }

  function saveCashItems(items) {
    const str = JSON.stringify(items);
    window.localStorage.setItem(`atm:${atmState.atmId}:cashItems`, str);
    log("cash items saved to the local storage");
  }

  function requestAndSaveInitialState(url) {
    log(`requesting atm device initial state from ${url}`);
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          const errMsg = `failed to fetch initial state from the server (${response.status})`;
          log(errMsg);
          throw new Error(`errMsg`);
        }
        return response.json();
      })
      .then(({ token, cashItems }) => {
        if (typeof token !== "string" || !Array.isArray(cashItems)) {
          throw new Error("invalid initial state fetched");
        }
        return { token, cashItems };
      })
      .then(({ token, cashItems }) => {
        saveToken(token);
        saveCashItems(cashItems);
        return { token, cashItems };
      });
  }

  function setInitialState() {
    atmState.isAtmIdLocked = true;
    const storedToken = readToken();
    const storedCashItems = readCashItems();
    const promise =
      storedToken && storedCashItems
        ? Promise.resolve({ token: storedToken, cashItems: storedCashItems })
        : requestAndSaveInitialState(getInitialStateUrl(atmState.atmId));
    return promise.then(({ token, cashItems }) => {
      atmState.token = token;
      atmState.cashItems = cashItems;
      logCash();
    });
  }
})();
