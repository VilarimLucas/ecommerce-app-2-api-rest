# E-commerce API REST

Este projeto foi desenvolvido para a aula de **Teste e Qualidade de Software**, implementando um sistema de **e-commerce** utilizando banco de dados não relacional (MongoDB) e **Node.js** com Express. O projeto inclui funcionalidades como autenticação de usuários, gerenciamento de produtos, e utiliza Swagger para documentação da API.

## Requisitos

- **Node.js** (versão mínima recomendada: 14.x)
- **npm** (ou **yarn**) instalado
- **MongoDB** rodando localmente ou em um serviço de nuvem

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/ecommerce-app-2-api-rest.git
   cd ecommerce-app-2-api-rest
   ```

2. Instale as dependências: 

   ```bash
   npm install
   ```

## Scripts disponíveis

No arquivo package.json, os seguintes scripts estão disponíveis:

- npm run dev: Executa o servidor no modo de desenvolvimento com nodemon, reiniciando automaticamente ao detectar mudanças.

```bash
npm run dev
```

- npm run build: Executa o servidor em modo de produção (sem nodemon).

```bash
npm run build
```

- npm run test: Executa os testes unitários utilizando o Jest.

```bash
npm run test
```

## Gerando a Documentação com Swagger

Este projeto utiliza swagger-jsdoc para gerar a documentação da API a partir de anotações no código.

### Gerando o arquivo swagger.json

Antes de gerar a documentação completa, você precisa criar o arquivo swagger.json a partir das anotações JSDoc nas rotas. Um script foi configurado para facilitar esse processo.

1. Execute o script para gerar o swagger.json:

   ```bash
   node generate-swagger-json.js
   ```

## Gerando o arquivo docs.html com ReDoc
Com o arquivo swagger.json gerado, você pode criar a documentação em formato HTML utilizando o ReDoc.

2. Para gerar o arquivo docs.html, execute o seguinte comando:

   ```bash
   npx @redocly/cli build-docs swagger.json -o docs.html
   ```

   ### Acessando a Documentação

   Após gerar o arquivo `docs.html`, você pode visualizá-lo abrindo o arquivo no navegador.
   
   A documentação da API também está disponível online através do GitHub Pages. Você pode acessá-la no seguinte link:
   
   [Documentação da API](https://vilarimlucas.github.io/ecommerce-app-2-api-rest/docs.html)
   
### Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.


### Explicação do conteúdo do `README.md`:

1. **Introdução**: Descreve o projeto e o objetivo.
2. **Requisitos**: Indica o que é necessário para rodar o projeto.
3. **Instalação**: Instruções sobre como clonar o repositório e instalar as dependências.
4. **Scripts disponíveis**: Explica os comandos disponíveis no `package.json` para rodar o servidor em desenvolvimento, produção e rodar os testes.
5. **Gerando a documentação**: Explica como gerar o `swagger.json` e o `docs.html` usando os scripts e o Redoc.
6. **Acessando a documentação**: Informa que o arquivo `docs.html` pode ser configurado para ser servido no GitHub Pages e cria um espaço para o link.
7. **Contribuindo**: Um espaço para encorajar contribuições ao projeto.

Com esse `README.md`, qualquer pessoa que pegar o projeto saberá como rodá-lo, gerar a documentação e visualizá-la.

Se precisar de mais alguma coisa ou algum ajuste, é só me avisar!
