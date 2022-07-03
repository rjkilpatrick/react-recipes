import React from "react";

function Recipe({
  strMeal,
  strInstructions,
  strMealThumb,
  strCategory,
  ...optional
}) {
  // Clean up tags and split into separate tags
  const strTagsList = optional.strTags?.trim().split(",") ?? [];

  // Parse ingredients
  const ingredientsList = [];

  for (let i = 0; i < 20; i++) {
    const ingredient = optional[`strIngredient${i + 1}`]; // strIngredient1, strIngredient2, ..., strIngredient20
    if (ingredient) {
      ingredientsList.push(ingredient);
    } else {
      break;
    }
  }

  const quantitiesList = [];

  for (let i = 0; i < 20; i++) {
    const quantity = optional[`strMeasure${i + 1}`]; // strIngredient1, strIngredient2, ..., strIngredient20
    if (quantity) {
      quantitiesList.push(quantity);
    } else {
      break;
    }
  }

  return (
    <div>
      <h1>{strMeal}</h1>
      <p className="category">{strCategory}</p>
      <img alt={strMeal} src={strMealThumb} />
      {optional.strImageSource && (
        <p>Image source: {optional.strImageSource}</p>
      )}
      {ingredientsList.length > 0 && (
        <div>
          <h2>Ingredients List</h2>
          <ul>
            {ingredientsList.map((ingredient, index) => (
              <li key={index}>
                <img
                  alt={ingredient}
                  src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                />
                {[quantitiesList[index], ingredient].join(" ")}
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2>Instructions</h2>
      <p>{strInstructions}</p>
      {strTagsList.length > 0 && (
        <div>
          <h2>Tags</h2>
          <ul>
            {strTagsList.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
      {optional.strSource && <a href={optional.strSource}>Original source</a>}
      {optional.strYoutube && <a href={optional.strYoutube}>YouTube</a>}
    </div>
  );
}

export default class ReactRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipeList: [] };
  }

  async getRecipes() {
    fetch("https://www.themealdb.com/api/json/v2/1/random.php")
      .then((response) => response.json())
      .then((data) => this.setState({ recipeList: data.meals }))
      .catch((error) => {
        console.error("⚠ Error:", error);
      });
  }

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    return (
      this.state.recipeList.length > 0 &&
      this.state.recipeList.map((props) => <Recipe {...props} />)
    );
  }
}
