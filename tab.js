var ImageApi = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1&type=jpg',
    parser = new DOMParser();

chrome.browserAction.onClicked.addListener(function(tab) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", ImageApi, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
          var xml = parser.parseFromString(xhr.responseText, 'text/xml'),
              imageUrl = getValueForElementNode(xml, 'url'),
              linkBack = getValueForElementNode(xml, 'source_url');
        
              copyToClipboard(imageUrl);

          var notify = new Notification('Image copied to clipboard', {
              body: ['Url:', imageUrl, '[', linkBack, ']'].join(' '),
              icon: 'icon.png'
          });

          setTimeout(function () {
            notify.close();
          }, 4000);
      }
    };
    xhr.send();
});

function getValueForElementNode(doc, node) {
    return doc.getElementsByTagName(node)[0].childNodes[0].nodeValue;
}

function copyToClipboard( text ){
    var copyDiv = document.createElement('div');

    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}
