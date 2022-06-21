import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate  } from 'react-router-dom'


const ItemDetails = () => {
  const [pizza, setPizza] = useState(null)
const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    const featchPizza = async () => {
      try{
        const { data } = await axios.get(`https://62aba2a1bd0e5d29af136c7a.mockapi.io/items/${id}`)
        setPizza(data)
      }catch(error){
        console.log(error)
        navigate('/')
      }
    }
    featchPizza()
  }, [])

  // category: 5
// id: "2"
// imageUrl: "https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?t=st=1655404510~exp=1655405110~hmac=954444fecc743367c641c1a169b3d7c7eaf34eb4f60c26c0ba2d2333b862bf79&w=1060"
// price: 23
// rating: 1
// sizes: (2) [6, 14]
// title: "Hawaiian"
// types: (2) [0, 1]
if (!pizza) {
  return (
    <div>Loading ...</div>
  )
}
  return (
    
    <div className="container">
      <img className="pizza-block__image-big" src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>${pizza.price}</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Back</span>
        </button>
      </Link>
    </div>
  );
};

export default ItemDetails