import MessageItem from "../MessageItem/MessageItem";
import { faker } from "@faker-js/faker";
import "./MessageList.css";

const generateMockMessages = (count) => {
	const mockMessages = [];
	for (let i = 0; i < count; i++) {
		const message = {
			id: i + 1,
			timestamp: Date.now(),
			content: JSON.stringify({
				user_id: faker.string.uuid(),
				document_number: faker.string.numeric(11),
				name: faker.person.firstName(),
				email: faker.internet.email(),
				status: faker.helpers.arrayElement([
					"APROVADO",
					"REPROVADO",
					"CAPTURAR DOCUMENTOS",
				]),
			}),
		};
		mockMessages.push(message);
	}
	return mockMessages;
};

function MessageList() {
	
	const mockMessages = generateMockMessages(10);

	console.log(mockMessages);

	return (
		<div className="message-list">
			{mockMessages.map((message) => (
				<MessageItem key={message.id} message={message} />
			))}
		</div>
	);
}

export default MessageList;
