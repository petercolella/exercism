//
// This is only a SKELETON file for the "Leap" exercise. It's been provided as a
// convenience to get you started writing code faster.
//

var Year = function (input) {
    
    this.year = input
};

Year.prototype.isLeap = function () {

    let yr = this.year;

    return (yr %4 === 0) && (yr %100 !== 0) || (yr %400 === 0);
};

module.exports = Year;
