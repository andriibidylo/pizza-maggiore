import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'


const ItemDetails: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number,
  }>()

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const featchPizza = async () => {
      try {
        const { data } = await axios.get(`https://62aba2a1bd0e5d29af136c7a.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }
    featchPizza()
  }, [])

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