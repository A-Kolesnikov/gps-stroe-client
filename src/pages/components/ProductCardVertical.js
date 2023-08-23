import React from "react";

function ProductCardVertical({product}){
    return(
        <div 
        style={{border: "solid 1px black", margin: "10px", padding: "10px", height: "600px"}}>
            <h3>{product.name}</h3>
            <p className="fs-4">${product.price}</p>
            <img src={product.main_image} alt="Kartinka" style = {{display:"block", height:"150px", margin:"0 auto"}}/>
            <p>{product.short_description}</p>
        </div>
    )
}

export default ProductCardVertical