# 📸 Organizador de Links - Instagram (Insta Organizer)

Um aplicativo web moderno, responsivo e de alta performance criado para organizar, acompanhar e gerenciar links de Reels/Posts do Instagram com controle intuitivo de cópia e fila.

---

## 🎯 Objetivo do Projeto

Facilitar o fluxo de trabalho de cópia e postagem de links do Instagram. O sistema permite que a pessoa responsável navegue por uma lista numerada de links, copie com um único clique e tenha feedback visual imediato, com um controle automatizado de movimentação dos links copiados para o final da fila após um tempo de tolerância.

---

## 🚀 Funcionalidades Principais

1. **Numeração Fixa e Estática (`#1` a `#N`)**:
   - Cada link recebe um número único e estático baseado na ordem original em que foi inserido.
   - Mesmo que o link seja movido para o final da lista após ser copiado, **ele preserva seu número original** (Ex: o Link #1 continua sendo o #1 mesmo estando no final da página).

2. **Cópia Instantânea para a Área de Transferência**:
   - Botão de cópia rápido em cada cartão.
   - Suporte duplo para a API `navigator.clipboard` e um *fallback* resiliente com `document.execCommand('copy')` para garantir funcionamento em qualquer navegador/ambiente local (`file:///` ou `http://localhost`).

3. **Feedback Visual e Animação Flash (Neon Glow)**:
   - Ao clicar em copiar, o cartão emite um brilho verde neon instantâneo (`copyFlash` via CSS keyframes).
   - O ícone do botão muda para dois checks (`✓✓`) e a borda/fundo ganham tons verdes sutis.
   - Registra data e hora exatas da cópia (`Copiado dia DD/MM/AAAA às HH:MM`).

4. **Alerta Flutuante (Toast Notification)**:
   - Assim que o link é copiado, surge uma mensagem animada no rodapé da tela:  
     `✓ Link #X copiado! Moverá para o final em 20s.`

5. **Delay de 20 Segundos para Reordenar Fila**:
   - O link copiado **não pula para o final imediatamente**, evitando que o usuário perca a posição visual na tela.
   - Ele permanece parado no mesmo lugar por **20 segundos** (exibindo o status `movendo pro final em 20s...`).
   - Após os 20 segundos, ele desliza automaticamente para o final da lista.

6. **Botão de Limpeza em Massa (Limpar Todos)**:
   - Localizado no cabeçalho ao lado do contador total de links, com modal de confirmação de segurança.

7. **Persistência Local (LocalStorage)**:
   - Os dados e status de cada link ficam salvos em `localStorage` sob a chave `insta-links`.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semantic**: Estrutura limpa e semântica.
- **Vanilla CSS3**: Design system moderno com modo escuro (*Dark Mode*), transparência *Glassmorphism*, gradientes oficiais do Instagram e tipografia Google Fonts (*Outfit*).
- **Vanilla JavaScript (ES6+)**: Lógica sem dependências externas ou frameworks pesados.
- **Material Symbols (Google Icons)**: Ícones vetoriais modernos.

---

## 📂 Arquivos do Repositório (Handoff)

```text
.
├── index.html   # Estrutura HTML do app e container do Toast
├── style.css    # Design System, variáveis CSS, animações keyframes e Glassmorphism
└── script.js    # Lógica de importação, ordenação, cópia, timers e LocalStorage
```

---

## 💻 Como Rodar Localmente

Não requer instalação de Node.js nem `npm install`.

1. **Abra diretamente no navegador**:
   Basta dar um duplo clique no arquivo `index.html` ou arrastá-lo para dentro do Google Chrome / Safari / Edge.

2. **Ou via Servidor HTTP Local (Opcional)**:
   Se preferir rodar em uma porta local:
   ```bash
   python3 -m http.server 8080
   ```
   Acesse em: `http://localhost:8080`

---

## 📝 Guia para Desenvolvedores (Manutenção)

- **Para alterar o tempo de delay de reordenação (atualmente 20s)**:  
  No arquivo `script.js`, altere o valor de `link.moveAt = Date.now() + 20000;` (o valor está em milissegundos).
- **Para alterar a cor de destaque**:  
  No arquivo `style.css`, altere as variáveis `:root` (`--insta-gradient`, `--success-color`, etc.).

---

*Projeto desenvolvido e otimizado sob medida.* 🚀
