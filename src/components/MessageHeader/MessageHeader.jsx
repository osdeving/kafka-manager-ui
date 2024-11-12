// eslint-disable-next-line react/prop-types

import "./MessageHeader.css";

function MessageHeader({ timestamp }) {
	const formattedTime = new Date(timestamp).toLocaleString();
	return (
		<div className="message-header">
			<strong>Recebido em:</strong> {formattedTime}
		</div>
	);
}

export default MessageHeader;
