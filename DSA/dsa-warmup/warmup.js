function swap(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
  return [a, b];
}
// console.log(swap(3,2));

// Given a temperature temp and a scale scale, convert the temperature to the other scale.

// If scale is "C", then temp is in Celsius and you return the equivalent Fahrenheit value using F = temp * 9 / 5 + 32.

// If scale is "F", then temp is in Fahrenheit and you return the equivalent Celsius value using C = (temp - 32) * 5 / 9.

// Round the result to 2 decimal places.

/* 
Example 1:
Input: temp = 100, scale = "C"

Output: 212.00

Example 2:
Input: temp = 32, scale = "F"

Output: 0.00
*/

function temperature(temp, scale) {
  let res;
  if (scale?.toLowerCase() === "f") {
    res = ((temp - 32) * 5) / 9;
  } else {
    res = (temp * 9) / 5 + 32;
  }
  return res;
}
// console.log(temperature(202,'f'));

function interest(principal, rate, time) {
  let simpleInterest = ((principal * rate * time) / 100).toFixed(2);
  let compoundInterest = (
    principal * Math.pow(1 + rate / 100, time) -
    principal
  ).toFixed(2);
  return [simpleInterest, compoundInterest];
}
// console.log(interest(1000,5,2));
/*Given a non-negative integer totalSeconds, convert it into hours, minutes, and seconds.
Return the result as an array [hours, minutes, seconds], where hours is the number of whole hours, minutes is the number of whole minutes left over after the hours, and seconds is the number of seconds left over after the minutes. */
function seconds(totalseconds) {
  let leftsec;
  let hours = Math.trunc(totalseconds / 3600);
  leftsec = totalseconds % 3600;
  let min = Math.trunc(leftsec / 60);
  leftsec = leftsec % 60;
  console.log(hours, leftsec, min);
}
// seconds(86399);

function countDigits(n){
let count = 0;
while(n>0){
    n=Math.trunc(n/10);
    count++;
}
console.log(count);
}
// countDigits(10)

function sumofalldivisor(n){
    let sum = 0;
for(let i = 1 ; i<=n ; i++){
    if(n%i===0){
        sum+=i;
    }
}
return sum;
}
// console.log(sumofalldivisor(6));

function factorial(n){
  let result = 1;
  for(let i = 2 ; i<=n ; i++){
    result = result*i;
  }
  return result;
}
// console.log(factorial(5));

function fibonacci(n){
  let a = 0;
  let b = 1;
  let c;
  let result = [];
  for(let i = 2 ; i<=n ; i++){
    c = a + b;
    a = b;
    b = c;
    result.push(c);
  }
  return result;
}
// console.log(fibonacci(8));


// Array warmup questions
function largestEle(){
  let arr = [1,34,2,56,79,8,-23,-25];
  let max = -Infinity;
  for(let ele of arr){
    if(ele>max){
      max = ele;
    }
  }
  console.log(max);
}
// largestEle();

function secondlargest (){
    let arr = [1,341,2,280,79];
let max = arr[0];
let secondLargest = arr[1];
for(let i = 0 ; i<arr.length ; i++){
  if(arr[i] > max){
    secondLargest = max;
    max = arr[i];
  }else if(arr[i] > secondLargest){
    secondLargest = arr[i];
  }
    // console.log(i,secondLargest,max);

}
console.log(secondLargest);
}

// secondlargest();

function reverseinplace (){
      let arr = [1,2,3,4,5];
      let left = 0 ;
      let right = arr.length -1;
      while(left<=right){
        [arr[left],arr[right]] = [arr[right],arr[left]];
        left++;
        right--;
      }
console.log(arr);
}
// reverseinplace();

var isSorted = function(nums) {
      let sorted = false;
      if(nums.length<=1) return true;
  for(let i = 0 ; i <nums.length-1 ; i++){
     if(nums[i]>nums[i+1]){
      sorted = false;
      break;
     }else{
      sorted = true;
     }
  }
  return sorted;
};
// console.log(isSorted([1,2,3,4,56]));

function freqCount(){
  let arr = [1,2,2,3,8,5,6,5];
  let freq = {};
  for(let num of arr){
    if(freq[num]){
      freq[num]+=1;
    }else{
      freq[num] = 1;
    }
  }
  console.log(Object.entries(freq));
}
freqCount();