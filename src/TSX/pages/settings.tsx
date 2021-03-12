import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { Form, Spinner, Card, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import API from "../../TS/api";

export default function Settings() {
	const [perhapsGroups, updateGroupList] = useState<
		Array<{
			id: string;
			uid: string;
			name: string;
			specialty: string;
			specialtyID: string;
		}>
	>([]);
	const [groupData, setGroupData, removeGroupData] = useCookies([
		"uid",
		"name",
		"specialty",
	]);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async function GetGroups() {
			if (perhapsGroups.length === 0) {
				const Response = await API.getGroupList({});
				updateGroupList(Response.response);
				setLoading(false);
			}
		})();
	});

	const resetGroupData = () => {
		removeGroupData("uid");
		removeGroupData("name");
		removeGroupData("specialty");
	};

	return (
		<div className="settings main">
			{isLoading ? (
				<Spinner animation="border" variant="success" />
			) : (
				<form>
					<Form.Group controlId="exampleForm.ControlInput1">
						{groupData.uid ? (
							<Card bg="secondary">
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
								<div className="text">
									<h3>Введите вашу группу</h3>
								</div>

								<Typeahead
									options={perhapsGroups}
									filterBy={["name"]}
									labelKey={(group) => group.name}
									paginate={false}
									placeholder="БИ50-3-19"
									emptyLabel="Неверное название группы"
									maxResults={3}
									onChange={([selected]) => {
										setGroupData("uid", selected.uid);
										setGroupData("name", selected.name);
										setGroupData("specialty", selected.specialty);
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
