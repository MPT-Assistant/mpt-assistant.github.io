import { Alert, Button } from "react-bootstrap";

export default function CookieAlert(callbackFunction: any) {
	return (
		<Alert variant="success">
			<Alert.Heading>
				Этот сайт использует cookie для хранения данных.
			</Alert.Heading>
			<p>
				Продолжая использовать сайт, Вы даёте согласие на работу с этими
				файлами.
			</p>
			<hr />
			<div>
				<Button
					onClick={() => {
						callbackFunction("accept", true, {
							expires: new Date(
								new Date().valueOf() + 5 * 365 * 24 * 60 * 60 * 1000,
							),
						});
					}}
					variant="outline-success"
				>
					Принять и закрыть
				</Button>
			</div>
		</Alert>
	);
}
