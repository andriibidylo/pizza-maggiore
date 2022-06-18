

export const Categories = ({value, onChangeCategory}) => {

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
          <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? "active" : ""}>{el}</li>
        ))}
      </ul>
    </div>

  )
}