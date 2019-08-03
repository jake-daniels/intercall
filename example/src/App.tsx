import './App.css'
import React from 'react'
import useIntercall from 'intercall'
import FoodPicker, { Food } from './FoodPicker'

export default function App() {
	const [food, setFood] = React.useState<string>('')
	const [foodPicker, setFoodPicker] = React.useState<Food | null>(null)

	const [pickFood, onFoodPicked] = useIntercall(
		(type: Food) => {
			setFoodPicker(type)
		},
		(food: string | null) => {
			setFoodPicker(null)
			return food
		},
	)

	const pickAndProcessFood = React.useCallback(
		async (type) => {
			const food = await pickFood(type)
			if (food) {
				setFood(food)
			}
		},
		[pickFood],
	)

	return (
		<div className='app'>
			<div className={'buttons'}>
				<button onClick={() => pickAndProcessFood('fruit')}>PICK FRUIT</button>
				<button onClick={() => pickAndProcessFood('vegetable')}>PICK VEGETABLE</button>
				<div>
					<h2>{food.toUpperCase()}</h2>
				</div>
			</div>

			{foodPicker !== null && (
				<FoodPicker type={foodPicker} onPick={onFoodPicked} onClose={() => onFoodPicked(null)} />
			)}
		</div>
	)
}
