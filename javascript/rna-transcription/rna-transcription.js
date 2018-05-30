var DnaTranscriber = function (input) {}

DnaTranscriber.prototype.toRna = function (dna) {

    const removeChars = {
        'G' : '',
        'C' : '',
        'T' : '',
        'A' : ''
    }

    const remainingChars = dna
        .replace(/G|C|T|A/g, function(match) {
            return removeChars[match];
        })

    if (remainingChars) {

        throw new Error('Invalid input');

    } else {
    
        const replaceChars = {
            'G' : 'C',
            'C' : 'G',
            'T' : 'A',
            'A' : 'U'
        }
        
        const rna = dna
            .replace(/G|C|T|A/g, function(match) {
                return replaceChars[match];
            })

        return rna;
    }
}

module.exports = DnaTranscriber;