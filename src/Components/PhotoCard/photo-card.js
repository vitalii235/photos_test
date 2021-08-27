import {Card, CardContent, CardMedia} from "@material-ui/core";
import styles from './photo-card.module.css'

export const PhotoCard = ({image, title, customImageStyle, customContainerStyle, ...rest}) => {
	return (
		<Card className={customContainerStyle || styles.cardContainer} {...rest}>
			{image && <CardMedia
				className={customImageStyle || styles.imageStyle}
				image={image}
			/>}
			<CardContent>
				{title}
			</CardContent>
		</Card>
	)
}
