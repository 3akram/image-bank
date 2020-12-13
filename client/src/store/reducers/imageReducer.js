import { DELETE_IMAGE, FETCH_IMAGES } from '../actions/images';

const initialState = {
	images: [],
};

const imageReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_IMAGES:
			return { ...state, images: action.payload };

		case DELETE_IMAGE:
			const images = state.images;
			const index = images.findIndex(
				(img) => img._id === action.payload.imageId
			);
			const updatedImages = [...images];
			updatedImages.splice(index, 1);
			return { ...state, images: [...updatedImages] };

		default:
			return state;
	}
};

export default imageReducer;
