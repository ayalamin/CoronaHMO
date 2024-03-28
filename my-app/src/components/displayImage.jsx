import React from 'react';
import { Buffer } from 'buffer';

const DisplayImage = (prop) => {
    console.log("the props is: ");
    console.log(prop.props)
    const imageData = prop.props;
    const blob = new Blob([Buffer.from(imageData)]);
    const imageUrl = URL.createObjectURL(blob);
    // const base64String = Buffer.from(imageData).toString('base64');
    // const imageUrl = `data:image/jpeg;base64,${base64String}`;
  
    console.log("the imageUrl is: ");
    console.log(imageUrl);
    return (
        <div>
            <img src={imageUrl} alt="" />
        </div>
    );
};


export default DisplayImage;