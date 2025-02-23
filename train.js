//console.log('Jack Ma Quates');

//const list =[
 //   " being a good students", // 0-20
 //   "chose right manager and make alot of mistakes", // 20 -30
  //  "work for yourself", // 30 - 40
 //   "do what sort of things  you strong", // 40 - 50 
 //   "and now take rest , everything is too late " //60
//];


//function giveAdvice(a , callback) {
 //   if(typeof a !== "number" ) callback("insert a number", null);
 //   else if (a <= 20) callback(null, list[0]);
 //   else if (a > 20 && a <=30 ) callback(null, list[1]);
 //   else if (a > 30 &&a <= 40)  callback(null, list[2]);
 //   else if( a > 40 && a <= 50) callback(null, list[3]);
 //   else if( a > 50 && a <= 60) callback(null, list[4]);
 //   else{
  //      setTimeout (function () {
 //       callback(null, list[5]);
  //      }, 5000 );
   // }
//}
 // console.log('passed her 0');

//giveAdvice(40, (err, data) => {
 //   if (err) console.log("ERROR", err);//
 //  console.log("answe:",data);
//});
    
console.log('Jack Ma Quates');

const list =[
    " being a good students", // 0-20
    "chose right manager and make alot of mistakes", // 20 -30
    "work for yourself", // 30 - 40
    "do what sort of things  you strong", // 40 - 50 
    "and now take rest , everything is too late " //60
];


 async function giveAdvice(a , ) {
    if(typeof a !== "number" ) throw new Error("insert a number");
    else if (a <= 20)  return list [0];
    else if (a > 20 && a <=30 ) return  list[1];
    else if (a > 30 &&a <= 40)  return  list[2];
    else if( a > 40 && a <= 50) return list[3];
    else if( a > 50 && a <= 60)  return list[4];
    else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(list[5]);
            }, 5000);
            });
        }
    }
        
  

// then / catch 

 // console.log("passed her 0");
//giveAdvice(20)
//.then((data) => {
 //   console.log("answer:", data);
//})
//.catch((err) => {
//    console.log("ERROR:", err);
//});
// console.log("passed here 1 ");


//asyn/awit 

async function run(){  // using async function call qismida 
    let answer = await giveAdvice(20);
    console.log(answer);
    answer = await giveAdvice(31);
    console.log(answer);
    answer = await  giveAdvice(41);
    console.log(answer);
} 
run();
