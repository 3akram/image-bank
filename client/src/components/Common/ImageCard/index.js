import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as imageActions from '../../../store/actions/images';

import Spinner from '../Spinner';

const ImageCard = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const currentUserId = useSelector((state) => state.auth.userId);
	console.log(currentUserId);

	const onDeleteImageHandler = async (imageId) => {
		const action = imageActions.deleteImage(imageId);
		setIsLoading(true);
		await dispatch(action);
		setIsLoading(false);
	};
	if (isLoading) return <Spinner />;
	return (
		<div className="card">
			<img src={props.path} className="card-img-top" alt="..." />
			{props.userId === currentUserId && (
				<div className="card-body">
					<button
						className="btn btn-danger"
						onClick={() =>
							onDeleteImageHandler(props.userId, props.imageId)
						}
					>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default ImageCard;
