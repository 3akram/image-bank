import axios from 'axios';

export const FETCH_IMAGES = 'FETCH_IMAGES';
export const DELETE_IMAGE = 'DELETE_IMAGE';

export const getImages = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get('/api/v1/images/all-images');
			const images = response.data;
			dispatch({ type: FETCH_IMAGES, payload: images });
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteImage = (imageId) => {
	return async (dispatch) => {
		try {
			await axios.delete(
				`/api/v1/images/delete-image?imageId=${imageId}`
			);
			dispatch({
				type: DELETE_IMAGE,
				payload: {
					imageId,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
};
