import { useCookies } from "react-cookie";

import { Nav, Navbar, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Main from "./pages/main";
import Schedule from "./pages/schedule";
import Replacements from "./pages/replacements";
import Settings from "./pages/settings";
import CookieAlert from "./utils/CookieAlert";

function ShowMenu() {
	return (
		<Router>
			<Navbar bg="dark" expand="lg">
				<Navbar.Brand as={Link} to="/">
					<Button variant="secondary" block>
						<div className="text">MPT Assistant</div>
					</Button>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to="/schedule">
							<Button variant="secondary" block>
								<div className="text">Расписание</div>
							</Button>
						</Nav.Link>
						<Nav.Link as={Link} to="/replacements">
							<Button variant="secondary" block>
								<div className="text">Замены</div>
							</Button>
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link as={Link} to="/settings">
							<Button variant="secondary" block>
								<div className="text">Настройки</div>
							</Button>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Route exact path="/" component={Main} />
			<Route path="/schedule" component={Schedule} />
			<Route path="/replacements" component={Replacements} />
			<Route path="/settings" component={Settings} />
		</Router>
	);
}

export default function App() {
	const [cookies, setCookie] = useCookies(["accept"]);
	return cookies.accept ? <ShowMenu /> : CookieAlert(setCookie);
}
