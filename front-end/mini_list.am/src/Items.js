import img from "./pics/download.jpg";
import Item from "./Item";
import React from 'react';
import "./CSS/styles.css";

export default function Items() {

    return (

        <div className="Items-container">
            <h1>My Items</h1>
            <div className="ItemList-container">
                {/*{state && state.map((x) => {*/}
                {/*    return  <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>*/}
                {/*})}*/}
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
                <Item onClick={() => alert("hello")} title="lav avto" price="$2.000" imageURL={img}/>
            </div>
        </div>
        
    )

}
