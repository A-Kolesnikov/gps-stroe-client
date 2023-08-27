function onRemoved() {
    console.log('Cookie not removed')
}
function onError() {
    console.log('Error cookie not removed')
}
function removeCookie0() {
    let removing = document.cookies.remove({ //window instead of document
        name: "connect.sid"
    })
    removing.then(onRemoved, onError)
}