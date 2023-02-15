import { useState, useEffect } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'

const AboutUs = () => {
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)

  const fetchAboutUsData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about-us`)
      .then(response => {
        setDescription(response.data.description)
        setImageUrl(response.data.imageUrl)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  useEffect(() => {
    fetchAboutUsData()
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <article>
        <h1>About Us</h1>
        {error && <p className="AboutUs-error">{error}</p>}
        {!loaded && <img src={loadingIcon} alt="loading" />}
        <p>{description}</p>
        <img src={imageUrl} alt="us" />
      </article>
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
