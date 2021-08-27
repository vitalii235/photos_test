import {useState} from "react";

export const useInput = () => {
	const [value, setValue] = useState({})
	const onChange = (e) => {
		setValue(prev => ({...prev, [e.target.name]: e.target.value}))
	}
	return {value, onChange}
}
