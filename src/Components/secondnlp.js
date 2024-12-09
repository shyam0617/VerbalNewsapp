import React, { useEffect, useState, useRef } from 'react';
import nlp from 'compromise'; // Install via `npm install compromise`
import Fuse from 'fuse.js'; // Install via `npm install fuse.js`

const VoiceIntegration = ({ articles, onNavigate, mode, setHighlightedIndex, handlePageChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isReadingNews, setIsReadingNews] = useState(false);
  const currentIndexRef = useRef(-1);
  const articleRefs = useRef([]);

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

      // Preprocess the text for better recognition
      const normalizedTranscript = preprocessText(transcript);
      console.log(`Normalized Command: ${normalizedTranscript}`);

      // Process the command
      handleVoiceCommand(normalizedTranscript);
    };

    speechRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      alert('An error occurred during speech recognition. Please try again.');
    };

    setRecognition(speechRecognition);

    return () => {
      speechRecognition.stop();
    };
  }, [articles, onNavigate]);

  const preprocessText = (text) => {
    const doc = nlp(text);
    return doc.verbs().toInfinitive().out('text') + ' ' + doc.nouns().out('text');
  };

  const handleVoiceCommand = (transcript) => {
    const commands = [
      { intent: 'read_news', phrases: ['read news', 'reed news'] },
      { intent: 'read_article', phrases: ['read article', 'reed article', 'read arcticle'] },
      { intent: 'stop_reading', phrases: ['stop reading', 'halt reading', 'pause reading'] },
      { intent: 'navigate_sports', phrases: ['go to sports section', 'open sports'] },
      { intent: 'navigate_home', phrases: ['go to home section', 'open home'] },
     
      { intent: 'next_article', phrases: ['next article', 'next'] },
      { intent: 'previous_article', phrases: ['previous article', 'previous'] },
      { intent: 'move_to_next_page', phrases: ['next page', 'move to next page'] },
      { intent: 'move_to_previous_page', phrases: ['previous page', 'move to previous page'] }
    ];

    const fuse = new Fuse(commands, {
      keys: ['phrases'],
      threshold: 0.4, // Allows flexibility for fuzzy matches
    });

    const match = fuse.search(transcript)[0];
    if (match) {
      switch (match.item.intent) {
        case 'read_news':
          readNews();
          break;
        case 'read_article':
          const articleIndex = extractArticleIndex(transcript);
          readArticle(articleIndex);
          break;
        case 'stop_reading':
          recognition.stop();
          setIsListening(false);
          window.speechSynthesis.cancel();
          break;
        case 'navigate_sports':
          onNavigate('sports');
          break;
        case 'navigate_home':
          onNavigate('home');
          break;
        case 'read_description':
          handleReadDescription(transcript);
          break;
        case 'next_article':
          handleNextArticle();
          break;
        case 'previous_article':
          handlePreviousArticle();
          break;
        case 'move_to_next_page':
          handlePageChange('next');
          break;
        case 'move_to_previous_page':
          handlePageChange('prev');
          break;
        default:
          handleUnknownCommand();
      }
    } else {
      handleUnknownCommand();
    }
  };

  const extractArticleIndex = (text) => {
    const numberWords = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
    };

    const doc = nlp(text);
    const numbers = doc.values().toNumber().out('array');

    if (numbers.length > 0) {
      return parseInt(numbers[0], 10) - 1; // Index is zero-based
    }

    for (const word in numberWords) {
      if (text.includes(word)) {
        return numberWords[word] - 1;
      }
    }

    return -1; // Return -1 if no number is found
  };

  const readNews = () => {
    const firstArticle = articles[0];
    if (firstArticle) {
      speakText(firstArticle.title);
    }
  };

  const readArticle = (index) => {
    if (index >= 0 && index < articles.length) {
      speakText(articles[index].title);
      setCurrentIndex(index);
    } else {
      speakText('Article not found.');
    }
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(utterance);
  };

  const handleReadDescription = (transcript) => {
    const index = extractArticleIndex(transcript);
    if (index >= 0 && index < articles.length) {
      speakText(articles[index].description || 'No description available.');
    } else {
      speakText('Description not found.');
    }
  };

  const handleNextArticle = () => {
    const currentIndex = currentIndexRef.current;
    console.log(currentIndex);
    if (currentIndex + 1 < articles.length) {
      setCurrentIndex(currentIndex + 1);
      readArticle(currentIndex + 1);
    } else {
      speakText('No more articles available.');
    }
  };

  const handlePreviousArticle = () => {
    const currentIndex = currentIndexRef.current;
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
      readArticle(currentIndex - 1);
    } else {
      speakText('No previous articles available.');
    }
  };

  const setCurrentIndex = (index) => {
    currentIndexRef.current = index;
    setHighlightedIndex(index);
    if (articleRefs.current[index]) {
      articleRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleUnknownCommand = () => {
    speakText("I couldn't understand the command. Please try again.");
  };

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
    <div className="voice-icon-container">
      <svg
        onClick={toggleListening}
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill={isListening ? 'green' : 'white'}
        stroke={isListening ? 'green' : 'black'}
        strokeWidth="2"
        className="voice-icon"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="12" x2="12" y2="18" />
      </svg>
    </div>
  );
};

export default VoiceIntegration;
