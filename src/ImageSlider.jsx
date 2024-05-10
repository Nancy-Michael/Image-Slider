import React, { useEffect, useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import "./ImageSlider.css"

function ImageSlider({ url, limit = 5, page = 1 }) {

    const [images, setImages] = useState([]);
    const [currentSilde, setCurrentSlide] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function handlePrevious() {
        setCurrentSlide(currentSilde===0? images.length-1:currentSilde-1)
    }
    function handleNext() {
        setCurrentSlide(currentSilde===images.length-1?0:currentSilde+1)
    }

    async function imagesFetch(getUrl) {
        try {

           setLoading(true)
           const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data =await response.json();

           if (data) {
               setImages(data);
               setLoading(false);
           }
       } catch (e) {
           setError(e.message);
           setLoading(false);
       }
    }
    useEffect(() => {
        if (url !== "") imagesFetch(url);

    }, [url])

    if (loading) {
       return <div>data loading, Please Wait......</div>
    }
    if (error!==null) {
        return <div>There is an Error, Try agin later.....</div>
    }
  return (
      <div className='container'>
          <BsArrowLeftCircleFill onClick={handlePrevious}
              className='arrow arrow-left' />
          {
              images && images.length ? images.map((imageItem,index) =>
                  <img
                      key={imageItem.id}
                      src={imageItem.download_url}
                      alt={imageItem.download_url}
                      className={currentSilde===index?'current-img':'current-img hide-current-img'}
                  />
            )
            : null
          }
          <BsArrowRightCircleFill onClick={handleNext}
              className='arrow arrow-right' />

          <span className='circle-indecator'>
              {
                  images && images.length ? images.map((_, index) =>
                      <button
                          key={index}
                          onClick={()=>setCurrentSlide(index)}
                          className={currentSilde === index ? "current-indecator"
                              : " current-indecator update-current-indecator"}
                      ></button>
                )
                  : null
              }
          </span>

    </div>
  )
}

export default ImageSlider
