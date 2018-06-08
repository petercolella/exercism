function randomKey() {
    let result = '';
    const keyLength = 100;
    const charSet = "abcdefghijklmnopqrstuvwxyz";
    for( var i = 0; i < keyLength; i++ ) {
        result += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return result;
}

const Cipher = function(userKey) {
       
    if (userKey === undefined) {
        userKey = randomKey();
    } else if (!userKey.match(/^[a-z]+$/)) {
        throw new Error('Bad key');
    }

    this.key = userKey;
}

Cipher.prototype.encode = function(userKey) {}

module.exports = Cipher;