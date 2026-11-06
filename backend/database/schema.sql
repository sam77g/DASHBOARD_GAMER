CREATE DATABASE IF NOT EXISTS dashboardgamer   ;
USE dashboardgamer ;

CREATE TABLE jogos (
    id INT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    horas_jogadas DECIMAL(6,1) NOT NULL,
    platforma VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP NOT NULL,
    atualizado_em TIMESTAMP NOT NULL
)

