var DnaTranscriber = function (input) {}

DnaTranscriber.prototype.toRna = function (dna) {

    const replaceChars = {
        'G' : 'C',
        'C' : 'G',
        'T' : 'A',
        'A' : 'U'
    };
    
    const rna = dna
        .replace(/G|C|T|A/g, function(match) {
            return replaceChars[match];
        });

    return rna;
}

module.exports = DnaTranscriber;