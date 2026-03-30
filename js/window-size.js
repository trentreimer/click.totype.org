function windowHeight() {
    return safari ? document.body.getBoundingClientRect().height : window.innerHeight;
}

function windowWidth() {
    return safari ? document.body.getBoundingClientRect().width : window.innerWidth;
}
