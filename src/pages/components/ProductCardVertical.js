import React from "react";

function ProductCardVertical({product}){
    return(
        <div style={{border: "solid 1px black", margin: "10px", padding: "10px"}}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <img src={product.main_image} alt="Kartinka" style = {{height:"100px"}}/>
            <p>{product.short_description}</p>
        </div>
    )
}

export default ProductCardVertical