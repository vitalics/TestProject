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

    /**
     * 
     * @param {string} url 
     * @param {string} substring 
     */
    replace(url, find, target) {
        return url.replace(find, target);
    }
}
module.exports = UrlHelper;