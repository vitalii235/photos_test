import {Grid} from "@material-ui/core";
import {PhotoCard} from "../../Components/PhotoCard/photo-card";
import {useCardContainer} from "./useCardContainer";
import {Pagination} from "../../Components/Pagination/pagination";
import styles from './CardContainer.module.css'

export const CardsContainer = () => {
	const {
		list, handleSetModalData, downloadOptions, handleSetDownloadOptions, isMobile, lazyLoadRef, pageNumberOptionList
	} = useCardContainer()

	return (
		<Grid container justifyContent={'center'}>
			<Grid container spacing={3} justifyContent={'center'}>
				{list.map(photo => <Grid
					key={photo.id}
					xs={12}
					sm={6}
					lg={4}
					onClick={handleSetModalData({selectedId: photo.id, isShown: true})}
					item>
					<PhotoCard
						title={photo.title}
						image={photo.thumbnailUrl || ''}
					/>
				</Grid>)}
			</Grid>
			<Grid container className={styles.paginationContainer}>
				{!isMobile && <Pagination
					currentPage={downloadOptions.currentPage}
					selectPage={handleSetDownloadOptions}
					totalPageCount={downloadOptions.totalCount}
					itemsLimit={downloadOptions.limit}
					pagesShownNumber={3}
					pageNumberOptionList={pageNumberOptionList}
				/>}
				{isMobile && <div ref={lazyLoadRef}/>}
			</Grid>
		</Grid>)
}
