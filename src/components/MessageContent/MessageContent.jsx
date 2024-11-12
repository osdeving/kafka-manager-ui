/* eslint-disable react/prop-types */
import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faStream } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MessageContent.css";

function MessageContent({ content }) {
	const [showPrettyJson, setShowPrettyJson] = useState(true);

	let parsedContent;

	try {
		// Tentar analisar o conteúdo como JSON
		parsedContent = JSON.parse(content);
	} catch (e) {
		// Se o conteúdo não for JSON, exibi-lo como texto simples
		parsedContent = content;
	}

	const handleCopy = (message) => {
		toast.success(`Copiado: ${message}`, {
			autoClose: 300,
			position: "bottom-center",
		});
	};

	if (typeof parsedContent === "object") {
		// Convertendo o objeto JSON em uma lista de pares chave-valor para exibir com botões de copiar
		const entries = Object.entries(parsedContent);
		return (
			<>
				<div style={{ textAlign: "right", marginBottom: "10px" }}>
					<button
						onClick={() => setShowPrettyJson(!showPrettyJson)}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							marginRight: "10px",
						}}
						title="Alternar Visualização"
						className="button-icon"
					>
						<FontAwesomeIcon
							icon={showPrettyJson ? faStream : faCode}
						/>
					</button>
					<CopyToClipboard
						text={JSON.stringify(parsedContent, null, 2)}
						onCopy={handleCopy}
					>
						<button
							style={{
								background: "none",
								border: "none",
								cursor: "pointer",
							}}
							title="Copiar todo o JSON"
							className="button-icon"
						>
							<FontAwesomeIcon icon={faCopy} />
						</button>
					</CopyToClipboard>
				</div>
				<div
					className="message-content"
					style={{
						position: "relative",
						padding: "10px",
						border: "1px solid #ddd",
						borderRadius: "5px",
						background: "#f9f9f9",
					}}
				>
					{typeof parsedContent === "object" ? (
						showPrettyJson ? (
							<JSONPretty data={parsedContent} />
						) : (
							<pre>
								{entries.map(([key, value]) => (
									<div
										key={key}
										style={{
											marginBottom: "10px",
											display: "flex",
											alignItems: "center",
										}}
									>
										<strong style={{ marginRight: "10px" }}>
											{key}:
										</strong>
										<span style={{ marginRight: "10px" }}>
											{value.toString()}
										</span>
										<CopyToClipboard
											text={value.toString()}
											onCopy={() => handleCopy(`${key}`)}
										>
											<button
												style={{
													background: "none",
													border: "none",
													cursor: "pointer",
													marginLeft: "auto",
												}}
												title={`Copiar valor de ${key}`}
											>
												<FontAwesomeIcon
													icon={faCopy}
												/>
											</button>
										</CopyToClipboard>
									</div>
								))}
							</pre>
						)
					) : (
						<p>{parsedContent}</p>
					)}

					<ToastContainer />
				</div>
			</>
		);
	} else {
		// Se o conteúdo não for JSON, exibir apenas o texto com um botão para copiá-lo
		return (
			<div className="message-content">
				<p>{parsedContent}</p>
				<CopyToClipboard
					text={parsedContent}
					onCopy={() => handleCopy("conteúdo")}
				>
					<button
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
						}}
						title="Copiar"
					>
						<FontAwesomeIcon icon={faCopy} />
					</button>
				</CopyToClipboard>
				<ToastContainer />
			</div>
		);
	}
}

export default MessageContent;
