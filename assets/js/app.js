'use strict';

// This app requires a server to handle import statements and CORS issues
import * as utils from './utils.js';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Organizer                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

//utils.print(document.cookie.length > 0 ? 'Cookies available' : 'No Cookies found');

const acceptBtn = utils.select('.accept');
const settingsBtn = utils.select('.setting-btn');
const browser = utils.select('.browser');
const operatingSystem = utils.select('.operating_system');
const screenWidth = utils.select('.screen_width');
const screenHeight = utils.select('.screen_height');
const cookieDialog = utils.select('.cookie');
const settingsDialog = utils.select('.settings');
const saveBtn = utils.select('.preferences');



//function to set cookies.
function setCookie(name, value, options = {}) {
    //const LIFETIME = 15;
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
    if (browser.checked) {
      setCookie('Browser', `${browserDetect()}`, {'max-age': 15});
      utils.print(`Browser: ${getCookie('Browser')}`);
    } else {
      setCookie('Browser', `Rejected`, {'max-age': 15});
    }

    if (operatingSystem.checked) {
      setCookie('System', `${systemDetect()}`, {'max-age': 15});
      utils.print(`System: ${getCookie('System')}`);
    } else {
      setCookie('System', `Rejected`, {'max-age': 15});
    }

    if (screenWidth.checked) {
      setCookie('Screen-width', `${screen.width}`, {'max-age': 15});
      utils.print(`Screen-width (px): ${getCookie('Screen-width')}`);
    } else {
      setCookie('Screen-width', `Rejected`, {'max-age': 15});
    }

    if (screenHeight.checked) {
      setCookie('Screen-height', `${screen.height}`, {'max-age': 15});
      utils.print(`Screen-height (px): ${getCookie('Screen-height')}`);
    } else {
      setCookie('Screen-height', `Rejected`, {'max-age': 15});
    }

    if (!browser.checked && !operatingSystem.checked && !screenWidth.checked && !screenHeight.checked) {
      utils.print('Cookies rejected by user');
    }
}

function checkCookie() {
    if (document.cookie.length > 0) {
        return true;
    } else {
        return false;
    }
}

window.onload = function () {
    if (!checkCookie()) {
      setTimeout(() => {
        cookieDialog.showModal();
      }, 1000);
    } else {
      getCookies();
    }
}
  
onEvent('click', acceptBtn, () => {
    cookieDialog.close();
    printCookie();
    utils.print('Cookie saved successfully');
})
  
onEvent('click', settingsBtn, () => {
    cookieDialog.close();
    settingsDialog.showModal();
})
  
onEvent('click', saveBtn, () => {
    printCookie();
    settingsDialog.close();
})

