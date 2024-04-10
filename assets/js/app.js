'use strict';

// This app requires a server to handle import statements and CORS issues
import * as utils from './utils.js';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Cookies                                              */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

//utils.print(document.cookie.length > 0 ? 'Cookies available' : 'No Cookies found');

const acceptBtn = utils.select('.accept');
const settingsBtn = utils.select('.setting-btn');
const saveBtn = utils.select('.preferences');
const browser = utils.select('.browser');
const operatingSystem = utils.select('.operating_system');
const screenWidth = utils.select('.screen_width');
const screenHeight = utils.select('.screen_height');
const cookieDialog = utils.select('.cookie');
const settingsDialog = utils.select('.settings');
const dialog = utils.select('.dialog');



//function to set cookies.
function setCookie(name, value, options = {}) {
    options = {
        path: '/', 
        SameSite: 'Lax', 
        ...options
    };

    const keys = Object.keys(options);
    const values = Object.values(options);
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let i = 0; i < keys.length; i++) {
        updatedCookie += `; ${keys[i]}=${values[i]}`;
    }
    document.cookie = updatedCookie;
}

//function to get cookies.
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
}


function getCookies() {
    utils.print(`Browser: ${getCookie('Browser')}`);
    utils.print(`System: ${getCookie('System')}`);
    utils.print(`Screen-width (px): ${getCookie('Screen-width')}`);
    utils.print(`Screen-height (px): ${getCookie('Screen-height')}`);
}


function browserDetect() {    
    let userAgent = navigator.userAgent;
    let browserName = '';
    if (userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
      } else if (userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
      } else if (userAgent.match(/safari/i)){
        browserName = "safari";
      } else if( userAgent.match(/opr\//i)){
        browserName = "opera";
      } else if( userAgent.match(/edg/i)){
        browserName = "edge";
      } else {
        browserName = "Other Browser";
      }
    return browserName;    
}


function systemDetect() {    
    let userAgent = navigator.userAgent;
    let systemName = '';
    if (userAgent.match(/Win/i)){
        systemName = "Windows";
      } else if (userAgent.match(/Mac/i)){
        systemName = "MacOS";
      } else if (userAgent.match(/Linux/i)){
        systemName = "Linux";
      } else {
        systemName = "Other operating system";
      }
    return systemName;    
} 


function printCookie() {
  const LifeTime = 15;
    if (browser.checked) {
      setCookie('Browser', `${browserDetect()}`, {'max-age': `${LifeTime}`});
      utils.print(`Browser: ${getCookie('Browser')}`);
    } else {
      setCookie('Browser', `Rejected`, {'max-age': `${LifeTime}`});
      utils.print(`Browser: ${getCookie('Browser')}`);
    }

    if (operatingSystem.checked) {
      setCookie('System', `${systemDetect()}`, {'max-age': `${LifeTime}`});
      utils.print(`System: ${getCookie('System')}`);
    } else {
      setCookie('System', `Rejected`, {'max-age': `${LifeTime}`});
      utils.print(`System: ${getCookie('System')}`);
    }

    if (screenWidth.checked) {
      setCookie('Screen-width', `${screen.width}`, {'max-age': `${LifeTime}`});
      utils.print(`Screen-width (px): ${getCookie('Screen-width')}`);
    } else {
      setCookie('Screen-width', `Rejected`, {'max-age': `${LifeTime}`});
      utils.print(`Screen-width (px): ${getCookie('Screen-width')}`);
    }

    if (screenHeight.checked) {
      setCookie('Screen-height', `${screen.height}`, {'max-age': `${LifeTime}`});
      utils.print(`Screen-height (px): ${getCookie('Screen-height')}`);
    } else {
      setCookie('Screen-height', `Rejected`, {'max-age': `${LifeTime}`});
      utils.print(`Screen-height (px): ${getCookie('Screen-height')}`);
    }
}

function checkCookie() {
    if (document.cookie.length > 0) {
        return false;
    } else {
        return true;
    }
}

window.onload = function () {
    if (checkCookie()) {
      dialog.style.visibility = 'visible';
    } else {
      getCookies();
      dialog.style.visibility = 'hidden';
    }
}
  
acceptBtn.addEventListener('click', () => {
    dialog.style.display = 'none';
    printCookie();
})
  
settingsBtn.addEventListener('click', () => {
    cookieDialog.style.visibility = 'hidden';
    settingsDialog.style.visibility = 'visible';
})
  
saveBtn.addEventListener('click', () => {
    settingsDialog.style.display = 'none';
    dialog.style.visibility = 'hidden';
    printCookie();
})

