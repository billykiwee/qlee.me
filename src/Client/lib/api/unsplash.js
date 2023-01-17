import { useEffect, useState } from "react";

export function GetUnsplashImage(subject) {

  const apiKey = 'kj408nn4kDTQyU-H3nyemQ3bPkqEJf7CS5wUvAHNy0I'
  const url = `https://api.unsplash.com/photos/random?query=${subject}`

  async function fetchImg() {

    try {
    
      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${apiKey}`
        }
      })

      const data = await response.json()
  
      return {
        url       : data.urls.regular,
        author    : data.user.name,
        profileUrl: data.user.links.html
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(e=> {
    fetchImg()

    console.log(fetchImg());
  }, [])
}