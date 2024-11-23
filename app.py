from flask import Flask, render_template, request, jsonify, session, redirect, url_for, session, redirect, url_for
import sqlite3


app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'  # Substitua por uma string única e segura




# Função para conectar ao banco de dados
def connect_db():
    conn = sqlite3.connect('consultas.db')
    return conn

# Inicializar o banco de dados
def init_db():
    with connect_db() as conn:
        cursor = conn.cursor()
        # Criar tabela de consultas
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS consultas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paciente TEXT NOT NULL,
            medico TEXT NOT NULL,
            data TEXT NOT NULL,
            hora TEXT NOT NULL,
            observacoes TEXT
        )
        ''')
        # Criar tabela de usuários
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL
        )
        ''')
        conn.commit()

# Inicializar o banco de dados
init_db()




@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect('/')

@app.route('/medico/consultas', methods=['GET'])
def medico_consultas():
    medico = "Médico Atual"  # Substitua por autenticação futura
    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT paciente, data, hora, observacoes FROM consultas WHERE medico = ?', (medico,))
        consultas = cursor.fetchall()
    return render_template('medico_consultas.html', consultas=consultas)

# Página inicial (Login)
@app.route('/')
def index():
    return render_template('index.html')

# Página Home
@app.route('/home')
def home():
    return render_template('home.html')

# Página de cadastro
@app.route('/register', methods=['GET'])
def register_page():
    return render_template('register.html')

# Cadastro de usuário
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']

    with connect_db() as conn:
        cursor = conn.cursor()
        try:
            cursor.execute('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', (username, password, email))
            conn.commit()
            return jsonify({"message": "Usuário registrado com sucesso!"})
        except sqlite3.IntegrityError:
            return jsonify({"error": "Usuário já existe!"}), 400

# Login de usuário
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
        user = cursor.fetchone()

        if user:
            session['user_id'] = user[0]  # Salvar ID do usuário na sessão
            return jsonify({"message": "Login bem-sucedido!"})
        else:
            return jsonify({"error": "Login ou senha inválidos!"}), 401

# Página de agendamento
@app.route('/agendar', methods=['GET'])
def agendar_page():
    return render_template('agendar.html')

# Salvar agendamento
@app.route('/agendar', methods=['POST'])
def agendar():
    data = request.json
    medico = data['medico']
    data_consulta = data['data']
    hora_consulta = data['hora']

    with connect_db() as conn:
        cursor = conn.cursor()
        # Verificar se o horário já está ocupado
        cursor.execute('SELECT * FROM consultas WHERE medico = ? AND data = ? AND hora = ?', (medico, data_consulta, hora_consulta))
        consulta_existente = cursor.fetchone()

        if consulta_existente:
            return jsonify({"error": "Horário indisponível!"}), 400

        cursor.execute('INSERT INTO consultas (paciente, medico, data, hora) VALUES (?, ?, ?, ?)',
                       ("Paciente Atual", medico, data_consulta, hora_consulta))
        conn.commit()
    
    # Notificar o paciente (retorno JSON para o frontend)
    return jsonify({"message": f"Consulta com {medico} agendada para {data_consulta} às {hora_consulta}!"})


# Página de consultas do paciente
@app.route('/minhas-consultas', methods=['GET'])
def minhas_consultas():
    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, medico, data, hora FROM consultas WHERE paciente = ?', ("Paciente Atual",))
        consultas = cursor.fetchall()
    return render_template('minhas_consultas.html', consultas=consultas)

# Cancelar consulta
@app.route('/cancelar-consulta/<int:id>', methods=['DELETE'])
def cancelar_consulta(id):
    try:
        with connect_db() as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM consultas WHERE id = ?', (id,))
            conn.commit()
        return jsonify({"message": "Consulta cancelada com sucesso!"})
    except Exception as e:
        # Retornar mensagem de erro
        return jsonify({"error": f"Erro ao cancelar consulta: {str(e)}"}), 500


# Página de histórico de consultas
@app.route('/historico', methods=['GET'])
def historico_consultas():
    with connect_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, medico, data, hora, observacoes FROM consultas WHERE paciente = ?', ("Paciente Atual",))
        historico = cursor.fetchall()
    return render_template('historico.html', historico=historico)

# Reagendar consulta
@app.route('/reagendar', methods=['GET', 'POST'])
def reagendar_consulta():
    if request.method == 'GET':
        # Carregar consultas existentes para exibição no formulário
        with connect_db() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT id, medico, data, hora FROM consultas WHERE paciente = ?', ("Paciente Atual",))
            consultas = cursor.fetchall()
        return render_template('reagendar.html', consultas=consultas)

    elif request.method == 'POST':
        # Processar o reagendamento da consulta
        data = request.json
        consulta_id = data['id']
        nova_data = data['data']
        novo_horario = data['hora']

        with connect_db() as conn:
            cursor = conn.cursor()
            # Verificar se o novo horário já está ocupado
            cursor.execute('SELECT * FROM consultas WHERE data = ? AND hora = ?', (nova_data, novo_horario))
            consulta_existente = cursor.fetchone()

            if consulta_existente:
                return jsonify({"error": "Horário indisponível!"}), 400

            cursor.execute('UPDATE consultas SET data = ?, hora = ? WHERE id = ?', (nova_data, novo_horario, consulta_id))
            conn.commit()
        return jsonify({"message": "Consulta reagendada com sucesso!"})

if __name__ == '__main__':
    app.run(debug=True)

@app.before_request
def require_login():
    allowed_routes = ['index', 'login', 'register', 'register_page']
    if 'user_id' not in session and request.endpoint not in allowed_routes:
        return redirect(url_for('index'))