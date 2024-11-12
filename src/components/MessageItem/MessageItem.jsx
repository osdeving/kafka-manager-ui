/* eslint-disable react/prop-types */
import MessageHeader from "../MessageHeader/MessageHeader";
import MessageContent from "../MessageContent/MessageContent";
import "./MessageItem.css";

function MessageItem({ message }) {
	const parsedContent = JSON.parse(message.content);

	return (
		<div className="message-item">
			<MessageHeader timestamp={message.timestamp} />
			<MessageContent content={parsedContent} />
		</div>
	);
}

export default MessageItem;
