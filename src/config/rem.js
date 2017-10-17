/*根据屏幕初始化字体大小*/
(function(doc, win) {
    var basicWidth = window.basicWidth || 375;
    var minWidth = 320;
    var maxWidth = 375;
    var htmlElement = doc.documentElement;
    var recalc = function() {
        var clientWidth = htmlElement.clientWidth || (basicWidth / 2);
        clientWidth = clientWidth < minWidth? minWidth : clientWidth;
        clientWidth = clientWidth > maxWidth? maxWidth : clientWidth;
        htmlElement.style.fontSize = 100 * (clientWidth / basicWidth) + 'px';
    };
    recalc();
    if (!win.addEventListener) return;
    win.addEventListener('resize', recalc, false);
})(document, window);