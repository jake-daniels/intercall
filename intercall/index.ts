import * as React from 'react'

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

type ArgsTypes<F> = F extends (...args: infer Args) => infer X ? Args : never

export default function useIntercall<S extends Function, R extends Function>(onStart: S, onResume: R) {
	type TResult = ReturnType<R>

	const resolver = React.useRef<(result: TResult) => void>(() => null)

	const start = async (...args: ArgsTypes<S>) => {
		onStart(...args)
		return new Promise<TResult>((resolve) => {
			resolver.current = resolve
		})
	}

	const resume = (...args: ArgsTypes<R>) => {
		const result: TResult = onResume(...args)
		resolver.current(result)
	}

	return [start, resume] as [typeof start, typeof resume]
}
