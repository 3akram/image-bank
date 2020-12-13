import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageCard from '../Common/ImageCard';

const Gallery = () => {
	const images = useSelector((state) => state.images.images);
	return (
		<div>
			<ImageCard
				path={
					'https://miro.medium.com/max/8536/1*96ey4_zvQWLERNRe7UDG6Q.png'
				}
			/>
		</div>
	);
};

export default Gallery;
