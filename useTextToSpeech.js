import { useEffect, useState } from 'react';

export const useTextToSpeech = (text) => {
  const [utterance, setUtterance] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);
    return () => synth.cancel();
  }, [text]);

  const convertTextToSpeakableVersion = () => {
    const synth = window.speechSynthesis;
    if (!utterance) return;

    if (isPaused) {
      synth.resume();
    } else {
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  return { speak, isPaused };
};
/*
How to Use:
useTextToSpeech is a custom React hook that enables voice playback of any text string.
Pass in the text you want to speak, and call the returned convertTextToSpeakableVersion() function to trigger it.
It automatically sets up and cleans up the speech synthesis utterance. Ideal for accessibility, chatbot replies,
  or audio-enhanced UI elements. Works best in modern browsers with SpeechSynthesis support.
Example:
import { useTextToSpeech } from './hooks/useTextToSpeech';
const TextToSpeechButton = ({ text, style }) => {
  const { convertTextToSpeakableVersion } = useTextToSpeech(text);
  return ( <Button style={convertTextToSpeakableVersion} onClick={speak}/> );
};
*/
