import React, { useContext } from 'react';
import { ItemContext } from '../App';



const Cart = () => {
  const [data , setData] = useContext(ItemContext);
  var sum = 0;

  const hello = () => {

    data.map((items1)=>{
     sum += items1.price*items1.quantity;
    })
  }

  hello();
  return (
    <div>
      {
        data.map((items1)=>{
          return(
            <div>
              <div>Name : {items1.name}</div>
              <div>Quantity : {items1.quantity}</div>
              <div>price : {items1.price}</div>
            </div>
          )
        })
      }
     <div>Total price : {sum}</div>
    </div>
  );
};

export default Cart;
