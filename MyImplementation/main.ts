// take a csv file as input and convert it to json format
const fs = require('fs');

const Add = (a:number, b:number) => {
    return a + b;
};
const Subtract = (a:number, b:number) => a - b;
const Multiply = (a:number, b:number) => a * b;
const Divide = (a:number, b:number) => a / b;


const extractValues = (expression:string[]) => {
    // this func assumes that the expression is in the format of "A1 + B2" where A and B are column names and 1 and 2 are row numbers
    // and rn no support for nested functions like "A1 + B2 * C3" or "A1 + (B2 * C3)"
    const col_1 = expression[0];
    const index1 = parseInt(col_1[col_1.length - 1]);
    let val1 = parseInt(jsonData[index1-1][col_1[0]]);

    const col_2 = expression[1];
    const index2 = parseInt(col_2[col_2.length - 1]);
    let val2 = parseInt(jsonData[index2-1][col_2[0]]);
    return {val1, val2} as {val1: number, val2: number};
}

const csvFilePath = process.argv[2] || './input.csv';

const csv = fs.readFileSync(csvFilePath, 'utf-8');

const lines = csv.split('\n');
const headers = lines[0].split(',').map((header:string) => header.trim());

const operators: string[] = [
    '+',
    '-',
    '*',
    '/',
];

let jsonData = lines.slice(1).map(((line:string) => {
  const values = line.split(',').map((value:string) => value.trim());
  const obj: any = {};
  headers.forEach((header:string, index:number) => {
    obj[header] = values[index];
  });
  return obj;
}));


jsonData.map((obj:any) => {
    for (const key in obj) {
        if(obj[key].startsWith('=')){
            const expression = obj[key].substring(1).split('');
            let result = 0;
            expression.map((char:string) => {
                if(operators.includes(char)){
                    switch(char){
                        case '+':
                            {
                                const values_to_extract = obj[key].substring(1).split(char);
                                const { val1, val2 } = extractValues(values_to_extract);
                                result = Add(val1, val2);
                                break;
                            }
                        case '-':
                            {
                                const values_to_extract = obj[key].substring(1).split(char);
                                const { val1, val2 } = extractValues(values_to_extract);
                                result = Subtract(val1, val2);
                                break;
                            }
                        case '*':
                            {
                                const values_to_extract = obj[key].substring(1).split(char);
                                const { val1, val2 } = extractValues(values_to_extract);
                                result = Multiply(val1, val2);
                                break;
                            }
                        case '/':
                            {
                                const values_to_extract = obj[key].substring(1).split(char);
                                const { val1, val2 } = extractValues(values_to_extract);
                                result = Divide(val1, val2);
                                break;
                            }
                    }
                }
            });
            console.log('obj key is ', obj[key]);
            obj[key] = result.toString();
        } else {
            obj[key] = obj[key];
        }
    }
});

const outputCsv = [headers.join(',')].concat(jsonData.map((obj:any) => {
    return headers.map((header:string) => obj[header]).join(',');
})).join('\n');

const outputFilePath = process.argv[3] || './output.csv';
fs.writeFileSync(outputFilePath, outputCsv);