
function giveWelcome(name: string): string {
    return `Welcome ${name}`
}
const welcomeMessage = giveWelcome('Goku')

console.log(welcomeMessage);

const giveWelcome2 = (name: string): string => {
    return `Welcome ${name}`
}
const welcomeMessage2 = giveWelcome2('Vegetta')

console.log(welcomeMessage2);

function getUser() {
    return {
        uid: 'ABC-123',
        username: 'username'
    }
}
const user = getUser()

console.log(user)

interface User { uid: string, username: string }
const getUser2 = ():User => ({uid: 'ABC-123', username: 'username'})

console.log(getUser2())