import {Button, FormControl, Grid, MenuItem, Select} from "@material-ui/core";
import styles from './pagination.module.css'
import {useEffect, useState} from "react";


export const Pagination = ({
							   currentPage,
							   selectPage,
							   totalPageCount,
							   itemsLimit,
							   pagesShownNumber,
							   pageNumberOptionList,
						   }) => {
	const totalPages = Math.ceil(totalPageCount / itemsLimit)
	const [pagesState, setPagesState] = useState(new Array(pagesShownNumber).fill('').map((i, id) => id + 1))
	const updatedNumberValue = new Array(totalPages < pagesShownNumber ? totalPages : pagesShownNumber).fill('').map((i, id) => id + 1)
	const [paginationPage, setPaginationPage] = useState(1)

	const handleSelectPage = (page) => () => {
		selectPage({currentPage: +page})
	}

	const handleClickButton = (direction) => () => ({
		next: () => setPaginationPage(prev => {
			selectPage({currentPage: +currentPage + 1});
			if (+currentPage + 1 > pagesState[pagesState.length - 1]) return prev + 1
			return prev
		}),
		prev: () => paginationPage > 1 && setPaginationPage(prev => {
			selectPage({currentPage: +currentPage - 1});
			if (+currentPage - 1 < pagesState[0]) return prev - 1
			return prev
		}),
	})[direction]()

	const handleSelectItemsPerPage = (e) => {
		selectPage({
			limit: e.target.value,
			currentPage: 1
		})
	}

	useEffect(() => {
		(() => setPagesState(prev => {
			return prev.map((i, idx) => paginationPage > 1
				? prev.length * (paginationPage - 1) + idx + 1
				: idx + 1)
		}))()
		// eslint-disable-next-line
	}, [paginationPage, itemsLimit])

	useEffect(() => {
		if (+currentPage === 1) {
			setPaginationPage(1)
		}
	}, [currentPage])
	useEffect(() => {
		setPagesState(updatedNumberValue)
		// eslint-disable-next-line
	}, [totalPageCount, itemsLimit]);

	const filteredPagesArray = []
	for (const page of pagesState) {
		if (page * itemsLimit <= totalPageCount) {
			filteredPagesArray.push(page);
		} else {
			filteredPagesArray.push(page);
			break;
		}
	}
	return (
		<Grid container justifyContent={'center'} alignItems={'center'}>
			<Button variant={'contained'} disabled={+paginationPage === 1}
					onClick={handleClickButton('prev')}>Prev</Button>
			<Grid item>
				<div className={styles.paginationContainer}>
					{filteredPagesArray.map((page) => <span
						onClick={handleSelectPage(page)}
						className={`${styles.item} ${page === +currentPage ? styles.selectedItem : ''}`}
						key={Math.random()}>{page}</span>)}
				</div>
			</Grid>
			<Button variant={'contained'} disabled={pagesState[pagesState.length - 1] * itemsLimit >= +totalPageCount}
					onClick={handleClickButton('next')}>Next
			</Button>
			<FormControl>
				<Select
					className={styles.pagesSelect}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={itemsLimit}
					onChange={handleSelectItemsPerPage}
				>
					{pageNumberOptionList.map(option => <MenuItem key={Math.random()}
																  value={option.value}>{option.title}</MenuItem>)}
				</Select>
			</FormControl>
		</Grid>)
}
