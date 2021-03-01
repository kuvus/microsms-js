const { stringValidator, numberValidator } = require('./lib/validators')
const md5 = require('md5')
const sha256 = require('js-sha256').sha256

class MicrosmsApi {
    constructor(shopID, hash, hashType) {
        this.microsms = {}

        shopID = parseInt(shopID)
        if (numberValidator(shopID)) this.microsms.shopID = shopID
        else throw new Error('No ShopID provided or provided ShopID is invalid.')

        if (stringValidator(hash)) this.microsms.hash = hash
        else throw new Error('No hash provided or provided hash is invalid.')

        if (stringValidator(hashType)) this.microsms.hashType = hashType
        else throw new Error('No hashType provided or provided hashType is invalid.')
    }

    generateTransaction(amount, webhookUrl, redirectUrl, description, control) {
        if (!numberValidator(amount))
            throw new Error('No amount provided or provided amount is invalid.')

        if (!stringValidator(webhookUrl))
            throw new Error('No webhookUrl provided or provided webhookUrl is invalid.')
        if (!stringValidator(redirectUrl))
            throw new Error('No redirectUrl provided or provided redirectUrl is invalid.')
        if (!stringValidator(description))
            throw new Error('No description provided or provided description is invalid.')
        if (!stringValidator(control))
            throw new Error('No control provided or provided control is invalid.')

        amount = amount.toFixed(2)

        const signature =
            this.microsms.hashType === 'sha256'
                ? sha256(`${this.microsms.shopID}${this.microsms.hash}${amount}`)
                : md5(`${this.microsms.shopID}${this.microsms.hash}${amount}`)

        return encodeURI(
            `https://microsms.pl/api/bankTransfer/?shopid=${this.microsms.shopID}&signature=${signature}&amount=${amount}&control=${control}&return_urlc=${webhookUrl}&return_url=${redirectUrl}&description=${description}`
        )
    }

    checkPaymentStatus(status, orderID, hash) {
        const localHash =
            this.microsms.hashType === 'sha256'
                ? sha256(`true${orderID}${this.microsms.hash}`)
                : md5(`true${orderID}${this.microsms.hash}`)

        if (hash === localHash) {
            if (status) {
                return {
                    status: 'SUCCESS',
                    message: 'Payment was successful.',
                }
            } else {
                return {
                    status: 'UNPAID',
                    message: "Payment wasn't successful.",
                }
            }
        } else {
            return {
                status: 'ERROR',
                message: 'Provided hash is invalid.',
            }
        }
    }
}

module.exports = MicrosmsApi
