import { useCookies } from "react-cookie";

import { Nav, Navbar, Alert, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./pages/main";
import Schedule from "./pages/schedule";
import Replacements from "./pages/replacements";

function CookieAlert(callbackFunction: any) {
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
						callbackFunction("accept", true, { path: "/" });
					}}
					variant="outline-success"
				>
					Принять и закрыть
				</Button>
			</div>
		</Alert>
	);
}

function ShowMenu() {
	return (
		<Router>
			<Navbar bg="dark" expand="lg">
				<Navbar.Brand href="/">MPT Assistant</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/schedule">Расписание</Nav.Link>
						<Nav.Link href="/replacements">Замены</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Route exact path="/" component={Main} />
			<Route path="/schedule" component={Schedule} />
			<Route path="/replacements" component={Replacements} />
		</Router>
	);
}

export default function App() {
	const [cookies, setCookie] = useCookies(["accept"]);
	return cookies.accept ? <ShowMenu /> : CookieAlert(setCookie);
}
