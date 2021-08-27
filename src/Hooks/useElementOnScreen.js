import {useRef, useState, useEffect} from "react";

export const useElementOnScreen = (options = {root: null, rootMargin: '0px', threshold: 1.0}) => {
	const containerRef = useRef(null)
	const [isVisible, setIsVisible] = useState(false)

	const cbFunction = (entries) => {
		const [entry] = entries
		setIsVisible(entry.isIntersecting)
	}

	useEffect(() => {
		const observer = new IntersectionObserver(cbFunction, options)
		if (containerRef.current) observer.observe(containerRef.current)
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			if (containerRef.current) observer.unobserve(containerRef.current)

		};
	}, [containerRef, options]);
	return [containerRef, isVisible]
}
