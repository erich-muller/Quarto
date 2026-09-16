---
title: "Modelagem Preditiva de Churn B2B com XGBoost e Explainable AI (SHAP)"
description: "Metodologia quantitativa para identificação precoce de cancelamento em contratos corporativos SaaS, combinando Gradient Boosting e decomposição Shapley."
publishDate: 2026-03-10
heroImage: "/Quarto/images/portfolio/churn-prediction.png"
tags: ["Machine Learning", "XGBoost", "Python", "Explainable AI"]
featured: true
author: "Erich Müller Dutra"
---

A retenção de contas corporativas em modelos de negócio B2B (*Software as a Service*) exige uma abordagem proativa e orientada a dados. Em cenários de alto valor por contrato (*High-ACV*), a perda de um único cliente pode impactar sensivelmente a receita recorrente líquida (NRR).

Neste estudo de caso, detalhamos o ciclo analítico completo para predição de *churn*, desde a engenharia de atributos comportamentais até a explicabilidade individual de risco.

> [!NOTE] Formulação Estatística do Problema
> O cancelamento é modelado como um problema de classificação supervisionada binária, onde a variável-alvo $Y_i \in \{0, 1\}$ indica se o cliente $i$ rescindirá o contrato nos próximos 60 dias, condicionado ao vetor de histórico $X_i \in \mathbb{R}^d$.

## 1. Formulação Matemática da Função de Perda

Utilizamos uma formulação baseada em árvores aditivas regularizadas via XGBoost. A função objetivo no passo de iteração $t$ é dada por:

$$
\mathcal{L}^{(t)} = \sum_{i=1}^n l\left( y_i, \hat{y}_i^{(t-1)} + f_t(x_i) \right) + \Omega(f_t)
$$

Onde o termo de regularização $\Omega(f_t)$ penaliza a complexidade do modelo para evitar sobreajuste em subconjuntos com desbalanceamento de classes:

$$
\Omega(f) = \gamma T + \frac{1}{2}\lambda \sum_{j=1}^T w_j^2
$$

Sendo $T$ o número total de folhas na árvore e $w_j$ o peso atribuído à folha $j$. A probabilidade calibrada de cancelamento é estimada através da função logística:

$$
P(Y_i = 1 \mid X_i) = \sigma(z_i) = \frac{1}{1 + e^{-z_i}}
$$

## 2. Implementação do Pipeline em Python

O pipeline de dados foi construído com separação temporal estrita para evitar vazamento de dados (*data leakage*):

```python
import numpy as np
import pandas as pd
import xgboost as xgb
import shap
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import roc_auc_score, precision_recall_curve

# Configuração dos hiperparâmetros com regularização L2 e subsampling
params = {
    'objective': 'binary:logistic',
    'eval_metric': 'aucpr',
    'max_depth': 5,
    'learning_rate': 0.03,
    'subsample': 0.85,
    'colsample_bytree': 0.8,
    'reg_lambda': 2.5,
    'random_state': 42
}

# Treinamento com parada antecipada (Early Stopping)
dtrain = xgb.DMatrix(X_train, label=y_train)
dval = xgb.DMatrix(X_val, label=y_val)

model = xgb.train(
    params,
    dtrain,
    num_boost_round=1000,
    evals=[(dtrain, 'train'), (dval, 'val')],
    early_stopping_rounds=40,
    verbose_eval=False
)

# Cálculo de valores Shapley para explicabilidade
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_val)
```

## 3. Interpretabilidade com Valores de Shapley

Em consultoria executiva, algoritmos de "caixa-preta" raramente recebem adesão das equipes de Customer Success. A decomposição de Shapley permite atribuir a contribuição marginal de cada atributo para a probabilidade final:

$$
\phi_i(v) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(|N| - |S| - 1)!}{|N|!} \left( v(S \cup \{i\}) - v(S) \right)
$$

> [!TIP] Aplicação em CS e Ação Preventiva
> Quando a probabilidade ultrapassa o limiar $\tau = 0.42$, o sistema despacha automaticamente um gatilho de priorização no CRM com os 3 principais fatores de risco (ex: queda em sessões ativas, tickets críticos pendentes e rotatividade de *sponsor* interno).

## 4. Resultados e Métricas de Impacto

A comparação com a heurística anterior baseada em regras estáticas demonstrou ganhos substanciais:

| Métrica | Modelo Legado (Heurístico) | Modelo Preditivo Quarto | Variação (%) |
| :--- | :--- | :--- | :--- |
| **AUC-ROC** | 0.63 | **0.89** | +41.2% |
| **Precisão no Top Decil** | 22.4% | **68.7%** | +206.7% |
| **Recall Global** | 41.0% | **76.5%** | +86.5% |
| **Redução de Churn Anual** | - | **18.4%** | Impacto Direto |

> [!IMPORTANT] Conclusão Técnica
> A combinação de engenharia de atributos com janelas móveis de 30/60/90 dias e calibração probabilística permitiu salvar mais de R$ 3,2M em ARR durante os primeiros 12 meses de implantação contínua.

