
type CategoryPropsType = {
  value: number,
  onChangeCategory: (arg0:any) => void
}

export const Categories: React.FC<CategoryPropsType> = ({ value, onChangeCategory }) => {

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