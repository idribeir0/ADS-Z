#  🩺 Sistema de Gerenciamento de Consultas Médicas

Esse projeto faz parte da entrega de um sistema na matéria de Prática Profissional em Analise e Desenvolvimento de Sistemas do curso de ADS na Universidade Presbiteriana Maxkenzie.

Este é um sistema básico para gerenciamento de consultas médicas, permitindo que pacientes realizem agendamentos, visualizem seu histórico de consultas, cancelem ou reagendem consultas.

## ⚙️ Funcionalidades

- **Login e Cadastro**: Usuários podem criar contas e fazer login no sistema.
- **Agendamento de Consultas**: Pacientes podem agendar consultas com base em datas e horários disponíveis.
- **Cancelamento de Consultas**: Consultas podem ser canceladas diretamente pelo sistema.
- **Reagendamento**: Alteração de datas e horários das consultas agendadas.
- **Histórico de Consultas**: Visualização do histórico de consultas realizadas ou canceladas.
- **Notificações**: Feedback para o paciente sobre ações realizadas, como agendamento e cancelamento.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Python (Flask)
- **Banco de Dados**: SQLite
- **Frontend**: HTML, CSS, JavaScript
- **Framework CSS**: Bootstrap

## 📝 Como Executar o Projeto

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio```
2. **Crie e ative o ambiente virtual:**
 ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/MacOS
   venv\Scripts\activate     # Windows
```
3. **Instale as dependencias:**
```bash
pip install -r requirements.txt
```
4. **Inicialize o banco de dados:**
```bash
python
>>> from app import init_db
>>> init_db()
>>> exit()
```
5. **Inicie o Servidor:**
```bash
python app.py
```
6. **Acesse o Sistema:**
   Abra o navegador e acesse: http://127.0.0.1:5000

## 📂 Estrutura do Projeto
projeto-sistema-consultas/
├── app.py                   # Arquivo principal do Flask
├── consultas.db             # Banco de dados SQLite
├── requirements.txt         # Dependências do projeto
├── static/
│   ├── css/
│   │   └── style.css         # Estilos CSS
│   ├── img/
│   │   └── background.png    # Imagem de fundo
│   └── js/
│       ├── register.js       # Scripts de registro
│       └── agendar.js        # Scripts de agendamento
├── templates/
│   ├── index.html            # Página de login
│   ├── home.html             # Página inicial (Home)
│   ├── register.html         # Página de cadastro
│   ├── agendar.html          # Página de agendamento
│   ├── minhas_consultas.html # Página de consultas do paciente
│   ├── reagendar.html        # Página de reagendamento
│   └── historico.html        # Página de histórico de consultas
└── README.md                 # Documentação do projeto


## 🚀 Próximos Passos
Adicionar funcionalidades para exportar o histórico de consultas em formatos como PDF ou CSV.
Implementar autenticação mais segura com hash de senhas.
Melhorar a interface do usuário com recursos avançados de Bootstrap.

## 🤝 Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
