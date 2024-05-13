const aiBtn = document.getElementById("aiBtn");
const output = document.querySelector(".output");
    
aiBtn.addEventListener('click', ()=>{
    search.classList.add("show-search");
    sendSpeech();
    output.focus();
    isSpeechEnabled = true;
});

output.addEventListener('click', ()=>{
    if(isSpeechEnabled) {
        sendSpeech();
    }
    output.value = '';
})

// searchClose.addEventListener("click", () => {
//     search.classList.remove("show-search");
//     recognition.stop();
// });

function sendSpeech() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    var diagnosticPara = document.querySelector('.output');

    recognition.grammars = new SpeechGrammarList();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        var speechResult = event.results[0][0].transcript.toLowerCase();
        console.log('Confidence: ' + event.results[0][0].confidence);
        console.log('Speech Result: ' + speechResult);
        diagnosticPara.value = speechResult;
    }
}
