const keyLength = 100;
const charSet = "abcdefghijklmnopqrstuvwxyz";
const max = charSet.length;

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

    this.key = userKey;
}

Cipher.prototype.encode = function(plainText) {
  
    const keyIndexesInCharSet = [];
    for (var i = 0; i < plainText.length; i++) {
        keyIndexesInCharSet.push(charSet.indexOf(this.key[i % this.key.length]));
    }

    const plainTextIndexesInCharSet = [];
    for (var i = 0; i < plainText.length; i++) {
        plainTextIndexesInCharSet.push(charSet.indexOf(plainText[i]));
    }

    let encodedText = '';
    for (var i = 0; i < plainText.length; i++) {
        if (keyIndexesInCharSet[i] + plainTextIndexesInCharSet[i] >= max) {
            encodedText += charSet[keyIndexesInCharSet[i] + plainTextIndexesInCharSet[i] - max];
        } else {
            encodedText += charSet[keyIndexesInCharSet[i] + plainTextIndexesInCharSet[i]];
        }
    }

    return encodedText;
}

Cipher.prototype.decode = function(cipherText) {
  
    const keyIndexesInCharSet = [];
    for (var i = 0; i < cipherText.length; i++) {
        keyIndexesInCharSet.push(charSet.indexOf(this.key[i % this.key.length]));
    }

    const cipherTextIndexesInCharSet = [];
    for (var i = 0; i < cipherText.length; i++) {
        cipherTextIndexesInCharSet.push(charSet.indexOf(cipherText[i]));
    }

    let decodedText = '';
    for (var i = 0; i < cipherText.length; i++) {
        if (cipherTextIndexesInCharSet[i] - keyIndexesInCharSet[i] < 0) {
            decodedText += charSet[cipherTextIndexesInCharSet[i] - keyIndexesInCharSet[i] + max];
        } else {
            decodedText += charSet[cipherTextIndexesInCharSet[i] - keyIndexesInCharSet[i]];
        }
    }

    return decodedText;
}

module.exports = Cipher;