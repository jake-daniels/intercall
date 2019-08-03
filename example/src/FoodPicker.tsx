import React from 'react'

export type Food = 'fruit' | 'vegetable'

interface IProps {
	type: Food
	onPick: (food: string) => void
	onClose: () => void
}

const Fruits = ['orange', 'raspberry', 'mango', 'lemon', 'watermelon']
const Vegetables = ['onion', 'carrot', 'broccoli', 'garlic', 'spinach']

export default function FoodPicker(props: IProps) {
	return (
		<div className={'food-picker'}>
			<div className={'backdrop'} onClick={props.onClose} />
			<div className={'content'}>
				{props.type === 'fruit' &&
					Fruits.map((item) => (
						<button key={item} onClick={() => props.onPick(item)}>
							{item}
						</button>
					))}
				{props.type === 'vegetable' &&
					Vegetables.map((item) => (
						<button key={item} onClick={() => props.onPick(item)}>
							{item}
						</button>
					))}
			</div>
		</div>
	)
}
