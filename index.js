// 1. callback (emp database)
// 2. callback hell
// 3. promise chaining and promise based implementation
// 4. async await. (syntactic sugar)
// 5. self initializing function

// 1. read the text of the breed from the dog.txt file
// 2. hit the api with that breed and get the image.
// 3. same that image to the dod-image.txt

var fs = require('fs')
const superagent = require('superagent')

function readFilePromise(fileLocation) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileLocation, (err, breed) => {
      if (err) {
        reject('not able to read the file')
      }
      resolve(breed)
    })
  })
}
function writeFilePromise(fileLocation, result) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileLocation, result, (err) => {
      if (err) {
        reject('not able to write to the file')
      }
      resolve()
    })
  })
}

// 3. async await

async function getDogPic() {
  try {
    const breed = await readFilePromise('./dog.txt')
    console.log(`dog breed is ${breed}`)
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    )
    console.log('breed image is ', res.body.message)
    await writeFilePromise('./dog-image.txt', res.body.message)
    console.log('sucessfully written the file')
  } catch (err) {
    throw err
  }
  console.log('2. complete')
}
console.log('1. start')
;(async () => {
  try {
    await getDogPic()
    console.log('3. end')
  } catch (err) {
    console.log('3. end due to error')
  }
})()

// getDogPic().then(() => {
//   console.log('3. end')
// })

// 2. promise

// readFilePromise('./dogg.txt')
//   .then((breed) => {
//     console.log(`dog breed is ${breed}`)
//     return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`)
//   })
//   .then((res) => {
//     console.log('breed image is ', res.body.message)
//     return writeFilePromise('./dog-image.txt', res.body.message)
//   })
//   .then(() => {
//     console.log('sucessfully written the file')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//1. callback hell

// fs.readFile('./dog.txt', (err, breed) => {
//   if (err) {
//     console.err('error in reading the file', err)
//   }
//   console.log(`dog breed is ${breed}`)
//   superagent
//     .get(`https://dog.ceo/api/breed/${breed}/images/random`)
//     .then((res) => {
//       console.log('breed image is ', res.body.message)
//       fs.writeFile('./dog-image.txt', res.body.message, () => {
//         console.log('sucessfully written the file')
//       })
//     })
// })
