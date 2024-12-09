import React, { useEffect, useState } from 'react';

const VoiceIntegration = ({ articles, onNavigate, mode }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in your browser.');
      return;
    }

    const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = false;

    speechRecognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log(`Voice Command: ${transcript}`);

      if (transcript.includes('read news')) {
        const firstArticle = articles[0];
        if (firstArticle) {
          const utterance = new SpeechSynthesisUtterance(firstArticle.title);
          utterance.voice = window.speechSynthesis.getVoices()[0];
          window.speechSynthesis.speak(utterance);
        }
      } else if (transcript.includes('read description')) {
        const index = parseInt(transcript.split('read description ')[1], 10) - 1;
        if (articles[index]) {
          const utterance = new SpeechSynthesisUtterance(articles[index].description || 'No description available.');
          utterance.voice = window.speechSynthesis.getVoices()[0];
          window.speechSynthesis.speak(utterance);
        }
      } else if (transcript.includes('read article')) {
        const index = parseInt(transcript.split('read article ')[1], 10) - 1;
        if (articles[index]) {
          const utterance = new SpeechSynthesisUtterance(articles[index].title);
          utterance.voice = window.speechSynthesis.getVoices()[0];
          window.speechSynthesis.speak(utterance);
        }
      } else if (transcript.includes('go to sports section')) {
        onNavigate('sports');
      } else if (transcript.includes('go to business section')) {
        onNavigate('business');
      } else if (transcript.includes('go to entertainment section')) {
        onNavigate('entertainment');}
        else if (transcript.includes('go to home section')) {
          onNavigate('home');
      } else if (transcript.includes('stop reading')) {
        window.speechSynthesis.cancel();
      }
    };

    setRecognition(speechRecognition);

    return () => {
      speechRecognition.stop();
    };
  }, [articles, onNavigate]);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div>
      <button
        onClick={toggleListening}
        className={`btn btn-${mode === 'dark' ? 'light' : 'dark'}`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

export default VoiceIntegration;
