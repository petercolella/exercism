// var reverseString = function (input) {
    
//     this.string = input
// };

// reverseString.prototype.
reverseString = function (str) {

    // let str = this.string;
    let newStr = [];

    for (i = str.length - 1; i >= 0; i--) {
        newStr.push(str.charAt(i));
    }
    return newStr.join('');
};

module.exports = reverseString;