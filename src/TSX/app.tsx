import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./pages/main";
import Schedule from "./pages/schedule";
import Replacements from "./pages/replacements";

export default function App() {
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
