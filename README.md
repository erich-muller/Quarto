# Quarto Analytics — Site Institucional & Portfólio Técnico

Site institucional, catálogo de serviços e portfólio técnico da **Quarto Analytics**, consultoria especializada em Engenharia de Dados, Business Intelligence e Machine Learning.

Construído com **Astro (SSG)**, estilizado com **Tailwind CSS**, renderização técnica estilo **Obsidian / Quartz** (com equações matemáticas **KaTeX**, realce de sintaxe **Shiki** e callouts), painel editorial web **Decap CMS** e automação de deploy contínuo no **GitHub Pages**.

---

## 1. Identidade Visual & Brand Guidelines

As cores e regras oficiais estão mapeadas estritamente no `tailwind.config.mjs`:

| Elemento / Token | Cor Hex | Aplicação Principal |
| :--- | :--- | :--- |
| `brand-dark` | `#02160E` | Verde Escuro oficial (Background escuro, textos no tema claro) |
| `brand-light` | `#1FA05C` | Verde Claro oficial (Botões de ação, acentos, links, badges) |
| `brand-white` | `#EAEAEA` | Branco oficial (Superfícies de contraste e textos no tema escuro) |
| `brand-bg-light` | `#F7FAF8` | Fundo suave para o tema claro com alta taxa de legibilidade |
| `brand-border-dark` | `#134B34` | Bordas sutis no tema escuro |

### Tipografia
- **Títulos e Texto Corrido:** `Montserrat` (Google Fonts).
- **Código e Fórmulas:** `JetBrains Mono` / `Fira Code`.

### Aplicação dos Logotipos
O site realiza a alternância automática entre as versões do logotipo sem qualquer *flicker*:
- **Modo Escuro:** `public/images/logo/logo-dark.png` (derivado de `logotipo_v1.png`: ícone verde e tipografia branca sobre fundo `#02160E`).
- **Modo Claro:** `public/images/logo/logo-light.png` (derivado de `logotipo_v2.png`: ícone verde e tipografia escura sobre fundo claro).
- **Versão Monocromática:** `public/images/logo/logo-mono.png` (derivado de `logotipo_v3.png`).

---

## 2. Estrutura do Projeto

```
Quarto/
├── .github/
│   └── workflows/
│       └── deploy.yml                   # Deploy automático no GitHub Pages a cada push
├── public/
│   ├── admin/
│   │   ├── config.yml                   # Configuração e schema da coleção do Decap CMS
│   │   └── index.html                   # SPA do Decap CMS via CDN
│   ├── images/
│   │   ├── logo/
│   │   │   ├── logo-dark.png            # Logotipo oficial Dark Mode
│   │   │   ├── logo-light.png           # Logotipo oficial Light Mode
│   │   │   └── logo-mono.png            # Logotipo monocromático
│   │   └── portfolio/                   # Imagens e capas dos artigos do portfólio
│   ├── favicon.svg                      # Favicon SVG vetorial
│   └── robots.txt                       # Diretivas para motores de busca
├── src/
│   ├── components/
│   │   ├── Callout.astro                # Destaques estilo Obsidian ([!NOTE], [!TIP], etc.)
│   │   ├── CodeBlockCopy.astro          # Botão "Copiar código" com feedback visual
│   │   ├── Footer.astro                 # Rodapé institucional e link para o CMS
│   │   ├── Header.astro                 # Navegação responsiva e troca automática de logo
│   │   ├── ImageLightbox.astro          # Visualizador modal de gráficos e diagramas
│   │   ├── ProjectCard.astro            # Card técnico de projeto com tags e tempo de leitura
│   │   ├── TableOfContents.astro        # Sumário lateral interativo (TOC)
│   │   └── ThemeToggle.astro            # Alternador minimalista Claro / Escuro
│   ├── content/
│   │   ├── config.ts                    # Validação de schema com Zod (Astro Collections)
│   │   └── portfolio/                   # Artigos técnicos em Markdown com LaTeX
│   │       ├── analise-preditiva-churn.md
│   │       ├── arquitetura-lakehouse-tempo-real.md
│   │       └── otimizacao-precificacao-dinamica.md
│   ├── layouts/
│   │   ├── ArticleLayout.astro          # Layout de leitura técnica estilo Quartz/Obsidian
│   │   └── BaseLayout.astro             # Shell mestre HTML com SEO e KaTeX
│   ├── pages/
│   │   ├── 404.astro                    # Página 404 personalizada
│   │   ├── contato.astro                # Página de contato e canais diretos
│   │   ├── index.astro                  # Página inicial com Hero, Métricas e Serviços
│   │   ├── portfolio/
│   │   │   ├── index.astro              # Grid de artigos com busca e filtros por tag
│   │   │   └── [...slug].astro          # Rota dinâmica para cada artigo
│   │   ├── servicos.astro               # Catálogo completo das soluções de consultoria
│   │   └── sobre.astro                  # Apresentação institucional e metodologia analítica
│   ├── styles/
│   │   ├── global.css                   # Variáveis CSS, KaTeX e reset
│   │   └── obsidian.css                 # Tipografia técnica, callouts e blocos de código
│   └── utils/
│       └── helpers.ts                   # Formatação de datas, tempo de leitura e slugs
├── astro.config.mjs                     # Configuração do Astro (site, base, plugins KaTeX/Shiki)
├── package.json                         # Dependências e scripts
├── tailwind.config.mjs                  # Configuração de temas, cores e plugins
└── tsconfig.json                        # TypeScript config com aliases (@components, etc.)
```

