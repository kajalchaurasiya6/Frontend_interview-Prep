// count vowels and consonants in a string

function countVowelsAndConsonants(str) {
  let vowels = 0;
  let consonants = 0;
  for (let char of str) {
    if (char.match(/[aeiouAEIOU]/)) {
      vowels++;
    } else if (char.match(/[a-zA-Z]/)) {
      consonants++;
    }
  }
  console.log(`Vowels: ${vowels}, Consonants: ${consonants}`);
}
// countVowelsAndConsonants("Hello World");

// count words in a sentence

function wordCount(s) {
  if (s === "") return 0;
  // return s.split(' ')?.length;
  let count = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== " " && (i === 0 || s[i - 1] === " ")) {
      count++;
    }
  }
  return count;
}
// console.log(wordCount("This is for testing purpose"));

// check wether string is palindrome or not

function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  let palindrome = true;
  while (left <= right) {
    if (str[left] === str[right]) {
      right--;
      left++;
    } else {
      palindrome = false;
      break;
    }
  }
  return palindrome;
}

// console.log(isPalindrome('racecar'));

// occurrence of char in a string

function occurrence(str, c) {
  let count = 0;
  if (typeof str !== "string" || typeof c !== "string") return 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === c) {
      count++;
    }
  }
  return count;
}

// console.log(occurrence('banana','a'));

function replacechar(str, c) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      res+="_";
    } else {
      res += str[i];
    }
  }
  return res;
}
// console.log(replacechar("a b c", "_"));

// Toggle case of every character

function toggleChar (str){
    let res = "";
  for(let i = 0 ; i<str.length ; i++){
      if(str?.charCodeAt(i) >= 65 && str?.charCodeAt(i) <= 90){
       res+=str[i]?.toLowerCase();
      }else if (str?.charCodeAt(i) >= 97 && str?.charCodeAt(i) <= 122){
        res+= str[i]?.toUpperCase();
      }else{
        res+= str[i];
      }
  }
  return res;
}

// console.log(toggleChar('Hello World'));


function longestWord (s){
   const words = s.split(/\s+/).filter(w => w.length > 0);
    let best = "";
    for (const word of words) {
        if (word.length > best.length) {
            best = word;
        }
    }
    return best;
}
// console.log(longestWord('The longest word'))