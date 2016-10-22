//loading效果
var _pageHeight=document.documentElement.clientHeight,
    _pageWidth=document.documentElement.clientWidth;
var _loadingTop=_pageHeight,
    _loadingLeft=_pageWidth;
var _loadingHtml='<div id="loadDiv"><p id="loading">Loading</p></div>'
document.write(_loadingHtml);
document.onreadystatechange=completeLoading;
function completeLoading(){
    if(document.readyState=='complete'){
        window.setTimeout(toRemove,1000)
    }
}
function toRemove(){
    var loadingMask=document.getElementById('loadDiv')
    loadingMask.parentNode.removeChild(loadingMask);
}
