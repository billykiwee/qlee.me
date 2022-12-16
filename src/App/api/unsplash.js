
export async function getUnsplashImage(type) {

    return fetch(`https://source.unsplash.com/1200x1800/?${type}`)
    .then(response => {   
        return response.url
    })
    .catch(e=> console.error(e))
}



/* 
const address = fetch(`https://source.unsplash.com/1200x1800/?${'nature'}`)
.then(response => {   
    return response.url
})
.catch(e=> console.error(e))

const getUnsplashImage = async () => {
    const a = await address;
};

console.log(  printAddress() ); */