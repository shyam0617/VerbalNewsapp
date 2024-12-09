// import React, { useEffect, useState } from 'react';
// import nlp from 'compromise'; // Install via `npm install compromise`
// import Fuse from 'fuse.js'; // Install via `npm install fuse.js`

// const VoiceIntegration = ({ articles, onNavigate, mode }) => {
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//       alert('Speech Recognition is not supported in your browser.');
//       return;
//     }

//     const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     speechRecognition.continuous = true;
//     speechRecognition.interimResults = false;

//     speechRecognition.onresult = (event) => {
//       const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
//       console.log(`Voice Command: ${transcript}`);

//       // Process transcript using NLP and fuzzy matching
//       handleVoiceCommand(transcript);
//     };

//     setRecognition(speechRecognition);

//     return () => {
//       speechRecognition.stop();
//     };
//   }, [articles, onNavigate]);

//   const handleVoiceCommand = (transcript) => {
//     const commands = [
//       { intent: 'read_news', phrases: ['read news', 'reed news'] },
//       { intent: 'read_article', phrases: ['read article', 'red article', 'reed article', 'read arcticle'] },
//       { intent: 'stop_reading', phrases: ['stop reading', 'halt reading', 'pause reading'] },
//       { intent: 'navigate_sports', phrases: ['go to sports section', 'open sports'] },
//       { intent: 'navigate_home', phrases: ['go to home section', 'open home'] },
//     ];

//     const fuse = new Fuse(commands, {
//       keys: ['phrases'],
//       threshold: 0.4, // Allows flexibility for fuzzy matches
//     });

//     const match = fuse.search(transcript)[0];
//     if (match) {
//       switch (match.item.intent) {
//         case 'read_news':
//           readNews();
//           break;
//         case 'read_article':
//           const articleIndex = extractNumber(transcript);
//           readArticle(articleIndex);
//           break;
//         case 'stop_reading':
//           window.speechSynthesis.cancel();
//           break;
//         case 'navigate_sports':
//           onNavigate('sports');
//           break;
//         case 'navigate_home':
//           onNavigate('home');
//           break;
//         default:
//           console.log('Command not recognized.');
//       }
//     } else {
//       console.log('No matching command found.');
//     }
//   };

//   const extractNumber = (text) => {
//     const numberWords = {
//       one: 1,
//       two: 2,
//       three: 3,
//       four: 4,
//       five: 5,
//       six: 6,
//       seven: 7,
//       eight: 8,
//       nine: 9,
//       ten: 10,
//     };

//     // Use NLP to extract numbers or match words like "one", "two"
//     const doc = nlp(text);
//     const number = doc.values().numbers()[0]; // Extract numerical values
//     if (number !== undefined) return number;

//     // Fallback for word-based numbers
//     for (const word in numberWords) {
//       if (text.includes(word)) return numberWords[word];
//     }

//     return -1; // No number found
//   };

//   const readNews = () => {
//     const firstArticle = articles[0];
//     if (firstArticle) {
//       speakText(firstArticle.title);
//     }
//   };

//   const readArticle = (index) => {
//     if (index > 0 && articles[index - 1]) {
//       speakText(articles[index - 1].title);
//     } else {
//       speakText('Article not found.');
//     }
//   };

//   const speakText = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.voice = window.speechSynthesis.getVoices()[0];
//     window.speechSynthesis.speak(utterance);
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//       setIsListening(false);
//     } else {
//       recognition.start();
//       setIsListening(true);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={toggleListening}
//         className={`btn btn-${mode === 'dark' ? 'light' : 'dark'}`}
//       >
//         {isListening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//     </div>
//   );
// };

// export default VoiceIntegration;

// import React, { useEffect, useState } from 'react';
// import nlp from 'compromise'; // Install via `npm install compromise`
// import Fuse from 'fuse.js'; // Install via `npm install fuse.js`

// const VoiceIntegration = ({ articles, onNavigate, mode }) => {
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//       alert('Speech Recognition is not supported in your browser.');
//       return;
//     }

//     const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     speechRecognition.continuous = true;
//     speechRecognition.interimResults = false;

//     speechRecognition.onresult = (event) => {
//       const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
//       console.log(`Voice Command: ${transcript}`);

//       // Process transcript using NLP and fuzzy matching
//       handleVoiceCommand(transcript);
//     };

//     setRecognition(speechRecognition);

//     return () => {
//       speechRecognition.stop();
//     };
//   }, [articles, onNavigate]);

