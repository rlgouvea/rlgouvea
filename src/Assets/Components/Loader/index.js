import React from "react";
import styled, { keyframes } from "styled-components";
import ImageLoading from "../../img/imovel.jpg"

const Loading = () => {
  const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`;
  const Rotate = styled.div`
    display: absolute;    
    top: 50%;
    left: 50%;
    animation: ${rotate} 3s linear infinite;
    font-size: 1.2rem;
    /* border-top: 8px solid blue;
    border-right: 8px solid green;
    border-bottom: 8px solid red;
    border-left: 8px solid pink; */
    border-radius: 50%;
    width: 150px;
    height: 150px;
    transform: translate(-50%, -50%);
  `;
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
        zIndex: "99999",
        //backgroundColor: "white",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Rotate style={{backGroundImage: ImageLoading}}>
            <img 
            style={{
                width:"100%", 
                borderRadius:"100%",
                height:"100%",
                boxShadow: "0px 0px 50px black"
            }} 
            src={ImageLoading} alt=""
            />
        </Rotate>
      </h1>
    </div>
  );
};

export default Loading;
