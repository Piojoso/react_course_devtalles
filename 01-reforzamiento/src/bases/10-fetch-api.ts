import type { GiphyRandomResponse } from "../data/giphy.response"

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

const getGiphyData = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`)

const createImageElement = (imageSrc: string) => {
    const imgElement = document.createElement('img')
    imgElement.src = imageSrc

    document.body.append(imgElement)
}

getGiphyData
    .then((response) => response.json())
    .then(({ data }: GiphyRandomResponse) => {
        // const imageUrl = data.data.images.original.url
        const imageUrl = data.images.original.url

        createImageElement(imageUrl)
    })
    .catch((error) => console.error(error))