//   const handleVoiceCommand = (transcript) => {
//     const commands = [
//       { intent: 'read_news', phrases: ['read news', 'reed news'] },
//       { intent: 'read_article', phrases: ['read article', 'reed article', 'read arcticle'] },
//       { intent: 'stop_reading', phrases: ['stop reading', 'halt reading', 'pause reading'] },
//       { intent: 'navigate_sports', phrases: ['go to sports section', 'open sports'] },
//       { intent: 'navigate_home', phrases: ['go to home section', 'open home'] },
//     ];

//     const fuse = new Fuse(commands, {
//       keys: ['phrases'],
//       threshold: 0.4, // Allows flexibility for fuzzy matches
//     });

//     const match = fuse.search(transcript)[0];
//     if (match) {
//       switch (match.item.intent) {
//         case 'read_news':
//           readNews();
//           break;
//         case 'read_article':
//           const articleIndex = extractNumber(transcript); // Use the updated extractNumber
//           readArticle(articleIndex);
//           break;
//         case 'stop_reading':
//           window.speechSynthesis.cancel();
//           break;
//         case 'navigate_sports':
//           onNavigate('sports');
//           break;
//         case 'navigate_home':
//           onNavigate('home');
//           break;
//         default:
//           console.log('Command not recognized.');
//       }
//     } else {
//       console.log('No matching command found.');
//     }
//   };

//   const extractNumber = (text) => {
//     const numberWords = {
//       one: 1,
//       two: 2,
//       too: 2, 
//       to:2,// Additional match for "too"
//       three: 3,
//       four: 4,
//       fore: 4, // Additional match for "fore"
//       five: 5,
//       six: 6,
//       seven: 7,
//       eight: 8,
//       nine: 9,
//       nin:9,
//       ten: 10,
//     };

//     // Use NLP to extract numbers or match words like "one", "two"
//     const doc = nlp(text);
//     const extractedNumber = doc.values().toNumber().out(); // Extract numerical values
//     if (extractedNumber) return parseInt(extractedNumber, 10);

//     // Fallback for word-based numbers
//     for (const word in numberWords) {
//       if (text.includes(word)) return numberWords[word];
//     }

//     return -1; // No number found
//   };

//   const readNews = () => {
//     const firstArticle = articles[0];
//     if (firstArticle) {
//       speakText(firstArticle.title);
//     }
//   };

//   const readArticle = (index) => {
//     console.log(index);
//     if (index > 0 && articles[index - 1]) {
//       speakText(articles[index - 1].title);
//     } else {
//       speakText('Article not found.');
//     }
//   };

//   const speakText = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.voice = window.speechSynthesis.getVoices()[0];
//     window.speechSynthesis.speak(utterance);
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//       setIsListening(false);
//     } else {
//       recognition.start();
//       setIsListening(true);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={toggleListening}
//         className={`btn btn-${mode === 'dark' ? 'light' : 'dark'}`}
//       >
//         {isListening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//     </div>
//   );
// };

// export default VoiceIntegration;
/****************************************************************Nlp translation********************************************** */
import React, { useEffect, useState } from 'react';
import nlp from 'compromise'; // Install via `npm install compromise`
import Fuse from 'fuse.js'; // Install via `npm install fuse.js`

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

      // Preprocess the text for better recognition
      const normalizedTranscript = preprocessText(transcript);
      console.log(`Normalized Command: ${normalizedTranscript}`);

      // Process the command
      handleVoiceCommand(normalizedTranscript);
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
          console.log(`Article Index: ${articleIndex}`);
          readArticle(articleIndex);
          break;
        case 'stop_reading':
          window.speechSynthesis.cancel();
          break;
        case 'navigate_sports':
          onNavigate('sports');
          break;
        case 'navigate_home':
          onNavigate('home');
          break;
        default:
          console.log('Command not recognized.');
      }
    } else {
      console.log('No matching command found.');
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

    // Use NLP to extract numbers
    const doc = nlp(text);
    const numbers = doc.values().toNumber().out('array'); // Extract numerical values

    if (numbers.length > 0) {
      return parseInt(numbers[0], 10);
    }

    // Fallback for word-based numbers
    for (const word in numberWords) {
      if (text.includes(word)) {
        return numberWords[word];
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
    console.log(`Extracted index: ${index}`);
    if (index > 0 && articles[index - 1]) {
      console.log(`Reading article at index: ${index - 1}`);
      speakText(articles[index - 1].title);
    } else {
      console.log('Article not found.');
      speakText('Article not found.');
    }
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(utterance);
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
