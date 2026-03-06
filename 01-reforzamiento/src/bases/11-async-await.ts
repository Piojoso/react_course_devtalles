import type { GiphyRandomResponse } from "../data/giphy.response"

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

const createImageElement = (imageSrc: string) => {
    const imgElement = document.createElement('img')
    imgElement.src = imageSrc

    document.body.append(imgElement)
}

const getRandomGifUrl = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`)

    const { data } = (await response.json()) as GiphyRandomResponse

    return data.images.original.url
}

const imageUrl = await getRandomGifUrl()
createImageElement(imageUrl)