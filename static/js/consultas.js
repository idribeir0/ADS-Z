// Função para listar consultas
function listarConsultas() {
    fetch('/consultas')
        .then(response => response.json())
        .then(consultas => {
            const lista = document.getElementById('lista-consultas');
            lista.innerHTML = '';
            consultas.forEach(consulta => {
                const item = document.createElement('li');
                item.className = 'list-group-item d-flex justify-content-between align-items-center';
                item.textContent = `Paciente: ${consulta[1]}, Médico: ${consulta[2]}, Data: ${consulta[3]}, Hora: ${consulta[4]}`;
                const button = document.createElement('button');
                button.className = 'btn btn-danger btn-sm';
                button.textContent = 'Cancelar';
                button.onclick = () => cancelarConsulta(consulta[0]);
                item.appendChild(button);
                lista.appendChild(item);
            });
        });
}

// Função para agendar consulta
document.getElementById('form-agendar').onsubmit = function (event) {
    event.preventDefault();
    const paciente = document.getElementById('paciente').value;
    const medico = document.getElementById('medico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    fetch('/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paciente, medico, data, hora })
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            listarConsultas();
        });
};

// Função para cancelar consulta
function cancelarConsulta(id) {
    fetch(`/cancelar/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            listarConsultas();
        });
}

// Listar consultas ao carregar a página
listarConsultas();
