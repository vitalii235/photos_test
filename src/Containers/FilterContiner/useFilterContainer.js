import {useContext, useState} from "react";
import {PhotosContext} from "../../Context/PhotosContext";
import {useInput} from "../../Hooks/useInput";

export const useFilterContainer = () => {
	const {
		downloadOptions, handleSetDownloadOptions
	} = useContext(PhotosContext)
	const {value, onChange} = useInput()
	const [selectedAlbums, setSelectedAlbums] = useState([])
	const [selectValue, setSelectValue] = useState('')
	const albumsArray = new Array(10).fill('').map((i, idx) => idx + 1)

	const handleSelectId = (e) => {
		setSelectValue(e.target.value)
		setSelectedAlbums(prev => [...prev, +e.target.value])
	}
	const handleSubmitForm = (e) => {
		e.preventDefault()
		handleSetDownloadOptions({
			albumId: selectedAlbums,
			titleForSearch: value['titleForSearch'],
			currentPage: 1
		})
	}
	const handleRemoveItem = (id) => () => {
		setSelectedAlbums(prev => prev.filter(album => +album !== +id))
	}

	return {
		downloadOptions,
		handleSubmitForm,
		value,
		onChange,
		albumsArray,
		selectedAlbums,
		handleSelectId,
		selectValue,
		handleRemoveItem,
	}
}
