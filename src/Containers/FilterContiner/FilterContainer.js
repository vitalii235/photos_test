import styles from './FilterContainer.module.css'
import {Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField,} from "@material-ui/core";
import {useFilterContainer} from "./useFilterContainer";

export const FilterContainer = () => {
	const {
		handleSubmitForm,
		value,
		onChange,
		selectedAlbums,
		albumsArray,
		handleSelectId,
		selectValue,
		handleRemoveItem
	} = useFilterContainer()
	return (<form onSubmit={handleSubmitForm}>
		<Grid container justifyContent={'center'} className={styles.container} direction={'column'}>
			<Box style={{margin:'10px 0'}}>
				<FormControl variant="outlined" fullWidth>
					<InputLabel id="demo-simple-select-outlined-label">Album Id</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						onChange={handleSelectId}
						label="Album Id"
						value={selectValue}
					>
						<MenuItem value="" disabled>
							<em>None</em>
						</MenuItem>
						{albumsArray.map((album) => <MenuItem disabled={selectedAlbums.includes(album)} key={album}
															  value={album}>id
							- {album}</MenuItem>)}

					</Select>
				</FormControl>
				<Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'}>
					{selectedAlbums.map(i => <Chip
						key={i}
						style={{margin:'5px 10px'}}
						label={`ID - ${i}`}
						onDelete={handleRemoveItem(i)}
					/>)}
				</Box>
			</Box>

			or
			<TextField style={{margin:'10px 0'}} variant={'outlined'} value={value['titleForSearch'] || ''} name={'titleForSearch'} onChange={onChange}
				   placeholder="Enter title for search"/>
			<Button variant="contained" type={'submit'}>Submit</Button>
		</Grid>
	</form>)
}
