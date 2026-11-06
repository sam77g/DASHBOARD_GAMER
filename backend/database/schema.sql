CREATE DATABASE dashboardgamer   ;
USE dashboardgamer ;

CREATE TABLE jogos (
    id INT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    horas_jogadas DECIMAL(6,1) NOT NULL,
    platforma VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

