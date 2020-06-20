let a = window.location

function getHistory() {
    let userHistory;
    if (localStorage.getItem('userHstory') === null) {
        userHistory = []
    } else {
        userHistory = JSON.parse(localStorage.getItem('userHstory'))
    }

    return userHistory
}

function storeHistory(history) {
    history = window.location;
    const hist = getHistory();
    let a = window.addEventListener('refresh', getHistory())
    console.log('Event', a)
    hist.push(history)
    localStorage.setItem('userHistory', JSON.stringify(hist))
}
storeHistory(a)
console.log('User History', window.location)