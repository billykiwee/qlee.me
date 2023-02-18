import React from "react"


export function ArrayLesson() {



const array = [1,5,10,3,6]


const sumArray = array.reduce((acc, currentV)=>{
    return acc + currentV
})

console.log(sumArray) 
// 25 qui est la somme des valeurs du tableau 


}
