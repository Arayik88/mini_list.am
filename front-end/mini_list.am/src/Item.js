import React from 'react';
import "./CSS/styles.css";

export default function Item(props){
    return(
        <div onClick={props.onClick} className="item" style={{backgroundImage: `url(${props.imageURL})`, backgroundSize: "cover"}}>
            <div className='title'>
                <h5>{props.title}</h5>
                <p>{props.price}</p>
            </div>
        </div>
    );
}