

import MessageList from "./components/MessageList/MessageList";


function App() {
    return (
			<div className="dashboard">
				{/* Header */}
				<header className="dashboard-header">
					<h1>Kafka Messages Viewer</h1>
				</header>

				{/* Sidebar */}
				<aside className="dashboard-sidebar">
					<nav>
						<ul>
							<li>
								<a href="#">Dashboard</a>
							</li>
							<li>
								<a href="#">Configurações</a>
							</li>
							<li>
								<a href="#">Sobre</a>
							</li>
						</ul>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="dashboard-main">
					<MessageList />
				</main>

				{/* Footer */}
				<footer className="dashboard-footer">
					<p>© 2024 Kafka Dashboard. Todos os direitos reservados.</p>
				</footer>
			</div>
		);
	}

	// const [environment, setEnvironment] = useState("pre");
	// const [principal, setPrincipal] = useState("SVC_FASTDATA_DEV@REDECORP.BR");
	// const [topic, setTopic] = useState("");
	// const [flags, setFlags] = useState("");
	// const [events, setEvents] = useState([]);
	// const [ws, setWs] = useState(null);

	// useEffect(() => {
	// 	// Estabelece conexão WebSocket quando o componente é montado
	// 	const socket = new WebSocket("ws://localhost:3000");
	// 	socket.onmessage = (event) => {
	// 		setEvents((prevEvents) => [
	// 			...prevEvents,
	// 			JSON.parse(event.data)[0],
	// 		]);
	// 	};
	// 	setWs(socket);

	// 	return () => {
	// 		if (ws) {
	// 			ws.close();
	// 		}
	// 	};
	// }, []);

	// const startConsumer = () => {
	// 	fetch("http://localhost:3000/start-consumer", {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ environment, principal, topic, flags }),
	// 	})
	// 		.then((res) => res.text())
	// 		.then((data) => console.log(data))
	// 		.catch((error) =>
	// 			console.error("Erro ao iniciar consumidor:", error)
	// 		);
	// };

	// return (
	// 	<div className="App" style={{ padding: "20px" }}>
	// 		<h2>Kafka Consumer UI</h2>
	// 		<FormGroup label="Ambiente">
	// 			<HTMLSelect
	// 				value={environment}
	// 				onChange={(e) => setEnvironment(e.target.value)}
	// 			>
	// 				<option value="prod">Prod</option>
	// 				<option value="pre">Pre</option>
	// 			</HTMLSelect>
	// 		</FormGroup>
	// 		<FormGroup label="Principal">
	// 			<InputGroup
	// 				placeholder="SVC_FASTDATA_DEV@REDECORP.BR"
	// 				value={principal}
	// 				onChange={(e) => setPrincipal(e.target.value)}
	// 			/>
	// 		</FormGroup>
	// 		<FormGroup label="Tópico">
	// 			<InputGroup
	// 				placeholder="Nome do Tópico"
	// 				value={topic}
	// 				onChange={(e) => setTopic(e.target.value)}
	// 			/>
	// 		</FormGroup>
	// 		<FormGroup label="Flags">
	// 			<InputGroup
	// 				placeholder="Exemplo: --from-beginning"
	// 				value={flags}
	// 				onChange={(e) => setFlags(e.target.value)}
	// 			/>
	// 		</FormGroup>
	// 		<Button
	// 			text="Iniciar Consumo"
	// 			intent="primary"
	// 			onClick={startConsumer}
	// 		/>

	// 		<h3>Eventos Recebidos</h3>
	// 		<table
	// 			className="bp3-html-table bp3-html-table-striped"
	// 			style={{ width: "100%" }}
	// 		>
	// 			<thead>
	// 				<tr>
	// 					<th>Timestamp</th>
	// 					<th>Mensagem</th>
	// 				</tr>
	// 			</thead>
	// 			<tbody>
	// 				{events.map((event, index) => (
	// 					<tr key={index}>
	// 						<td>{new Date().toLocaleString()}</td>
	// 						<td>{event}</td>
	// 					</tr>
	// 				))}
	// 			</tbody>
	// 		</table>
	// 	</div>
	// );


export default App;