---

## 3. Instruções de Execução Local

### Pré-requisitos
- **Node.js**: versão `18.17.0` ou superior (recomendado `20.x` LTS).
- **npm** (ou `pnpm` / `bun`).

> **No Fedora / Linux**:
> Caso ainda não tenha o Node.js e o npm instalados:
> ```bash
> sudo dnf install nodejs npm
> ```
> Ou via NVM:
> ```bash
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
> nvm install 20
> ```

### 1. Clonar e Instalar Dependências
```bash
git clone https://github.com/erich-muller/Quarto.git
cd Quarto
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
O Astro iniciará o servidor local em `http://localhost:4321/Quarto/`.

### 3. Build de Produção e Visualização Prévia
```bash
# Compila os arquivos estáticos na pasta /dist
npm run build

# Pré-visualiza o build de produção localmente
npm run preview
```

---

## 4. Gestão de Artigos via Decap CMS (`/admin`)

O painel editorial do Decap CMS permite que autores criem e editem artigos sem necessidade de conhecimento avançado de Git ou linha de comando.

- Acesse localmente: `http://localhost:4321/Quarto/admin/`
- Acesse em produção: `https://erich-muller.github.io/Quarto/admin/`

### Como Funciona o Backend Local (Desenvolvimento)
Para testar o Decap CMS localmente sem precisar se conectar ao GitHub:
1. Em um terminal separado, execute o servidor proxy local do Decap:
   ```bash
   npx decap-server
   ```
2. O arquivo `public/admin/config.yml` já está configurado com `local_backend: true`.
3. Acesse `http://localhost:4321/Quarto/admin/` e você poderá criar, editar e salvar rascunhos diretamente nos arquivos do seu disco local (`src/content/portfolio/`).

---

## 5. Configuração da Autenticação OAuth do GitHub em Produção

Para que os autores possam logar no Decap CMS em produção (`https://erich-muller.github.io/Quarto/admin/`) usando suas contas do GitHub, é necessário configurar um serviço de autenticação OAuth. O GitHub não permite autenticação OAuth direta via SPA no navegador sem um backend de troca de token por segurança.

Existem **três opções simples e seguras**:

