const mvpFrontend = (() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", onload, false);

  const INIT_STATE_URL = "service/initial-state";

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
      ["boot-screen", 1, 0], // #0
      ["welcome-screen", 2, 1], // #1
      ["login-screen", 3, 1], // #2
      ["withdraw-screen", 4, 1], // #3
      ["results-screen", 3, 1] // #4
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
    withdrawOnclick,
    toggleServiceScreen,
    nextScreen
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
    document.getElementById("title").innerHTML = `<h1>ATM device #${
      atmState.atmId
    }</h1>`;
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
      .catch(() => nextScreen("back"));
  }

  function log(...args) {
    console.log(...args);
    const panel = document.getElementById("info");
    panel.innerHTML += `${args}<br\>`;
  }

  function readToken() {
    return window.localStorage.getItem(`atm:${atmState.atmId}:token`);
  }

  function saveToken(token) {
    return window.localStorage.setItem(`atm:${atmState.atmId}:token`, token);
  }

  function readCashItems() {
    const str = window.localStorage.getItem(`atm:${atmState.atmId}:cashItems`);
    return str ? JSON.parse(str) : null;
  }

  function saveCashItems(items) {
    const str = JSON.stringify(items);
    window.localStorage.setItem(`atm:${atmState.atmId}:cashItems`, str);
  }

  function requestAndSaveInitialState(url) {
    log(`requesting atm device initial state from ${url}`);
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          const errMsg = `failed to fetch initial state from the server (${
            response.status
          })`;
          log(errMsg);
          throw new Error(`errMsg`);
        }
        response.json();
      })
      .then(({ token, cashItems }) => {
        if (typeof token !== "string" || !Array.isArray(cashItems)) {
          throw new Error("invalid initial state fetched");
        }
        return { token, cashItems };
      })
      .then(({ token, cashItems }) => {
        saveToken(token);
        saveCahsItems(cashItems);
        log(
          `atm device initial state saved to local store(${token}, ${JSON.stringify(
            cashItems
          )})`
        );
      });
  }

  function setInitialState() {
    atmState.isAtmIdLocked = true;
    const url = INIT_STATE_URL + `?atm_id=${atmState.atmId}`;
    const storedToken = readToken();
    const storedCashItems = readCashItems();
    const promise =
      storedToken && storedCashItems
        ? Promise.resolve({ token: storedToken, cashItems: storedCashItems })
        : requestAndSaveInitialState(url);
    return promise.then(({ token, cashItems }) => {
      atmState.token = token;
      atmState.cashItems = cashItems;
    });
  }
})();
