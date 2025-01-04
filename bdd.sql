-- Criar tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    age INT,
    gender VARCHAR(10),
    profile_image VARCHAR(255)
);

-- Criar tabela de dados de atividade
CREATE TABLE activity_data (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    value DECIMAL(10,2) NOT NULL
);
