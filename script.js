var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var resultPara = document.getElementById('speech');

var testBtn = document.querySelector('button');
var listen = true;

function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

function stopListening() {
  listen = false;
  if(!listen){
    testBtn.disabled = false;
    testBtn.textContent = 'Start';
  }
}

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Talking..';

  var recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    console.log(event);
    var speechResult = event.results[0][0].transcript;
    resultPara.innerText = speechResult+"";
    console.log('SpeechRecognition.onresult');
  }

  recognition.onspeechend = function() {
    recognition.stop();
    console.log('SpeechRecognition.onspeechend');
  }

  recognition.onerror = function(event) {
    //testBtn.disabled = false;
    console.log('SpeechRecognition.onerror');
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      if(listen)
        recognition.start();
      console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}

//testBtn.addEventListener('click', testSpeech);
