import React, { useState, useEffect } from 'react';
import "./styles/rating.css";

export default function Rating() {
    useEffect(() => {
        let numArr = [1, 2, 3, 4, 5], starsEl="", i;
        for(i = 0; i < 5; i++) {
            starsEl += "<span>★</span>"
        }
        let ratingsEl = document.querySelectorAll("div.rating");
        ratingsEl.forEach(e => {
            e.innerHTML = starsEl;
        })
    }, [])
    return (
        <>
            <div className="rating"></div>
        </>
    )
}
