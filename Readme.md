this is my implementation or just an atempt of making of what Tsoding was doing in his live stream 
[Check his YT video ](https://youtu.be/HCAgvKQDJng)

This goal of this project is to make a program that takes a csv file as an input and return a csv file output with resolved functions inside the input file

***./input.csv***
| A      | B      |
|--------|--------|
| 1      | 2      |
| 3      | 4      |
| =A1+B1 | =A2+B2 |

***./output.csv***
| A | B |
|---|---|
| 1 | 2 |
| 3 | 4 |
| 3 | 7 |

*I am trying to implement my own solution before implementing Tsod's sol and compare where i go wrong/off-track*


## So far my understanding
let's say we have this expression =A1+B1 i.e if we take substring(1) then we get A1+B1 here the thing to notice is A is the col name 1 is the index of the actual value we need to compute then comes the operator.

April 1st 2026 
- rn my sol assumes there are only 2 col in the csv file and the expression only containes one operator
  and 2 operands