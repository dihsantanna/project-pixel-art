# Projeto Pixels Art - Paleta de Cores

## Boas vindas ao repositório do `Pixels Art - Paleta de Cores`!!!

### Habilidades desenvolvidas

- Manipular o DOM;
- HTML;
- CSS;
- Javascript

---

## O que foi desenvolvido

Neste projeto, foi implementado um editor de arte com pixels. Ou seja, dada uma paleta de cores e um quadro composto por pixels, é possível pintar o que quiser no quadro! Para isto foi utilizado `javascript`, `css` e `html`.

Para os testes foi utilizado o framework `Cypress`, somente os requisitos 13, 14 e 15 foram escritos por mim.

---

![Demonstração da pagina](demonstração.gif)

## Instruções para rodar a aplicação:

1. Caso deseje apenas testar o funcionamento da aplicação sem baixar os arquivos sugiro acessar [https://pixels-art-color-pallet.netlify.app/](https://pixels-art-color-pallet.netlify.app/), caso não seja esse o caso passe para a próxima etapa.

2. Escolha uma pasta de sua preferência e clone o repositório
    ```bash
      git clone git@github.com:dihsantanna/project-pixels-art.git
    ```
  * Entre na pasta do repositório que você acabou de clonar:
    ```bash
      cd project-pixels-art
    ```

3. Abra o arquivo `index.html`:

  * no terminal do ubuntu:
    ```bash
      xdg-open index.html
    ```
  * no terminal do mac:
    ```bash
      open index.html
    ```
  * no terminal windows:
    ```bash
      start index.html
    ```

  * caso não consiga utilizar alguma destas formas, você pode ainda abrir o arquivo manualmente utilizando o navegador de sua preferência.


## Rodando os testes:

1. Primeiro instale as dependências:
    ```bash
      npm install
    ```
2. Os testes são executados pelo Cypress e existem duas formas de roda-lo:
  * Para executar os testes apenas no terminal:
    ```bash
      npm run test
    ```
  * Para executar os testes e vê-los rodando em uma janela de navegador:
    ```bash
      npm run cypress:open
    ```
