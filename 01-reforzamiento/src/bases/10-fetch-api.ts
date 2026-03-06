const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

const getGiphyData = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`)

getGiphyData
    .then((response) => response.json())
    .then((data) => {
        const imageUrl = data.data.images.original.url

        const imgElement = document.createElement('img')
        imgElement.src = imageUrl

        document.body.append(imgElement)
    })
    .catch((error) => console.error(error))