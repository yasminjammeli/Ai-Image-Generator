import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'


const ImageGenerator = () => {
  const [image_url, setImageUrl] = useState("/");
  let inputRef = useRef(null);
  const [loading,setLoading]= useState(false)
  const imageGenerator = async () =>{
    if(inputRef.current.value===""){
      return 0;
    }
    setLoading(true)
    const response = await fetch(
      "http://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer Your-Key",
          "User-Agent":"Chrome"
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512"
        }),
      }

    );
    let data = await response.json();
    let data_array = data.data;
    setImageUrl(data.data[0].url);
    setLoading(false);
  
  }
  return (
    <div className='ai-image-generator'>
      <div className="header">Ai image <span>generator</span></div>
      <div className="img-loading">
        <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" /></div>
        <div className="loading">
          <div className={loading?"loading-bar-full":"loading-bar"}></div>
          <div className={loading?"loading-text":"display-none"}>Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See!' />
        <div className="generator-btn" onClick={()=>{imageGenerator()}}>Generator</div>
      </div>
    </div>
  )
}

export default ImageGenerator
