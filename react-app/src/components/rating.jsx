import React, { useState, useEffect } from 'react';
import "./styles/rating.css";

export default function Rating(props) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        let starsEl = "★".repeat(rating);
        let emptyStarsEl = "☆".repeat(5 - rating);
        let ratingsEl = document.querySelectorAll(`div.rating#${props.id}`);
        ratingsEl.forEach(e => {
            e.innerHTML = `${starsEl}${emptyStarsEl}`;
        });
    }, [rating]);
    
    const handleRatingClick = (newRating) => {
        setRating(newRating);
        localStorage.setItem(props.id, newRating);
    };
    useEffect(() => {
        let value = localStorage.getItem(props.id);
        setRating(value);
    }, [])
    return (
        <div className="rating" id={props.id} onClick={() => handleRatingClick(rating + 1)}>
            {/* Ratings will be displayed here */}
        </div>
    );
}
