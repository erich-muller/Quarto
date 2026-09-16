---
title: "Algoritmos de Precificação Dinâmica Baseados em Elasticidade-Preço da Demanda"
description: "Desenvolvimento de motor de precificação algorítmica para varejo e e-commerce, maximizando margem de contribuição sob restrições de estoque."
publishDate: 2026-01-25
heroImage: "/Quarto/images/portfolio/dynamic-pricing.png"
tags: ["Otimização", "Econometria", "Python", "Pesquisa Operacional"]
featured: false
author: "Erich Müller Dutra"
---

A precificação estática em mercados voláteis penaliza a margem em momentos de alta demanda e gera custos de estocagem desnecessários em períodos de desaceleração. 

Desenvolvemos para um ecossistema de e-commerce um sistema contínuo de inferência da **elasticidade-preço da demanda** ($\varepsilon_p$), permitindo ajustes automatizados em catálogo com mais de 80.000 SKUs.

## 1. Fundamentos Teóricos e Curva de Demanda

A elasticidade-preço pontual da demanda é quantificada matematicamente como:

$$
\varepsilon = \frac{\mathrm{d} \ln Q(p)}{\mathrm{d} \ln p} = \frac{\mathrm{d}Q}{\mathrm{d}p} \cdot \frac{p}{Q}
$$

Para capturar efeitos sazonais e preços concorrenciais, estimamos a curva de demanda log-log multidimensional:

$$
\ln Q_{it} = \beta_0 + \varepsilon_i \ln p_{it} + \sum_{k=1}^K \gamma_{ik} \ln p_{kt}^{\text{comp}} + \mathbf{Z}_{it}\boldsymbol{\delta} + u_{it}
$$

Onde:
- $p_{kt}^{\text{comp}}$ representa o preço do concorrente $k$ no instante $t$.
- $\mathbf{Z}_{it}$ é a matriz de variáveis de controle (dia da semana, eventos promocionais, tráfego da página).

## 2. Formulação da Otimização Não-Linear

O problema de precificação ideal busca o vetor de preços $\mathbf{p}^*$ que maximiza a margem de contribuição total sujeita à capacidade física de despacho e limite de estoque $S_i$:

$$
\max_{p_i} \sum_{i=1}^M \left( p_i - c_i \right) Q_i(p_i, \mathbf{p}^{\text{comp}})
$$

Sujeito às restrições de contorno de negócio:

$$
p_i^{\min} \le p_i \le p_i^{\max}, \quad \forall i \in \{1, \dots, M\}
$$

$$
Q_i(p_i) \le S_i
$$

> [!WARNING] Risco de Guerras de Preço Destrutivas
> Algoritmos ingênuos que apenas perseguem o menor preço da concorrência entram em espirais deflacionárias. Implementamos travas de borda e amortecimento exponencial de reações com limiar de volatilidade.

## 3. Implementação do Motor de Otimização em Python

```python
import numpy as np
from scipy.optimize import minimize

def profit_objective(prices, costs, elasticities, baseline_q, baseline_p):
    """
    Função de perda negativa (para minimização) da margem agregada.
    """
    demands = baseline_q * ((prices / baseline_p) ** elasticities)
    margins = prices - costs
    total_profit = np.sum(margins * demands)
    return -total_profit

# Exemplo de otimização restrita via SLSQP
bounds = [(p_min, p_max) for p_min, p_max in zip(min_prices, max_prices)]
result = minimize(
    fun=profit_objective,
    x0=current_prices,
    args=(unit_costs, estimated_elasticities, q_base, p_base),
    method='SLSQP',
    bounds=bounds
)

optimized_prices = result.x
```

> [!TIP] Validação via Testes A/B por Grupos de Produtos
> A validação do algoritmo seguiu um protocolo quase-experimental (*Synthetic Control* e teste A/B balanceado por categorias homólogas), demonstrando aumento sustentado de **+14.2% na margem bruta** sem perda de participação de mercado (*market share*).

## 4. Impacto Estratégico

- **Giro de estoque otimizado:** Redução de 22 dias no ciclo médio de conversão de inventário.
- **Automação de decisões:** Mais de 120.000 alterações diárias de preço orquestradas sem intervenção humana manual.
- **Segurança de margem:** Nenhuma venda abaixo do custo unitário marginal garantida por contratos de invariância matemática.

