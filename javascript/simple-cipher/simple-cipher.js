const Cipher = function() {}

Cipher.prototype.encode = function(userKey) {
    let key;

    function randomKey() {
        let result;
        const keyLength = 100;
        const charSet = "abcdefghijklmnopqrstuvwxyz";
        for( var i = 0; i < keyLength; i++ ) {
            result += charSet[Math.floor(Math.random() * charSet.length)];
        }
        return result;
    }
    
    
    if (userKey === 'null') {
        userKey = randomKey();
    } else if (!userKey.match(/^[a-z]+$/)) {
        throw new Error('Bad key');
    }
    this.key = userKey;
    key = this.key;
}

module.exports = Cipher;