import moment from "moment";

import { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import { useCookies } from "react-cookie";

import LoadingSpinner from "../components/LoadingSpinner";

import API from "../../TS/api";

function Schedule() {
	const [groupData] = useCookies(["uid"]);
	const [groupSchedule, updateGroupSchedule] = useState<
		Array<{
			name: string;
			num: number;
			place: string;
			lessons: Array<{
				num: number;
				name: [string, string?];
				teacher: [string, string?];
			}>;
		}>
	>([]);
	const [ParsedSchedule, updateParsedSchedule] = useState<JSX.Element>(
		<div></div>,
	);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async function getGroupSchedule() {
			if (groupSchedule.length === 0) {
				const Response = await API.getGroupSchedule({ id: groupData.uid });
				updateGroupSchedule(Response.response);
				const selectedTime = new Date(
					new Date().valueOf() + 48 * 24 * 60 * 60 * 1000,
				);
				const nowSchedule = Response.response.find(
					(x) => x.num === selectedTime.getDay(),
				);
				const PreParsedSchedule = nowSchedule ? (
					<div className="schedule">
						<h1 className="white-text">
							Расписание на {moment(selectedTime).format("DD.MM.YYYY")}
						</h1>
						<Table variant="dark" bordered className="table">
							<thead>
								<tr>
									<th>Пара</th>
									<th>Предмет</th>
									<th>Преподаватель</th>
								</tr>
							</thead>
							<tbody>
								{nowSchedule.lessons.map((lesson) => {
									return (
										<tr>
											<td>{lesson.num}</td>
											<td>{lesson.name.join()}</td>
											<td>{lesson.teacher.join()}</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				) : (
					<div>
						<h1>Сегодня нет пар</h1>
					</div>
				);
				updateParsedSchedule(PreParsedSchedule);
				setLoading(false);
			}
		})();
	});

	return (
		<div className="settings main">
			{isLoading ? <LoadingSpinner /> : ParsedSchedule}
		</div>
	);
}

export default function CheckInstallGroup() {
	const [groupData] = useCookies(["uid"]);

	return groupData.uid ? (
		<Schedule />
	) : (
		<Alert variant="danger">
			У вас не установлена группа, пожалуйста перейдите в настройки и установите
			её.
		</Alert>
	);
}
