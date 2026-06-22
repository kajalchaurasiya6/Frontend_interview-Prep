/* n = 4

*
**
***
**** */
function rightangle(n) {
  let res = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      res += "*";
    }
    res += "\n";
  }
  console.log(res);
}
// rightangle(4);

/* 
n = 4

****
***
**
*
          */
function invertedrightangle(n) {
  let res = "";
  for (let i = n; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      res += "*";
    }
    res += "\n";
  }
  console.log(res);
}
// invertedrightangle(4);

/* 
n = 3

  *
 ***
*****
      */

function pyramid(n) {
  let res = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      res += " ";
    }
    for (let j = 0; j <= 2 * i; j++) {
      res += "*";
    }

    res += "\n";
  }
  console.log(res);
}
// pyramid(4);

function invertedpyramid(n) {
  let res = "";
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < n - i - 1; j++) {
      res += " ";
    }
    for (let j = 0; j <= 2 * i; j++) {
      res += "*";
    }

    res += "\n";
  }
  console.log(res);
}
// invertedpyramid(4);

function hollowsquare(n) {
  let res = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === n - 1) {
        res += "* ";
      }else if(j===0 || j===n-1){
          res+="* ";
      }else{
        res+="  ";
      }
    }
    res+='\n';
  }
  console.log(res);
}
// hollowsquare(4);

/*
n = 3

Row 1:  1
Row 2:  2  3
Row 3:  4  5  6
       */
function floyd(n){
let res = "";
let count = 1;
for(let i = 0 ; i<n ; i++){
    for(let j = 0 ; j<=i ; j++){
       res+=`${count++} `
    }
    res += '\n';
}
console.log(res);
}
floyd(3)