# Teste
Eu tenho que entregar o teste abaixo em 3 dias. Me ajude à fazê-lo com qualidade e com as melhores práticas modernas. Vou fazer algumas perguntas depois para tirar dúvidas e para fazermos isso passo a passo.

Desafio Full Stack: Sistema de Gerenciamento de Ativos (Assets)
O objetivo é criar uma aplicação onde o usuário possa gerenciar os ativos de uma empresa (como computadores, monitores e periféricos).

## Partes
### Parte 1: Front-end (Obrigatório - React)
Você deverá construir uma Single Page Application (SPA) que contenha:
● Dashboard de Listagem: Uma tabela ou grid exibindo os ativos com filtros (ex.: por categoria ou status).
● Formulário de Cadastro/Edição: Validação de campos (nome, número de série, data de aquisição).
● Gerenciamento de Estado: Utilize a tecnologia que julgar mais conveniente.
● Consumo de API: Integrar com o back-end desenvolvido ou, caso opte por não fazê-lo, utilizar uma lista estática/mockada.
● Estilização: Uso livre de bibliotecas de UI ou CSS-in-JS.

### Parte 2 (Opcional): Back-end (Diferencial - Java com Spring Boot)
Se você deseja colocar suas habilidades de back-end à prova, esta é uma etapa adicional e opcional do processo.
Você deve expor uma API REST funcional:
● Endpoints CRUD: GET /assets, POST /assets, PUT /assets/{id}, DELETE /assets/{id}.
● Banco de Dados: Uso de H2 (em memória) ou PostgreSQL via Docker.
● Persistência: Uso de biblioteca de sua preferência.
● Validação: Utilize a estratégia que considerar mais adequada.

### Parte 3: Execução local
O projeto deve conter obrigatoriamente:
1. Documentação: Um arquivo README.md bem escrito, explicando como rodar o projeto e as decisões técnicas tomadas.
2. Docker: Um arquivo docker-compose.yml que suba o banco de dados e a aplicação. O uso do Docker é obrigatório.
Importante: A equipe de avaliação não instalará bibliotecas ou plugins para executar o projeto localmente; toda a execução deverá ser "plug and play" através do Docker
Compose. Você tem a liberdade de unificar o front-end e o back-end em um mesmo arquivo compose ou separá-los, desde que o processo esteja devidamente documentado e funcional.

## Entrega
1. Disponibilizar o código em um repositório público (GitHub ou GitLab).
2. Responder esse e-mail com o link para o repositório.

## Observações
1. O prazo de entrega do desafio é 5 dias corridos.
2. O projeto deve estar containerizado com Docker, garantindo que o ambiente seja iniciado sem erros. Não iremos ajustar as configurações durante a avaliação e nem instalar dependências extras a não ser do docker, então a documentação deve ser precisa, fácil e funcional. Para evitar imprevistos, lembre sempre de testar antes de enviar.
3. Caso você seja contratado, você será compensado com o equivalente a 10 horas de desenvolvimento pelo tempo dedicado à confecção do desafio.