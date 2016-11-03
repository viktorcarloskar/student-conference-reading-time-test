
var pageIndex = 0;
var pages = document.getElementsByClassName('page');
var startTimes = {};
var endTimes = {};
initalSetup();

function initalSetup() {
  window.setTimeout(function() {
    for (var i = 0; i < pages.length; i++) {
      pages[i].style.width = getWindowWidth() + "px";
      pages[i].style.height = getWindowHeight() + "px";
    }
  }, 100)
}

function nextPage() {
  if (pageIndex < pages.length) {
    pageIndex++;
    movePages();
  }
    // Go to next page
}
function previousPage() {

}
function startTime(index, promptToHide) {
  var textName = 'text_' + index + "_start"
  startTimes[textName] = new Date().getTime()
  document.getElementById(promptToHide).classList.add('hidden')
  window.setTimeout(function() {document.getElementById(promptToHide).classList.add('disabled')}, 200)
}
function stopTime(index) {
  var textName = 'text_' + index + "_end"
  endTimes[textName] = new Date().getTime()
}
function done() {
  submit(collectData())
}
function submit(data) {
  var http = new XMLHttpRequest();
  var url = "/save";
  var params = serialize(data);
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
      }
  }
  http.send(params);
}

function collectData() {
  var data = {};
  // Questions
  var q = document.getElementsByClassName('question_input')
  for (var i = 0; i < q.length; i++) {
    data[q[i].id] = q[i].value
  }

  // Times
  for (var attrname in startTimes) { data[attrname] = startTimes[attrname]; }
  for (var attrname in endTimes) { data[attrname] = endTimes[attrname]; }
  data["group"] = document.getElementById('group-hidden').value;
  console.log(data)
  return data;
}

function englishSkillChanged(newValue) {
  switch (newValue) {
    case "1":
      newValue = "Basic"
      break;
    case "2":
      newValue = "Below average"
      break;
    case "3":
      newValue = "Average"
      break;
    case "4":
      newValue = "Above average"
      break;
    case "5":
      newValue = "Excellent"
      break;
    default:

  }
  document.getElementById('english-skill').innerHTML = newValue;
}

function getWindowWidth() {
  return window.innerWidth;
}
function getWindowHeight() {
  return window.innerHeight;
}
function movePages() {
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.transform = "translateX(-" + pageIndex*getWindowWidth() + "px)";
  }
}
function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
