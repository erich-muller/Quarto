# Delta Data — Empresa Júnior de Matemática (DMA / UFV)

Site institucional, catálogo de serviços e portfólio técnico da **Delta Data**, Empresa Júnior dos cursos de Bacharelado e Licenciatura em Matemática da **Universidade Federal de Viçosa (UFV - Campus Florestal)**, filiada à **FEJEMG** e à **Brasil Júnior**.

Construído com **Astro (SSG)**, estilizado com **Tailwind CSS**, renderização de artigos técnicos no estilo **Obsidian / Quartz** (com equações matemáticas **KaTeX**, realce de sintaxe **Shiki** e callouts), painel editorial web **Decap CMS** e automação de deploy contínuo no **GitHub Pages**.

---

## 1. Identidade Visual & Brand Guidelines

As cores e regras oficiais estão mapeadas no `tailwind.config.mjs` com foco em elegância, legibilidade e equilíbrio neutro:

| Elemento / Token | Cor Hex | Aplicação Principal |
| :--- | :--- | :--- |
| `brand-dark` | `#02160E` | Verde Escuro oficial (Identidade e elementos contrastantes) |
| `brand-light` | `#1FA05C` | Verde Claro oficial (Botões de ação, links, badges, acentos visuais) |
| `brand-white` | `#EAEAEA` | Branco oficial (Tipografia de destaque no tema escuro) |
| `brand-bg-light` | `#F9FAFB` | Fundo neutro suave no tema claro (alta legibilidade) |
| `brand-surface-light` | `#FFFFFF` | Superfície branca pura dos cards no tema claro |
| `brand-bg-dark` | `#0B0F12` | Fundo grafite neutro e sóbrio no tema escuro |
| `brand-surface-dark` | `#141A1E` | Superfície neutra dos cards no tema escuro |
| `brand-border-dark` | `#263036` | Bordas sutis e limpas no tema escuro |

### Tipografia
- **Títulos e Texto Corrido:** `Montserrat` (Google Fonts).
- **Código e Fórmulas:** `JetBrains Mono` / `Fira Code`.

### Aplicação dos Logotipos (Alternância Automática)
- **Modo Escuro:** exibe `public/images/logo/logo-dark.png` (ícone verde e texto branco para fundo escuro).
- **Modo Claro:** exibe `public/images/logo/logo-light.png` (ícone verde e texto escuro para fundo claro).
- **Versão Monocromática:** `public/images/logo/logo-mono.png`.

---

## 2. Execução Local do Projeto

### 1. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

> **Atenção à rota com prefixo `base: '/Quarto'`:**
> Como o site está configurado para deploy no GitHub Pages do repositório `Quarto`, as rotas locais são prefixadas com `/Quarto/`:
> - **Página Inicial:** `http://localhost:4321/Quarto/`
> - **Sobre Nós:** `http://localhost:4321/Quarto/sobre`
> - **Serviços:** `http://localhost:4321/Quarto/servicos`
> - **Portfólio:** `http://localhost:4321/Quarto/portfolio`
> - **Contato:** `http://localhost:4321/Quarto/contato`
> - **Painel Decap CMS:** `http://localhost:4321/Quarto/admin/`

---

## 3. Como Usar o Decap CMS Localmente (`/admin`)

O painel do Decap CMS permite redigir novos artigos e estudos de caso via navegador sem usar linha de comando.

### Passo a Passo para Uso Local:
1. Em um terminal, mantenha o Astro rodando:
   ```bash
   npm run dev
   ```
2. Em um **segundo terminal**, na pasta do projeto, inicie o servidor proxy local do Decap:
   ```bash
   npx decap-server
   ```
3. Abra no seu navegador o endereço exato com a barra final:
   **`http://localhost:4321/Quarto/admin/`**
4. O Decap CMS conectará automaticamente ao proxy local (`http://localhost:8081/api/v1`) e você poderá criar, editar e salvar rascunhos que serão gravados diretamente na pasta `src/content/portfolio/`.

---

## 4. Esteira de Serviços da Delta Data

1. **Sistemas de Coleta e Estruturação de Dados:**
   - Modelagem de bancos de dados relacionais e pipelines ETL/ELT automatizados para eliminar digitação manual e planilhas desconexas.
2. **Gestão à Vista (BI & Dashboards):**
   - Painéis operacionais e gerenciais (Power BI, Streamlit, Looker Studio) com filtros dinâmicos e Análise Exploratória de Dados (EDA).
3. **Modelagem e BI Avançado (White-Box):**
   - Previsão de demanda, otimização de rotas e cenários com código aberto documentado e orientação de professores doutores do DMA/UFV.
4. **Recursos Educacionais em Matemática:**
   - Sequências didáticas alinhadas à BNCC, listas comentadas passo a passo, roteiros para laboratórios investigativos e oficinas para escolas.

---

## 5. Publicação Contínua (GitHub Pages)

O workflow `.github/workflows/deploy.yml` compila e publica o site automaticamente a cada novo `git push` na branch `main`:

1. No repositório GitHub (`https://github.com/erich-muller/Quarto`), certifique-se de que em **Settings** $\rightarrow$ **Pages**, o **Source** está definido como **GitHub Actions**.
2. Faça commit das alterações:
   ```bash
   git add .
   git commit -m "feat: site institucional e portfolio Delta Data UFV com novo design"
   git push origin main
   ```
3. O site estará disponível em: **`https://erich-muller.github.io/Quarto/`**.
