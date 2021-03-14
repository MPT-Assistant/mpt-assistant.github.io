import moment from "moment";

import { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import { useCookies } from "react-cookie";

import LoadingSpinner from "../components/LoadingSpinner";

import API from "../../TS/api";

function Replacements() {
	const [groupData] = useCookies(["uid"]);

	const [
		ParsedGroupReplacements,
		updateParsedGroupReplacements,
	] = useState<JSX.Element>(<div></div>);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isLoaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		(async function getGroupReplacements() {
			if (!isLoaded) {
				setLoaded(true);
				const currentReplacements = await API.getCurrentReplacements({
					// id: groupData.uid,
				});
				console.log(currentReplacements);
				const PreParsedReplacements =
					currentReplacements.response.length === 0 ? (
						<h1 className="white-text">На ближайшее время замен нет</h1>
					) : (
						<div className="replacements">
							<Table variant="dark" bordered className="table">
								<thead>
									<tr>
										<th>Пара</th>
										<th>Предмет</th>
										<th>Преподаватель</th>
										<th>Новый предмет</th>
										<th>Новый преподаватель</th>
									</tr>
								</thead>
								<tbody>
									{currentReplacements.response.map((replacement) => {
										return (
											<tr>
												<td>{replacement.lessonNum}</td>
												<td>{replacement.oldLessonName}</td>
												<td>{replacement.oldLessonTeacher}</td>
												<td>{replacement.newLessonName}</td>
												<td>{replacement.newLessonTeacher}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					);
				updateParsedGroupReplacements(PreParsedReplacements);
				setLoading(false);
			}
		})();
	});

	return isLoading ? <LoadingSpinner /> : ParsedGroupReplacements;
}

export default function CheckInstallGroup() {
	const [groupData] = useCookies(["uid"]);

	return groupData.uid ? (
		<Replacements />
	) : (
		<Alert variant="danger">
			У вас не установлена группа, пожалуйста перейдите в настройки и установите
			её.
		</Alert>
	);
}
