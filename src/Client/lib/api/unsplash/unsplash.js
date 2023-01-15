import { useEffect, useState } from "react";

export function GetUnsplashImage(subject) {

  const [img, setImg] = useState({})

  async function fetchImg() {
    const apiKey = 'kj408nn4kDTQyU-H3nyemQ3bPkqEJf7CS5wUvAHNy0I'
    const url = `https://api.unsplash.com/photos/random?query=${subject}`
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${apiKey}`
      }
    });
    const data = await response.json()

    setImg({
      url       : data.urls.regular,
      author    : data.user.name,
      profileUrl: data.user.links.html
    })
  }

  useEffect(e=> {
    fetchImg()

  }, [subject])

  img.url && return img
}