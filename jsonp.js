var jsonp = {
    callbackCounter: 0,
 
    fetch: function(url, callback) {
        var fn = 'JSONPCallback_' + this.callbackCounter++;
        window[fn] = this.evalJSONP(callback);
        url = url.replace('=JSONPCallback', '=' + fn);
 
        var scriptTag = document.createElement('SCRIPT');
        scriptTag.src = url;
        document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
    },
 
    evalJSONP: function(callback) {
        return function(data) {
            var validJSON = false;
        if (typeof data == "string") {
            try {validJSON = JSON.parse(data);} catch (e) {
                /*invalid JSON*/}
        } else {
            validJSON = JSON.parse(JSON.stringify(data));
                window.console && console.warn(
                'response data was not a JSON string');
            }
            if (validJSON) {
                callback(validJSON);
            } else {
                throw("JSONP call returned invalid or empty JSON");
            }
        }
    }
}