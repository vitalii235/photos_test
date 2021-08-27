import {createContext, useEffect, useState} from "react";
import API from "../API";
import {Modal} from "@material-ui/core";
import {PhotoCard} from "../Components/PhotoCard/photo-card";
import {Loader} from "../Components/Loader/Loader";
import useWindowDimensions from "../Hooks/useWindowSize";
import {useElementOnScreen} from "../Hooks/useElementOnScreen";
import modalStyles from './ModalStyles.module.css'

export const PhotosContext = createContext()

export const ContextProvider = ({children}) => {
	// custom hooks
	const {width} = useWindowDimensions()
	const [lazyLoadRef, isVisibleLazyItem] = useElementOnScreen()

	const isMobile = width < 768

	// States
	const [photos, setPhotos] = useState([])
	const [downloadOptions, setDownloadOptions] = useState(
		{start: '0', limit: '20', albumId: [], currentPage: '1', totalCount: '', titleForSearch: ''}
	)

	const [modalData, setModalData] = useState({
		selectedId: '',
		isShown: false,
		body(data) {
			return PhotoCard({image: this.url, title: this.title, ...data})
		}
	})

	const [loading, setLoading] = useState(false)

	// Handle Functions
	const handleSetDownloadOptions = (params) => setDownloadOptions(prev => ({...prev, ...params}))
	const handleSetModalData = (data) => () => setModalData(prev => ({...prev, ...data}))
	const handleCloseModal = () => handleSetModalData({isShown: false, url: '', title: ''})()

	const handleGetPhotos = async (params, isMobile) => {
		try {
			setLoading(prev => !prev)
			const res = await API.getPhotos(params);
			handleSetDownloadOptions({totalCount: res.headers['x-total-count']})
			if (isMobile) {
				return setPhotos(prev => ([...prev, ...res.data]))

			}
			setPhotos([...res.data])
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(prev => !prev)
		}
	}
	const handleGetPhoto = async (id, params) => {
		try {
			setLoading(prev => !prev)
			const res = await API.getPhoto(id, params)
			handleSetModalData({...res.data})()
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(prev => !prev)
		}
	}
	const startParam = isMobile
		? photos.length
		: downloadOptions.currentPage > 1
			? (downloadOptions.limit - downloadOptions.start) * (downloadOptions.currentPage - 1)
			: 0

	// Listeners
	useEffect(() => {
		if (!loading && (isMobile ? isVisibleLazyItem : true)) {
			handleGetPhotos({
				start: startParam,
				limit: downloadOptions.limit,
				album: downloadOptions.albumId,
				title: downloadOptions.titleForSearch,
			}, isMobile)
		}
		// eslint-disable-next-line
	}, [downloadOptions.currentPage, isVisibleLazyItem, downloadOptions.limit, downloadOptions.albumId, downloadOptions.titleForSearch])

	useEffect(() => {
		if (modalData.isShown && modalData.selectedId) {
			handleGetPhoto(modalData.selectedId)
		}
		// eslint-disable-next-line
	}, [modalData.isShown, modalData.selectedId])

	return (<>
		<PhotosContext.Provider value={{
			photos,
			handleSetModalData,
			handleSetDownloadOptions,
			downloadOptions,
			handleGetPhotos,
			isMobile,
			lazyLoadRef,
			isVisibleLazyItem
		}}>
			<Loader loading={loading}/>
			<Modal
				className={modalStyles.modalContainer}
				open={modalData.isShown}
				onClose={handleCloseModal}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{modalData.body({customImageStyle: modalStyles.imageStyle})}
			</Modal>
			{children}
		</PhotosContext.Provider>
	</>)
}