### Opção A: Usar um Gateway OAuth Gratuito (Cloudflare Worker — Recomendada)
1. **Criar um GitHub OAuth App**:
   - Vá em **GitHub** $\rightarrow$ **Settings** $\rightarrow$ **Developer Settings** $\rightarrow$ **OAuth Apps** $\rightarrow$ **New OAuth App**.
   - **Application name**: `Quarto Decap CMS`
   - **Homepage URL**: `https://erich-muller.github.io/Quarto/`
   - **Authorization callback URL**: `https://seu-worker.workers.dev/callback`
   - Salve e anote o **Client ID** e gere um **Client Secret**.

2. **Deploy do Cloudflare Worker**:
   - Utilize o template aberto [decap-cms-oauth-cloudflare-worker](https://github.com/heroet/decap-cms-oauth-cloudflare-worker) ou similar.
   - Configure as variáveis de ambiente `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET`.

3. **Atualizar o `public/admin/config.yml`**:
   ```yaml
   backend:
     name: github
     repo: erich-muller/Quarto
     branch: main
     base_url: https://seu-worker.workers.dev
     auth_endpoint: auth
   ```

### Opção B: Deploy Simultâneo do Admin via Netlify (Mais rápido e sem código)
1. Conecte este mesmo repositório no Netlify (apenas para gerenciar a identidade).
2. Vá em **Site Configuration** $\rightarrow$ **Identity** $\rightarrow$ **Services** $\rightarrow$ Habilite o **Git Gateway**.
3. No `public/admin/config.yml`, basta alterar o backend para:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```

---

## 6. Publicação e Deploy no GitHub Pages

O projeto já inclui o workflow `.github/workflows/deploy.yml`.

### Como Ativar no Repositório do GitHub:
1. No seu repositório no GitHub (`https://github.com/erich-muller/Quarto`), clique na aba **Settings**.
2. No menu lateral esquerdo, clique em **Pages**.
3. Na seção **Build and deployment**:
   - Em **Source**, selecione **GitHub Actions**.
4. Faça um `git push` na branch `main`:
   ```bash
   git add .
   git commit -m "feat: estrutura completa do site institucional e portfolio Quarto Analytics"
   git push origin main
   ```
5. O GitHub Actions executará o build automaticamente e publicará o site no endereço:
   **`https://erich-muller.github.io/Quarto/`**

---

## 7. Escrevendo Artigos com Suporte Obsidian / Quartz

Ao criar um novo artigo em `src/content/portfolio/nome-do-artigo.md` (ou via Decap CMS):

### Metadados (Frontmatter):
```markdown
---
title: "Título do Estudo de Caso"
description: "Resumo executivo do projeto em 1-2 frases."
publishDate: 2026-03-16
heroImage: "/Quarto/images/portfolio/sua-imagem.png"
tags: ["Machine Learning", "Python", "Lakehouse"]
featured: true
author: "Erich Müller Dutra"
---
```

### Fórmulas Matemáticas (KaTeX):
- **Inline:** `$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$`
- **Em bloco:**
  ```markdown
  $$
  \mathcal{L}_{\text{XGBoost}} = \sum_{i=1}^n l(y_i, \hat{y}_i) + \gamma T + \frac{1}{2}\lambda \sum_{j=1}^T w_j^2
  $$
  ```

### Callouts Estilo Obsidian:
```markdown
> [!NOTE] Título Opcional
> Conteúdo do destaque conceitual.

> [!TIP] Dica Prática
> Sugestão de implementação ou parâmetro.

> [!WARNING] Alerta de Negócio
> Ponto crítico de atenção na modelagem.

> [!IMPORTANT] Requisito de Engenharia
> Instrução fundamental de arquitetura.
```

### Blocos de Código:
Os blocos de código em qualquer linguagem recebem automaticamente destaque de sintaxe Shiki e botão interativo de **Copiar código**:
````markdown
```python
import numpy as np
print("Cálculo reproduzível")
```
````

