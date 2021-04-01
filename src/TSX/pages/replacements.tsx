import { useState, useEffect } from "react";
import { Alert, Table, Card } from "react-bootstrap";
import { useCookies } from "react-cookie";

import LoadingSpinner from "../components/LoadingSpinner";

import API from "../../TS/api";

function Replacements() {
	const [groupData] = useCookies(["name"]);

	const [
		ParsedGroupReplacements,
		updateParsedGroupReplacements,
	] = useState<JSX.Element>(<div/>);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isLoaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		(async function getGroupReplacements() {
			if (!isLoaded) {
				setLoaded(true);
				const currentReplacements = await API.replacements.get({
					group: groupData.name
				});
				const ParsedReplacements: Array<{
					date: string;
					replacements: Array<{
						lessonNum: number;
						addToSite: Date;
						detected: Date;
						oldLessonName: string;
						oldLessonTeacher: string;
						newLessonName: string;
						newLessonTeacher: string;
					}>;
				}> = [];
				currentReplacements.response.map((replacement): void => {
					const currentDay =
						ParsedReplacements.find((day) => day.date === replacement.date) ||
						ParsedReplacements[
							ParsedReplacements.push({
								date: replacement.date,
								replacements: [],
							}) - 1
						];
					currentDay.replacements.push({
						lessonNum: replacement.lessonNum,
						addToSite: replacement.addToSite,
						detected: replacement.detected,
						oldLessonName: replacement.oldLessonName,
						oldLessonTeacher: replacement.oldLessonTeacher,
						newLessonName: replacement.newLessonName,
						newLessonTeacher: replacement.newLessonTeacher,
					});
				});
				const PreParsedReplacements =
					currentReplacements.response.length === 0 ? (
						<h1 className="white-text">На ближайшее время замен нет</h1>
					) : (
						<div className="replacements">
							{ParsedReplacements.map((day) => {
								return (
									<Card className="text-center">
										<Card.Body>
											<Card.Title>Замены на {day.date}</Card.Title>
											<Card.Text>
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
														{day.replacements.map((replacement) => {
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
											</Card.Text>
										</Card.Body>
									</Card>
								);
							})}

							{/* <Table variant="dark" bordered className="table">
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
							</Table> */}
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
	const [groupData] = useCookies(["name"]);

	return groupData.name ? (
		<Replacements />
	) : (
		<Alert variant="danger">
			У вас не установлена группа, пожалуйста перейдите в настройки и установите
			её.
		</Alert>
	);
}
