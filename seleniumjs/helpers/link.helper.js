var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
class UrlHelper {
    /**
     * 
     * @param {string} link
     * @return {boolean}
     */
    urlIsValid(link) {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
        var regexp = new RegExp(expression);
        return regexp.test(link);
    }
}
let urlHelper = new  UrlHelper();
console.log(urlHelper.urlIsValid('/123/123'))
module.exports = UrlHelper;