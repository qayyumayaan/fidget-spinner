// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Load the audio clip
const audioClipURL = 'spinnerAudio.m4a';
const audioClip = new Audio();
audioClip.src = audioClipURL;

// Create an AudioBufferSourceNode to play the audio clip
const audioSource = audioContext.createBufferSource();

// Create a GainNode to control the volume
const gainNode = audioContext.createGain();

// Connect the audio nodes
audioSource.connect(gainNode);
gainNode.connect(audioContext.destination);

// Load and decode the audio clip
const loadAudioClip = async () => {
  const response = await fetch(audioClipURL);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // Set the decoded audio buffer as the source for the audio node
  audioSource.buffer = audioBuffer;
};

// Function to play the audio clip
const playAudioClip = () => {
  audioSource.start(0);
};

// Function to adjust the volume based on the speed variable
const adjustVolume = (speed) => {
  // Calculate the volume based on the speed threshold
  const threshold = 50; // Adjust this value as needed
  const volume = Math.max(0, 1 - speed / threshold);

  // Set the volume using the gain node
  gainNode.gain.value = volume;
};

// Load the audio clip
loadAudioClip();

export { adjustVolume, playAudioClip };
