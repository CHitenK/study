const baseSize = 50
setRem ()
function setRem () {
    let clientWidth = document.documentElement.clientWidth
    if(clientWidth < 600){
        clientWidth = 600
    }else if(clientWidth > 1920){
        clientWidth = 1920
    }
    const scale = clientWidth / 750
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
window.addEventListener('resize',setRem,false)