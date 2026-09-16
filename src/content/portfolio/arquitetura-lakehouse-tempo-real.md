---
title: "Arquitetura Lakehouse em Tempo Real com Apache Iceberg e dbt"
description: "Construção de uma plataforma de dados moderna com streaming ingestion, governança unificada e camadas Bronze-Silver-Gold de baixíssima latência."
publishDate: 2026-02-18
heroImage: "/Quarto/images/portfolio/lakehouse-architecture.png"
tags: ["Engenharia de Dados", "Apache Iceberg", "dbt", "SQL", "Big Data"]
featured: true
author: "Erich Müller Dutra"
---

A separação tradicional entre Data Warehouses proprietários e Data Lakes baseados em arquivos brutos gera duplicação crônica de armazenamento, inconsistência semântica e atrasos no consumo analítico.

Para superar essas barreiras, arquitetamos uma infraestrutura de **Modern Data Stack** orientada ao formato aberto **Apache Iceberg**, viabilizando transações ACID sobre armazenamento distribuído e consultas analíticas de alto desempenho.

## 1. Topologia da Arquitetura Medallion

A solução opera sob a convenção de camadas progressivas de qualidade:

1. **Bronze (Raw Ingestion):** Eventos capturados via Kafka e persistidos em formato Parquet/Iceberg particionados por hora.
2. **Silver (Conformed & Cleansed):** Aplicação de regras de integridade, deduplicação idempotente e mascaramento de PII.
3. **Gold (Business Aggregates):** Modelos dimensionais (Star Schema) prontos para BI e consumo analítico via Trino / DuckDB.

> [!NOTE] Metadados e Isolamento de Snapshot
> O Iceberg mantém uma árvore hierárquica de metadados (`vX.metadata.json` $\rightarrow$ Manifest List $\rightarrow$ Manifest Files). Isso garante leituras concorrentes consistentes (*Snapshot Isolation*) e viagem no tempo (*Time Travel*) sem travamento de tabelas.

## 2. Modelo Matemático de Compactação e Custo

O custo computacional de manutenção da camada Silver é governado pelo equilíbrio entre o número de arquivos pequenos (*small files problem*) e a frequência de reescrita de manifests:

$$
T_{\text{compact}} = \alpha \cdot \frac{N_{\text{files}}}{S_{\text{avg}}} + \beta \cdot \log_2(M_{\text{snapshots}})
$$

Onde $S_{\text{avg}}$ representa o tamanho médio dos arquivos em megabytes e $M_{\text{snapshots}}$ é a profundidade de histórico retida para auditoria.

## 3. Transformações Modulares com dbt Core

As transformações na camada Silver foram implementadas usando modelos incrementais dbt com merge condicional:

```sql
{{ config(
    materialized = 'incremental',
    unique_key = 'transaction_id',
    incremental_strategy = 'merge',
    file_format = 'iceberg'
) }}

WITH source_events AS (
    SELECT
        event_id AS transaction_id,
        user_id,
        amount_cents / 100.0 AS amount_brl,
        status,
        event_timestamp,
        ROW_NUMBER() OVER (
            PARTITION BY event_id
            ORDER BY event_timestamp DESC
        ) AS dedup_rank
    FROM {{ source('bronze', 'raw_financial_transactions') }}
    {% if is_incremental() %}
    WHERE event_timestamp >= DATEADD('hour', -3, (SELECT MAX(event_timestamp) FROM {{ this }}))
    {% endif %}
)

SELECT
    transaction_id,
    user_id,
    amount_brl,
    status,
    event_timestamp
FROM source_events
WHERE dedup_rank = 1;
```

> [!TIP] Otimização de Particionamento Oculto (Hidden Partitioning)
> O Apache Iceberg elimina o erro humano em consultas analíticas porque os usuários não precisam conhecer o esquema de partições físicas. Consultas com filtro `WHERE event_timestamp >= '2026-02-01'` aplicam automaticamente poda de partições sem exigir filtros sintéticos em colunas de partição.

## 4. Eficiência Operacional Atingida

- **Latência de ponta a ponta:** Reduzida de 24 horas (batch noturno) para **sub-10 minutos**.
- **Redução de custos de cloud storage/query:** **-54%** com a migração de queries proprietárias para formato Iceberg federado.
- **Confiabilidade de dados:** **99.98%** de aderência nos testes de integridade automatizados do dbt.

