import React from 'react';
import Loader from 'react-loader-spinner';
const Spinner = () => {
	return (
		<div className="d-flex align-items-center justify-content-center">
			<Loader type="Grid" color="#00BFFF" height={100} width={100} />
		</div>
	);
};

export default Spinner;
