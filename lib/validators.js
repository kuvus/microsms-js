exports.stringValidator = param => {
    if (!param) {
        console.log('Invalid argument!')
        return false
    }

    if (typeof param !== 'string') {
        console.log('Invalid argument!')
        return false
    }

    param = param.replace(/\s/g, '')
    if (param.length < 1) {
        console.log('Invalid argument!')
        return false
    }

    return param
}

exports.numberValidator = param => {
    if (!param) {
        console.log('Invalid argument!')
        return false
    }

    if (typeof param !== 'number') {
        console.log('Invalid argument!')
        return false
    }

    return param
}
