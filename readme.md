# MICROSMS-JS

Microsms-js is a simple wrapper for MicroSMS API

## Installation
```ssh
npm i microsms-js
```
or
```ssh
yarn add microsms-js
```

## Example Usage
```javascript
const MicrosmsApi = require('microsms-js')
const microsms = new MicrosmsApi(shopID, hash, hashType)

microsms.generateTransaction(amount, webhookURL, redirectURL, description, controlID)
    .then(transactionURL => console.log(transactionURL))
```

## Links
[GitHub Repository](https://github.com/kuvus/microsms-js)  
[npm package](https://www.npmjs.com/package/microsms-js)  
[Author's website](https://kuvus.pl)  

## Author
Jakub Macioł (kuvuś)

## License
[MIT](https://github.com/kuvus/microsms-js/blob/main/LICENSE)