import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
	return (
		<div className="loading-spinner">
			<Spinner animation="border" variant="success" />
		</div>
	);
}
