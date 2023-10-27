import { useState, useEffect } from 'react'
import PlantItem from './PlantItem'
import Categories from './Categories'
import '../styles/ShoppingList.css'

function ShoppingList({ cart, updateCart }) {
	const [activeCategory, setActiveCategory] = useState('');
	const [plants, setPlants] = useState([]); 
	const [categories, setCategories] = useState([]);
	

	useEffect(() => {
		fetch('http://localhost:3001/data')
		  .then((response) => response.json())
		  .then((data) => {
			const uniqueCategories = [...new Set(data.rows.map((item) => item.category))];
			setCategories(uniqueCategories);
			setPlants(data.rows);
		  })
		  .catch((error) => console.error('Error fetching data: ', error));
	  }, []);
	  

	function addToCart(name, price) {
		const currentPlantAdded = cart.find((plant) => plant.name === name)
		if (currentPlantAdded) {
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name
			)
			updateCart([
				...cartFilteredCurrentPlant,
				{ name, price, amount: currentPlantAdded.amount + 1 }
			])
		} else {
			updateCart([...cart, { name, price, amount: 1 }])
		}
	}

	return (
		<div className='lmj-shopping-list'>
		  <Categories
			categories={categories}
			setActiveCategory={setActiveCategory}
			activeCategory={activeCategory}
		  />
	
		  <ul className='lmj-plant-list'>
			{plants.map(({ name, cover, water, light, price, category }) =>
			  !activeCategory || activeCategory === category ? (
				<div key={name}>
				  <PlantItem
					cover={cover}
					name={name}
					water={water}
					light={light}
					price={price}
				  />
				  <button onClick={() => addToCart(name, parseFloat(price))}>
					Ajouter
				  </button>
				</div>
			  ) : null
			)}
		  </ul>
		</div>
	  );
	}
	
export default ShoppingList
