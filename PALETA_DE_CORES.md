# 🎨 Paleta de Cores - Site Eletrônicos Front

## 📋 Resumo da Paleta

Este documento contém todas as cores utilizadas no projeto **Site Eletrônicos Front**, organizadas por categorias e com informações sobre seu uso.

---

## 🟣 Cores Principais (Brand Colors)

### Roxo Principal
- **Hex:** `#845bdf`
- **RGB:** `rgb(132, 91, 223)`
- **Uso:** Cor principal da marca, botões, links e elementos de destaque
- **Aplicações:**
  - Botões de ação (Cadastrar, Entrar, Pesquisar)
  - Links de navegação
  - Focus states de inputs
  - Preços destacados
  - Hover states

### Roxo Escuro (Hover)
- **Hex:** `#6b46c1`
- **RGB:** `rgb(107, 70, 193)`
- **Uso:** Estado hover dos botões e links principais
- **Aplicações:**
  - Hover de botões roxos
  - Hover de links principais

---

## 🔵 Cores Secundárias

### Azul (Pesquisa)
- **Hex:** `#3b82f6` (blue-700)
- **RGB:** `rgb(59, 130, 246)`
- **Uso:** Botão de pesquisa
- **Aplicações:**
  - Botão "Pesquisar" no componente InputPesquisa

### Azul Escuro (Hover Pesquisa)
- **Hex:** `#1d4ed8` (blue-800)
- **RGB:** `rgb(29, 78, 216)`
- **Uso:** Hover do botão de pesquisa

### Azul Claro (Focus Pesquisa)
- **Hex:** `#93c5fd` (blue-300)
- **RGB:** `rgb(147, 197, 253)`
- **Uso:** Focus ring do input de pesquisa

---

## 🟢 Cores de Destaque

### Ciano/Turquesa
- **Hex:** `#5ce1e6`
- **RGB:** `rgb(92, 225, 230)`
- **Uso:** Decoração de texto na página inicial
- **Aplicações:**
  - Underline decorativo em "Produtos em oferta"



## ⚫ Cores Neutras (Gray Scale)

### Cinza Escuro (Textos)
- **Hex:** `#111827` (gray-900)
- **RGB:** `rgb(17, 24, 39)`
- **Uso:** Textos principais em modo claro
- **Aplicações:**
  - Títulos principais
  - Textos de conteúdo

### Cinza Médio (Textos Secundários)
- **Hex:** `#374151` (gray-700)
- **RGB:** `rgb(55, 65, 81)`
- **Uso:** Textos secundários
- **Aplicações:**
  - Descrições de produtos
  - Informações complementares

### Cinza Claro (Placeholders)
- **Hex:** `#6b7280` (gray-500)
- **RGB:** `rgb(107, 114, 128)`
- **Uso:** Textos de placeholder e ícones
- **Aplicações:**
  - Placeholders de inputs
  - Ícones secundários

### Cinza Muito Claro (Bordas)
- **Hex:** `#d1d5db` (gray-300)
- **RGB:** `rgb(209, 213, 219)`
- **Uso:** Bordas de elementos
- **Aplicações:**
  - Bordas de inputs
  - Bordas de cards

### Cinza Super Claro (Backgrounds)
- **Hex:** `#f9fafb` (gray-50)
- **RGB:** `rgb(249, 250, 251)`
- **Uso:** Backgrounds de inputs e seções
- **Aplicações:**
  - Background de inputs
  - Background de seções

### Cinza Médio Escuro (Header)
- **Hex:** `#374151` (gray-700)
- **RGB:** `rgb(55, 65, 81)`
- **Uso:** Background do header
- **Aplicações:**
  - Background da navegação principal

---

## ⚪ Cores de Fundo

### Branco
- **Hex:** `#ffffff`
- **RGB:** `rgb(255, 255, 255)`
- **Uso:** Background principal
- **Aplicações:**
  - Background de cards
  - Background de formulários
  - Background geral

### Gradiente Cinza
- **Classes:** `from-gray-100 to-gray-300`
- **Uso:** Background de páginas de detalhes
- **Aplicações:**
  - Página de detalhes do produto

---

## 🌙 Cores do Modo Escuro

### Fundo Escuro
- **Hex:** `#111827` (gray-900)
- **RGB:** `rgb(17, 24, 39)`
- **Uso:** Background principal no modo escuro

### Fundo de Cards Escuro
- **Hex:** `#1f2937` (gray-800)
- **RGB:** `rgb(31, 41, 55)`
- **Uso:** Background de cards no modo escuro

### Fundo de Inputs Escuro
- **Hex:** `#374151` (gray-700)
- **RGB:** `rgb(55, 65, 81)`
- **Uso:** Background de inputs no modo escuro

### Texto Branco
- **Hex:** `#ffffff`
- **RGB:** `rgb(255, 255, 255)`
- **Uso:** Textos principais no modo escuro

### Texto Cinza Claro
- **Hex:** `#d1d5db` (gray-300)
- **RGB:** `rgb(209, 213, 219)`
- **Uso:** Textos secundários no modo escuro

---

## 🎯 Uso por Componente

### Header
- Background: `gray-700` / `gray-900` (dark)
- Texto: `white`
- Links hover: `#845bdf`
- Botão "Meus Comentários": `#845bdf` / `#6b46c1` (hover)

### Formulários (Login/Cadastro)
- Background: `gray-50` / `gray-900` (dark)
- Inputs: `gray-50` / `gray-700` (dark)
- Bordas: `gray-300` / `gray-600` (dark)
- Focus: `#845bdf`
- Botões: `#845bdf` / `#6b46c1` (hover)

### Cards de Produtos
- Background: `white` / `gray-800` (dark)
- Bordas: `gray-200` / `gray-700` (dark)
- Títulos: `gray-900` / `white` (dark)
- Texto: `gray-700` / `gray-400` (dark)

### Página Inicial
- Título principal: `gray-900` / `white` (dark)
- Decoração: `#5ce1e6`

### Página de Detalhes
- Background: Gradiente `gray-100` → `gray-300`
- Preço destacado: `#845bdf`

### Pesquisa
- Botão principal: `blue-700` / `blue-600` (dark)
- Botão secundário: `#845bdf` / `#6b46c1` (hover)

---

## 📝 Notas de Design

1. **Consistência:** O projeto mantém uma paleta consistente com roxo como cor principal
2. **Acessibilidade:** Todas as cores têm contraste adequado para leitura
3. **Modo Escuro:** Implementação completa com cores equivalentes
4. **Estados Interativos:** Hover, focus e active states bem definidos
5. **Hierarquia Visual:** Uso de diferentes tons de cinza para criar hierarquia

---

## 🔧 Implementação

As cores são implementadas principalmente através de:
- Classes Tailwind CSS
- Cores customizadas com notação `[#hex]`
- Sistema de cores responsivo (light/dark mode)
- Gradientes para backgrounds especiais 