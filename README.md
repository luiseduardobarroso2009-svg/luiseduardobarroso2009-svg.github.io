# Site — Luis Eduardo, Desenvolvedor Web Full Stack

Site de apresentação em uma página, feito para transformar visitantes em conversas pelo WhatsApp ou e-mail.

- **Sem dependências.** Só precisa de Node.js 18 ou mais novo. Nada de `npm install`.
- **HTML estático gerado no build.** O conteúdo já chega pronto no HTML (bom para buscadores e para quem está sem JavaScript).
- **JavaScript pequeno e sem bibliotecas**, só para as interações.
- **Nenhum dado do visitante é enviado ou guardado.** O briefing monta uma mensagem que a pessoa revisa e envia pelo próprio WhatsApp.

## Como rodar

```bash
npm run dev      # gera o build, abre em http://localhost:4321 e refaz a cada alteração salva
npm run build    # gera a versão final em /dist
npm start        # só serve o /dist atual, sem observar arquivos
```

Sem `npm`, funciona igual com `node dev.mjs` e `node build.mjs`.

## Como publicar

O site está publicado em **https://luiseduardobarroso2009-svg.github.io/** pelo GitHub Pages.

A publicação é automática: a cada alteração enviada para a branch `main`, o GitHub Actions roda `node build.mjs` e publica a pasta `dist/` (veja `.github/workflows/deploy.yml`). O andamento aparece na aba **Actions** do repositório.

Para editar pelo navegador: abra o arquivo no GitHub, clique no lápis, salve (Commit changes) e espere um ou dois minutos.

Se um dia usar um domínio próprio, troque `url` em `src/config.js`, configure o domínio em **Settings → Pages** e envie a alteração.

### Google

- `sitemap.xml` e `robots.txt` são gerados no build a partir de `url`.
- Para verificar o site no Google Search Console pelo método "Tag HTML", cole o código em `googleVerification`, no `src/config.js`.

## Onde editar

| O que | Arquivo |
| --- | --- |
| Nome, cargo, WhatsApp, e-mail, título e descrição da página | `src/config.js` |
| Serviços (problema, o que é feito, o que se define junto, próximo passo) | `src/data/services.js` |
| Seletor “O que você precisa colocar no ar?” | `src/data/needs.js` |
| Etapas do processo e nota sobre prazo/investimento | `src/data/process.js` |
| Projetos | `src/data/projects.js` |
| Perguntas frequentes | `src/data/faq.js` |
| Política de Privacidade e Termos de Uso | `src/data/legal.js` |
| Perguntas e opções do briefing | `src/data/briefing.js` |
| Camadas Interface / Lógica / Dados da abertura | `src/data/layers.js` |
| Cores, fontes, espaçamentos, bordas, foco | `src/styles/tokens.css` |

Os componentes ficam em `src/components/` (um arquivo por seção) e as interações em `src/scripts/main.js`.

### Cadastrar um projeto

Adicione um objeto em `src/data/projects.js`. O formato está documentado no próprio arquivo. Quando a lista tem pelo menos um item, a grade aparece no lugar do convite para conversar. Projetos com `demo: true` recebem o selo “Demonstração — não é um projeto de cliente”.

Imagens vão em `public/img/projetos/` (prefira `.webp` ou `.avif`, com cerca de 1200 × 750 px).

## O que ainda falta você preencher

1. **Projetos reais** — `src/data/projects.js` (hoje vazio, de propósito).
2. **Condições comerciais, se quiser mostrar** — formas de pagamento, suporte depois da entrega, forma dos alinhamentos. As respostas do FAQ (`src/data/faq.js`), a Política de Privacidade e os Termos (`src/data/legal.js`) e a nota de prazo/investimento (`src/data/process.js`) foram escritas sem afirmar políticas que não foram definidas. Os pontos estão marcados com `EDITAR`.
3. **Redes sociais ou GitHub, se quiser** — não foram incluídos porque não foram informados.
4. **Revisar os textos** — principalmente o que é dito sobre como você trabalha, para que soe como você.

## Direção de arte

- **Paleta monocromática:** off-white `#F3F3F0`, quase preto `#111312`, áreas pretas `#0B0C0C` e cinzas para texto secundário. Nenhuma cor de destaque: estados são indicados por inversão, peso, borda, ícone e texto.
- **Ritmo claro/escuro com intenção:** as áreas escuras marcam os momentos de ação (abertura, briefing, contato); o conteúdo de leitura fica no claro.
- **Tipografia:** Archivo (títulos, com itálico leve como contraponto), IBM Plex Sans (texto) e IBM Plex Mono (rótulos técnicos). Todas com fontes do sistema como alternativa, carregadas do Google Fonts.
- **Assinatura visual:** o monograma “LE” numa grade de 4 px e o diagrama de camadas empilhadas, que reaparece no estado vazio de Projetos e na imagem de compartilhamento.
- **Ícones:** família única desenhada para o site (`src/components/icons.js`), grade 24 × 24, traço 1.5.

## Acessibilidade e qualidade

- HTML semântico, link “Pular para o conteúdo”, foco visível em todos os controles.
- Menu mobile com `aria-expanded`, fecha com Esc e ao escolher um link.
- Seletor de camadas no padrão de abas (setas, Home, End).
- FAQ e detalhes dos serviços com `<details>` — funcionam sem JavaScript.
- Briefing: progresso em texto, validação com mensagem explicando o que falta, foco levado para cada etapa, respostas mantidas ao voltar, resumo com “Editar” e aviso antes de abrir o WhatsApp.
- Animações curtas e desligadas com `prefers-reduced-motion`.
- Sem JavaScript, todo o conteúdo continua visível e o briefing é substituído por links diretos de contato.
