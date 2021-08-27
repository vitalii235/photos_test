import styles from './Loader.module.css'

export const Loader = ({loading}) => {
	return <>
		{loading && <div className={styles.container}>
			<div className={styles.ldsRipple}>
				<div/>
				<div/>
			</div>
		</div>}
	</>
}
