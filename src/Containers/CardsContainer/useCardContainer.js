import {useContext} from "react";
import {PhotosContext} from "../../Context/PhotosContext";

export const useCardContainer = () => {
	const {
		photos, handleSetModalData, downloadOptions, handleSetDownloadOptions, isMobile, lazyLoadRef,
	} = useContext(PhotosContext)

	const pageNumberOptionList = [
		{value: 20, title:20},
		{value: 50, title:50},
		{value: 100, title:100},

	]
	return {
		list: photos,
		handleSetModalData,
		downloadOptions,
		handleSetDownloadOptions,
		isMobile,
		lazyLoadRef,
		pageNumberOptionList,
	}
}
