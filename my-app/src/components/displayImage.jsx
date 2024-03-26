import React from 'react';

const DisplayImage = (props) => {
    // יצירת מערך של נתוני הסדרה בינארית מה Buffer
    const arrayBuffer = props;
    const bytes = new Uint8Array(arrayBuffer);
    const blob = new Blob([bytes], { type: 'image/jpeg/jpg' });

    // יצירת כתובת URL לתמונה
    const imageUrl = URL.createObjectURL(blob);
    console.log("the URL is: " + imageUrl)
    return (
        <div>
            {/* תצוגת התמונה */}
            <img src={imageUrl} alt="" />
        </div>
    );
};

export default DisplayImage;