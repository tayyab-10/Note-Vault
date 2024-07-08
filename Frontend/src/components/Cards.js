import React from 'react';

const Cards = (props) => {
  return (
    <>
          <div style={{border:"none"}} className="card mb-4">
            <div className="card-body">
              <h5 style={{color:"rgba(85, 85, 255, 1)",fontSize:"25px",fontWeight:"700"}} className="card-title">{props.title}</h5>
              <p style={{color:"rgba(140, 139, 153)",fontSize:"17px"}} className="card-text mt-3">
               {props.description}
              </p>
            </div>
          </div>   
         
    </>
  );
};

export default Cards;