const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Configuração da conexão com o banco de dados
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'hoteis'
});

con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Função de teste
const teste = (req, res) => {
    res.send("Back-end respondendo");
};


// CRUD - Clientes
const createclientes = (req, res) => {
    const { nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;

    const query = 'INSERT INTO Clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Clientes criado com sucesso', result });
        }
    });
};

const readclientes = (req, res) => {
    con.query("SELECT * FROM clientes", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateclientes = (req, res) => {
    const { cliente_id, nome, cpf, email, endereco, data_nascimento, data_cadastro } = req.body;

    const query = 'UPDATE clientes SET nome = ?, cpf = ?, email = ?,endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Clientes atualizado com sucesso', result });
        }
    });
};

const deleteclientes = (req, res) => {
    const {cliente_id} = req.params;

    const query = 'DELETE FROM clientes WHERE cliente_id = ?';
    con.query(query, [cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Removido com sucesso', result });
        }
    });
};

// CRUD - Estacionamento
const createestacionamento = (req, res) => {
    const { cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida } = req.body;

    const query = 'INSERT INTO estacionamento (cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'estacionamento criado com sucesso', result });
        }
    });
};

const readestacionamento = (req, res) => {
    con.query("SELECT * FROM estacionamento", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updateestacionamento = (req, res) => {
    const { estacionamento_id, cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida } = req.body;

    const query = 'UPDATE estacionamento SET cliente_id = ?, veiculo_placa = ?, veiculo_marca = ?, veiculo_modelo = ?, data_entrada = ?, data_saida = ?  WHERE estacionamento_id = ?';
    con.query(query, [cliente_id, veiculo_placa, veiculo_marca, veiculo_modelo, data_entrada, data_saida, estacionamento_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'estacionamento atualizado com sucesso', result });
        }
    });
};

const deleteestacionamento = (req, res) => {
    const { estacionamento_id } = req.params;

    const query = 'DELETE FROM estacionamento WHERE estacionamento_id = ?';
    con.query(query, [estacionamento_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'estacionamento removido com sucesso', result });
        }
    });
};


// CRUD - quarto
const createquartos = (req, res) => {
    const { numero, andar, tipo, valor_diaria, statusQuarto, cliente_id } = req.body;

    const query = 'INSERT INTO quartos (numero, andar, tipo, valor_diaria, statusQuarto, cliente_id) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [numero, andar, tipo, valor_diaria, statusQuarto, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'quarto criado com sucesso', result });
        }
    });
};

const readquartos = (req, res) => {
    con.query("SELECT * FROM quartos", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updatequartos = (req, res) => {
    const { quarto_id, numero, andar, tipo, valor_diaria, statusQuarto, cliente_id } = req.body;

    const query = 'UPDATE quartos SET numero = ?, andar = ?, tipo = ?, valor_diaria = ?, statusQuarto = ?, cliente_id = ? WHERE quarto_id = ?';
    con.query(query, [numero, andar, tipo, valor_diaria, statusQuarto, cliente_id, quarto_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'quarto atualizado com sucesso', result });
        }
    });
};

const deletequartos = (req, res) => {
    const { quarto_id } = req.params;

    const query = 'DELETE FROM quartos WHERE quarto_id = ?';
    con.query(query, [quarto_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'quarto removido com sucesso', result });
        }
    });
};

// CRUD - reserva
const createreservas = (req, res) => {
    const { cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva } = req.body;

    const query = 'INSERT INTO reservas (cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva) VALUES(?, ?, ?, ?, ?, ?, ?)';
    con.query(query, [cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'reserva criada com sucesso', result });
        }
    });
};

const readreservas = (req, res) => {
    con.query("SELECT * FROM reservas", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updatereservas = (req, res) => {
    const { reserva_id, cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva } = req.body;

    const query = 'UPDATE reservas SET cliente_id = ?, quarto_id = ?, data_reserva = ?, data_entrada = ?,  data_saida = ?, valor_total = ?, statusReserva = ?  WHERE reserva_id = ?';
    con.query(query, [cliente_id, quarto_id, data_reserva, data_entrada, data_saida, valor_total, statusReserva, reserva_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'reserva atualizada com sucesso', result });
        }
    });
};

const deletereservas = (req, res) => {
    const { reserva_id } = req.params;

    const query = 'DELETE FROM reservas WHERE reserva_id = ?';
    con.query(query, [reserva_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'reserva removida com sucesso', result });
        }
    });
};


// CRUD - telefone
const createtelefone = (req, res) => {
    const { cliente_id, numero, tipo } = req.body;

    const query = 'INSERT INTO telefone (cliente_id, numero, tipo) VALUES(?, ?, ?)';
    con.query(query, [cliente_id, numero, tipo], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'telefone criada com sucesso', result });
        }
    });
};

const readtelefone = (req, res) => {
    con.query("SELECT * FROM telefone", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updatetelefone = (req, res) => {
    const { telefone_id, cliente_id, numero, tipo } = req.body;

    const query = 'UPDATE telefone SET cliente_id = ?, numero = ?, tipo = ? WHERE telefone_id = ?';
    con.query(query, [cliente_id, numero, tipo, telefone_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'telefone atualizada com sucesso', result });
        }
    });
};

const deletetelefone = (req, res) => {
    const { telefone_id } = req.params;

    const query = 'DELETE FROM telefone WHERE telefone_id = ?';
    con.query(query, [telefone_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'telefone removido com sucesso', result });
        }
    });
};


// Inicialização do Express
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

// Rotas para clientes
app.post("/clientes", createclientes);
app.get("/clientes", readclientes);
app.put("/clientes", updateclientes);
app.delete("/clientes/:cliente_id", deleteclientes);

// Rotas para estacionamento
app.post("/estacionamento", createestacionamento);
app.get("/estacionamento", readestacionamento);
app.put("/estacionamento", updateestacionamento);
app.delete("/estacionamento/:estacionamento_id", deleteestacionamento);

// Rotas para quartos
app.post("/quartos", createquartos);
app.get("/quartos", readquartos);
app.put("/quartos", updatequartos);
app.delete("/quartos/:quarto_id", deletequartos);

// quartos para reserva
app.post("/reservas", createreservas);
app.get("/reservas", readreservas);
app.put("/reservas", updatereservas);
app.delete("/reservas/:reserva_id", deletereservas);

// Rotas para telefone
app.post("/telefone", createtelefone);
app.get("/telefone", readtelefone);
app.put("/telefone", updatetelefone);
app.delete("/telefone/:telefone_id", deletetelefone);

// Inicialização do servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});