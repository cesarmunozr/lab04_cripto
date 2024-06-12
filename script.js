// ==UserScript==
// @name         Lab04 Cripto
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Lab04 cripto de la udp
// @author       César Muñoz Rivera
// @match        https://cripto.tiiny.site/
// @match        https://criptolab04.tiiny.site/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function () {
  "use strict";

  //Parte 1, encontrar clave

  //Seleccionar el componente <p>
  const paragraph = document.querySelector("p");

  let key = "";

  if (paragraph) {
    //Buscar todas las letras mayúsculas en el texto del párrafo
    const uppercaseLetters = paragraph.textContent.match(/[A-Z]/g);

    if (uppercaseLetters) {
      //Crear la key a partir de las letras mayúsculas
      key = uppercaseLetters.join("");
      //Imprime la key
      console.log("La llave es:", key);
    } else {
      console.log("No se encontraron letras mayus");
    }
  } else {
    console.log("No se encontró el componente <p>.");
  }

  //Parte 2, contar cantidad de mensajes secretos (clase Mx)
  const divs = document.querySelectorAll('div[class^="M"]');

  let count = 0;

  divs.forEach((div) => {
    const className = div.className;
    const match = className.match(/^M\d+$/);

    if (match) {
      count++;
    }
  });

  console.log("Los mensajes cifrados son:", count);

  //Parte 3, descifrar los mensajes
  if (key) {
    let decryptedMessages = "";

    divs.forEach((div) => {
      const encryptedMessage = div.id;

      if (encryptedMessage) {
        //Descifrar el mensaje utilizando 3DES y la clave
        const decrypted = CryptoJS.TripleDES.decrypt(
          {
            ciphertext: CryptoJS.enc.Base64.parse(encryptedMessage),
          },
          CryptoJS.enc.Utf8.parse(key),
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        );

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        //Imprime el mensaje cifrado y descifrado por consola
        console.log(`${encryptedMessage} ${decryptedText}`);

        //Agregar el mensaje descifrado al final del documento
        decryptedMessages += `${decryptedText}<br>`;
      }
    });

    //Se crea un nuevo elemento div y se agregan los mensajes descifrados en el body
    const decryptedMessagesDiv = document.createElement("div");
    decryptedMessagesDiv.innerHTML = `${decryptedMessages}`;
    document.body.appendChild(decryptedMessagesDiv);
  }
})();
