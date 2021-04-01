import { useState } from "react";
import { useCookies } from "react-cookie";

import { Nav, Navbar, Button } from "react-bootstrap";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Main from "./pages/main";
import Schedule from "./pages/schedule";
import Replacements from "./pages/replacements";
import Settings from "./pages/settings";
import CookieAlert from "./utils/CookieAlert";

function ShowMenu() {
	const [selectedButton, selectButton] = useState(window.location.hash);
	return (
		<Router basename="/">
			<Route exact path="/" component={Main} />
			<Route path="/schedule" component={Schedule} />
			<Route path="/replacements" component={Replacements} />
			<Route path="/settings" component={Settings} />

			<Navbar bg="dark" expand="lg" fixed="bottom">
				<Navbar.Brand as={Link} to="/" replace>
					<Button
						variant={selectedButton === "#/" ? "primary" : "secondary"}
						block
						disabled={selectedButton === "#/"}
						onClick={() => selectButton("#/")}
					>
						<div className="text">MPT Assistant</div>
					</Button>
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="navigation"
					style={{
						backgroundColor: "#d4d4d4",
					}}
				/>
				<Navbar.Collapse id="navigation">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to="/schedule" replace>
							<Button
								variant={
									selectedButton === "#/schedule" ? "primary" : "secondary"
								}
								block
								disabled={selectedButton === "#/schedule"}
								onClick={() => selectButton("#/schedule")}
							>
								<div className="text">Расписание</div>
							</Button>
						</Nav.Link>
						<Nav.Link as={Link} to="/replacements" replace>
							<Button
								variant={
									selectedButton === "#/replacements" ? "primary" : "secondary"
								}
								block
								disabled={selectedButton === "#/replacements"}
								onClick={() => selectButton("#/replacements")}
							>
								<div className="text">Замены</div>
							</Button>
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link as={Link} to="/settings" replace>
							<Button
								variant={
									selectedButton === "#/settings" ? "primary" : "secondary"
								}
								block
								disabled={selectedButton === "#/settings"}
								onClick={() => selectButton("#/settings")}
							>
								<div className="text">Настройки</div>
							</Button>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Router>
	);
}

export default function App() {
	const [cookies, setCookie] = useCookies(["accept"]);
	return cookies.accept ? <ShowMenu /> : CookieAlert(setCookie);
}
