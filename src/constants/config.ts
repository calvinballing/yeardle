export const CONFIG = {
  tries: 6, // This changes how many tries you get to finish the wordle
  language: 'Yeardle 2022', // This changes the display name for your language
  wordLength: 5, // This sets how long each word is based on how many characters (as defined in orthography.ts) are in each word
  author: 'Jim Hays', // Put your name here so people know who made this Wordle!
  authorWebsite: 'https://calvinballing.github.io', // Put a link to your website or social media here
  wordListSource: 'the original Wordle list', // Describe the source material for your words here
  //
  // THESE NEXT SETTINGS ARE FOR ADVANCED USERS
  //
  googleAnalytics: 'UA-97418582-1', // You can use this if you use Google Analytics
  shuffle: true, // whether to shuffle the words in the wordlist each time you load the app (note: you will lose the 'word of the day' functionality if this is true)
  normalization: 'NFC', // whether to apply Unicode normalization to words and orthography - options: 'NFC', 'NFD', 'NKFC', 'NKFD', false
}
