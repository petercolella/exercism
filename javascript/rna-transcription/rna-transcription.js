var DnaTranscriber = function (input) {
    
    // this.dna = input;
}

DnaTranscriber.prototype.toRna = function (dna) {

    // var strand = this.dna;
    let rna = '';

    for (i = 0; i <= dna.length; i++) {
        if (dna[i] === 'G') {
            rna.replace(i, 'C');
        } else if (dna[i] === 'C') {
            rna.replace(i, 'G');
        } else if (dna[i] === 'T') {
            rna.replace(i, 'A');
        } else if (dna[i] === 'A') {
            rna.replace(i, 'U');
        }
    }
    return dna, rna;
}

module.exports = DnaTranscriber;