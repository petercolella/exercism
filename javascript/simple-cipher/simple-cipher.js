const keyLength = 100;
const charSet = "abcdefghijklmnopqrstuvwxyz";
const max = charSet.length;

textIndexArray = function(text) {
    let result = [];
    for (var i = 0; i < text.length; i++) {
        result.push(charSet.indexOf(text[i]));
    }
    return result;
}

const Cipher = function(userKey) {

    function randomKey() {
        let result = '';
        for (var i = 0; i < keyLength; i++ ) {
            result += charSet[Math.floor(Math.random() * charSet.length)];
        }
        return result;
    }
    
    if (userKey === undefined) {
        userKey = randomKey();
    } else if (!userKey.match(/^[a-z]+$/)) {
        throw new Error('Bad key');
    }
    
    this.keyIndexArray = function(text) {
        let result = [];
        for (var i = 0; i < text.length; i++) {
            result.push(charSet.indexOf(userKey[i % userKey.length]));
        }
        return result;
    }
    
    this.key = userKey;
}

Cipher.prototype = {
    encode: function(plainText) {
        const keyIndexes = this.keyIndexArray(plainText);
        const textIndexes = textIndexArray(plainText);
        let encodedText = '';

        for (var i = 0; i < plainText.length; i++) {
            indexSum = keyIndexes[i] + textIndexes[i];
            encodedText += indexSum >= max ? charSet[indexSum - max] : charSet[indexSum];
        }
        return encodedText;
    },

    decode: function(cipherText) {
        const keyIndexes = this.keyIndexArray(cipherText);
        const textIndexes = textIndexArray(cipherText);
        let decodedText = '';

        for (var i = 0; i < cipherText.length; i++) {
            indexDiff = textIndexes[i] - keyIndexes[i];
            decodedText += indexDiff < 0 ? charSet[indexDiff + max] : charSet[indexDiff];
        }
        return decodedText;
    }
}

module.exports = Cipher;