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
console.log(sumofalldivisor(6));