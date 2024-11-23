from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'  # Substitua por uma string única e segura

# Configuração do banco de dados PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:KOEtaMCAJSsUpZVwqZgTLGkmGokHEAIN@autorack.proxy.rlwy.net:35974/railway'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar o banco de dados
db = SQLAlchemy(app)

# Modelos para tabelas
class Consulta(db.Model):
    __tablename__ = 'consultas'
    id = db.Column(db.Integer, primary_key=True)
    paciente = db.Column(db.String(100), nullable=False)
    medico = db.Column(db.String(100), nullable=False)
    data = db.Column(db.String(20), nullable=False)
    hora = db.Column(db.String(20), nullable=False)
    observacoes = db.Column(db.Text)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)

# Criar as tabelas no banco
with app.app_context():
    db.create_all()

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect('/')

@app.route('/medico/consultas', methods=['GET'])
def medico_consultas():
    medico = "Médico Atual"  # Substitua por autenticação futura
    consultas = Consulta.query.filter_by(medico=medico).all()
    return render_template('medico_consultas.html', consultas=consultas)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/register', methods=['GET'])
def register_page():
    return render_template('register.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']

    try:
        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Usuário registrado com sucesso!"})
    except Exception:
        return jsonify({"error": "Usuário já existe!"}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username, password=password).first()

    if user:
        session['user_id'] = user.id
        return jsonify({"message": "Login bem-sucedido!"})
    else:
        return jsonify({"error": "Login ou senha inválidos!"}), 401

@app.route('/agendar', methods=['GET'])
def agendar_page():
    return render_template('agendar.html')

@app.route('/agendar', methods=['POST'])
def agendar():
    data = request.json
    medico = data['medico']
    data_consulta = data['data']
    hora_consulta = data['hora']

    consulta_existente = Consulta.query.filter_by(medico=medico, data=data_consulta, hora=hora_consulta).first()

    if consulta_existente:
        return jsonify({"error": "Horário indisponível!"}), 400

    new_consulta = Consulta(
        paciente="Paciente Atual",
        medico=medico,
        data=data_consulta,
        hora=hora_consulta
    )
    db.session.add(new_consulta)
    db.session.commit()

    return jsonify({"message": f"Consulta com {medico} agendada para {data_consulta} às {hora_consulta}!"})

@app.route('/minhas-consultas', methods=['GET'])
def minhas_consultas():
    consultas = Consulta.query.filter_by(paciente="Paciente Atual").all()
    return render_template('minhas_consultas.html', consultas=consultas)

@app.route('/cancelar-consulta/<int:id>', methods=['DELETE'])
def cancelar_consulta(id):
    consulta = Consulta.query.get(id)
    if consulta:
        db.session.delete(consulta)
        db.session.commit()
        return jsonify({"message": "Consulta cancelada com sucesso!"})
    else:
        return jsonify({"error": "Consulta não encontrada!"}), 404

@app.route('/historico', methods=['GET'])
def historico_consultas():
    historico = Consulta.query.filter_by(paciente="Paciente Atual").all()
    return render_template('historico.html', historico=historico)

@app.route('/reagendar', methods=['GET', 'POST'])
def reagendar_consulta():
    if request.method == 'GET':
        consultas = Consulta.query.filter_by(paciente="Paciente Atual").all()
        return render_template('reagendar.html', consultas=consultas)

    elif request.method == 'POST':
        data = request.json
        consulta_id = data['id']
        nova_data = data['data']
        novo_horario = data['hora']

        consulta_existente = Consulta.query.filter_by(data=nova_data, hora=novo_horario).first()

        if consulta_existente:
            return jsonify({"error": "Horário indisponível!"}), 400

        consulta = Consulta.query.get(consulta_id)
        if consulta:
            consulta.data = nova_data
            consulta.hora = novo_horario
            db.session.commit()
            return jsonify({"message": "Consulta reagendada com sucesso!"})
        else:
            return jsonify({"error": "Consulta não encontrada!"}), 404

@app.before_request
def require_login():
    allowed_routes = ['index', 'login', 'register', 'register_page']
    if 'user_id' not in session and request.endpoint not in allowed_routes:
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=False)
