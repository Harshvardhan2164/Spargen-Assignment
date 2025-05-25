import { useState, useEffect, useRef, useCallback } from "react";

const useVoiceSearch = (onTranscriptChange) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    const recognition = new SpeechRecognition();
    
    // Configuration
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    // Event handlers
    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        const result = event.results[0][0].transcript.trim();
        console.log("Speech recognition result:", result);
        setTranscript(result);
        
        if (onTranscriptChange && result) {
          onTranscriptChange(result);
        }
      }
    };

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
      
      // Handle specific errors
      switch (event.error) {
        case 'not-allowed':
          alert('Microphone access denied. Please allow microphone access and try again.');
          break;
        case 'no-speech':
          console.log('No speech detected. Please try again.');
          break;
        case 'audio-capture':
          alert('Microphone not found. Please check your microphone connection.');
          break;
        case 'network':
          alert('Network error occurred. Please check your internet connection.');
          break;
        default:
          console.log('Speech recognition error:', event.error);
      }
    };

    recognition.onnomatch = () => {
      console.log("No speech match found");
      setListening(false);
    };

    recognitionRef.current = recognition;

    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, []); // Remove onTranscriptChange from dependencies to avoid recreation

  const startListening = useCallback(() => {
    if (!isSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (recognitionRef.current && !listening) {
      try {
        // Request microphone permission explicitly
        navigator.mediaDevices?.getUserMedia({ audio: true })
          .then(() => {
            recognitionRef.current.start();
          })
          .catch((error) => {
            console.error("Microphone permission denied:", error);
            alert('Microphone access is required for voice search. Please allow microphone access.');
          });
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setListening(false);
        
        // Handle the case where recognition is already started
        if (error.name === 'InvalidStateError') {
          console.log('Speech recognition already started');
        }
      }
    }
  }, [listening, isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && listening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
        setListening(false);
      }
    }
  }, [listening]);

  const clearTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return { 
    transcript, 
    startListening, 
    stopListening, 
    listening, 
    clearTranscript,
    isSupported
  };
};

export default useVoiceSearch;