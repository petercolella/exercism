function Cipher(key) {
    if (key.length < 100) {
        const keyLength = 100;
        const charSet = "abcdefghijklmnopqrstuvwxyz";
        let newKey = '';
        for( var i = 0; i < keyLength; i++ )
            newKey += charSet[Math.floor(Math.random() * charSet.length)];
        }
    key = newKey;
}

Cipher.prototype.encode = function() {
        // key = 'aaaa';
}

module.exports = Cipher;