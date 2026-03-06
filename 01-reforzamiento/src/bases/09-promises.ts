const myPromise = new Promise<number>((res, rej) => {
    setTimeout(() => {
        res(100)
        // rej('My friend was lost')

    }, 2000)
})

myPromise
    .then((amount) => console.log(`They gave me back: ${amount}`))
    .catch((reason) => console.warn(reason))
    .finally(() => console.log('We learn something at least'));
