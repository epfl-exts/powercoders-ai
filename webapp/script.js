
async function guess() {

    // Load language, vocabulary and text
    var languages = JSON.parse(document.getElementById("languages").value)
    var vocabulary = JSON.parse(document.getElementById("vocabulary").value)
    var text = document.getElementById("text").value

    // Encode text
    var text_encoded = new Array(vocabulary.length).fill(0);
    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < vocabulary.length; j++) {
            ngram = vocabulary[j]
            if (text.substr(i, ngram.length) === ngram) {
                text_encoded[j] += 1
            }
        }
    }

    // Make predictions!
    const model = await tf.loadLayersModel('../python-code/tfjs-model/model.json');
    const preds_tensor = model.predict(tf.tensor(text_encoded, shape=[1, vocabulary.length]))

    // Print them
    preds_tensor.data().then(function(probs) {
        output = ''
        for (var i = 0; i < languages.length; i++) {
            var spaces = ' '.repeat(15 - languages[i].length)
            output += languages[i] + spaces + (100*probs[i]).toFixed(2) + '%<br />'
        }
        document.getElementById("prediction").innerHTML = output
    });
}
