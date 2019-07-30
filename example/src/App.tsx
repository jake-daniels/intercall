import './App.css'
import React from 'react'
import useIntercall from 'intercall'

type Food = 'fruit' | 'vegetable'
const Fruits = ['orange', 'raspberry', 'mango', 'lemon']
const Vegetables = ['onion', 'carrot', 'broccoli', 'garlic']

export default function App() {
	const [food, setFood] = React.useState('no-food-selected')
	const [showFruitPicker, setShowFruitPicker] = React.useState<boolean>(false)
	const [showVegetablePicker, setShowVegetablePicker] = React.useState<boolean>(false)

	const hidePicker = React.useCallback((type: Food) => {
		if (type === 'fruit') {
			setShowFruitPicker(false)
		}
		if (type === 'vegetable') {
			setShowVegetablePicker(false)
		}
	}, [])

	const showPicker = React.useCallback(
		(type: Food) => {
			hidePicker('fruit')
			hidePicker('vegetable')
			if (type === 'fruit') {
				setShowFruitPicker(true)
			}
			if (type === 'vegetable') {
				setShowVegetablePicker(true)
			}
		},
		[hidePicker],
	)

	const [selectFood, onFoodClick] = useIntercall(
		(type: Food) => {
			showPicker(type)
		},
		(type: Food, item: string) => {
			hidePicker(type)
			return item
		},
	)

	const pickAndDisplayItem = React.useCallback(
		async (type: Food) => {
			const item = await selectFood(type)
			setFood(item)
		},
		[selectFood],
	)

	return (
		<div className='app'>
			<div>
				<h1>{food.toLocaleUpperCase()}</h1>
			</div>
			<div className={'foods'}>
				<div className={'food'}>
					<button onClick={() => pickAndDisplayItem('fruit')}>Select fruit</button>
					{showFruitPicker && (
						<div className={'picker'}>
							{Fruits.map((item, i) => (
								<div key={i} className={'item'} onClick={() => onFoodClick('fruit', item)}>
									{item}
								</div>
							))}
						</div>
					)}
				</div>

				<div className={'food'}>
					<button onClick={() => pickAndDisplayItem('vegetable')}>Select vegetable</button>
					{showVegetablePicker && (
						<div className={'picker'}>
							{Vegetables.map((item, i) => (
								<div key={i} className={'item'} onClick={() => onFoodClick('vegetable', item)}>
									{item}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
