# Cuco Dashboard

Esta é uma aplicação de demonstração de um CRUD simples de clientes, criado utilizando as seguintes tecnologias:
- Vue.js 3 (Vite, Composition API, Pinia)
- Tailwind.css (Framework CSS)
- JSON Server (Mock do Backend)

## Execução da Aplicação em Ambiente Local
Para executar a aplicação em ambiente local é muito simples, basta rodar os seguintes comandos.

Obs.: Para que seja possível consultar os clientes, é necessário que a aplicação do `JSON Server` esteja rodando na sua máquina.

- `npm install`
- `npm run dev`
- Alterar a `baseURL` do arquivo `src/api/API.js` para apontar para o endereço local do JSON SERVER da sua máquina.

Antes da alteração:

![Onde alterar](https://user-images.githubusercontent.com/39170090/217411328-42f6d4cd-b1e6-4d40-9c8b-36c044cce504.png)

Após a alteração:

![final](https://user-images.githubusercontent.com/39170090/217411356-5b0277fd-30f5-4324-b83e-5d5051aa72c1.png)

Após as alterações, a aplicação deve rodar normalmente.
