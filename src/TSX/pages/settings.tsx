import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { Form, Card, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import LoadingSpinner from "../components/LoadingSpinner";

import API from "../../TS/api";

export default function Settings() {
	const [perhapsGroups, updateGroupList] = useState<
		Array<{
			name: string;
			specialty: string;
		}>
	>([]);
	const [groupData, setGroupData, removeGroupData] = useCookies([
		"name",
		"specialty",
	]);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async function GetGroups() {
			if (perhapsGroups.length === 0) {
				const Response = await API.group.getList();
				updateGroupList(Response.response);
				setLoading(false);
			}
		})();
	});

	const resetGroupData = () => {
		removeGroupData("name");
		removeGroupData("specialty");
	};

	return (
		<div className="settings main">
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<form>
					<Form.Group controlId="exampleForm.ControlInput1">
						{groupData.name ? (
							<Card
								bg="secondary"
								className="white-text"
								style={{ fontSize: 15 }}
							>
								<Card.Body>
									<Card.Title>Информация о группе</Card.Title>
									<Card.Text>Ваша группа: {groupData.name}</Card.Text>
									<Card.Text>
										Ваша специальность: {groupData.specialty}
									</Card.Text>
								</Card.Body>
								<Button variant="warning" onClick={() => resetGroupData()}>
									Изменить группу
								</Button>
							</Card>
						) : (
							<>
								<div className="white-text">
									<h3>Введите вашу группу</h3>
								</div>

								<Typeahead
									options={perhapsGroups}
									filterBy={["name"]}
									labelKey={(group) => group.name}
									paginate={false}
									placeholder="Например, БИ50-3-19..."
									emptyLabel="Неверное название группы"
									maxResults={3}
									onChange={([selected]) => {
										setGroupData("name", selected.name, {
											expires: new Date(
												new Date().valueOf() + 5 * 365 * 24 * 60 * 60 * 1000,
											),
										});
										setGroupData("specialty", selected.specialty, {
											expires: new Date(
												new Date().valueOf() + 5 * 365 * 24 * 60 * 60 * 1000,
											),
										});
									}}
								/>
							</>
						)}
					</Form.Group>
				</form>
			)}
		</div>
	);
}
