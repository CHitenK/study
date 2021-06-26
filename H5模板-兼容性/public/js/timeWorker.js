function timedCount(now) {
  now += 1000
  postMessage(now)
  setTimeout('timedCount(' + now + ')', 1000)
}

onmessage = function (event) {
  timedCount(event.data)
}

