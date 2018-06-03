var DnaTranscriber = function (input) {}

DnaTranscriber.prototype.toRna = function (dna) {
    
    const rnaCompliments = {
        'G' : 'C',
        'C' : 'G',
        'T' : 'A',
        'A' : 'U'
    };
    
    return dna
        .split('')
        .map(function(nucleotide) {
            if (!rnaCompliments[nucleotide])
                throw new Error('Invalid input');
            return rnaCompliments[nucleotide];
        })
        .join('');
}

module.exports = DnaTranscriber;