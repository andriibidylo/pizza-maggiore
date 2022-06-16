import { useState } from "react"

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onClickCategory = (index) => {
    setActiveIndex(index)
  }
  const categories = [
    "All",
    "Meat",
    "Vegetarian",
    "Grilled",
    "Spicy",
    "Closed"
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li key={index} onClick={() => onClickCategory(index)} className={activeIndex === index ? "active" : ""}>{el}</li>
        ))}
      </ul>
    </div>

  )
}

export default Categories