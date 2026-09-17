---
title: Teste
publishDate: 2026-09-17
description: Aqui vai um resumo
tags:
  - Analytics
  - Ciência de Dados
featured: true
author: Erich Muller Dutra
---
# 2 Preliminares


> [!warning] Definição
> Seja $(X, \tau)$ um espaço topológico Hausdorff e $\mu$ uma medida de Borel em $X$. Definimos o ==suporte de $\mu$== como sendo
> $$\text{supp}(\mu) = \mathbb{C} \ \setminus \ \bigcup \ \{U \subset \mathbb{C}: U \text{ é aberto e } \mu(U) = 0\}$$

> [!NOTE] Convenções
>  Aqui, $\mu$ é uma medida de probabilidade de Borel no plano de parâmetros $\mathbb{C}$. ( $\mu: \mathcal{B}_{\mathbb{C}} \to [0, 1]$ ) com suporte compacto. 
>
>Definimos a medida de probabilidade $\mathbb{P}_\mu$ como sendo a o produto infinito unilateral de $\mu$, que tem suporte em $\Omega_\mu = \prod_{n=1}^{\infty} \text{supp} \mu$ com a $\sigma$-algebra de borel $\mathcal{B}_\mu$.

> Uma distribuição $\mu$ com suporte ilimitado não possui atratores planares (planar $=^?$ finito). Por isso, pede-se $\text{supp}(\mu)$ compacto.

O exemplo mais simples e importante é a medida normalizada de Lebesgue em $\overline{B}(c, r) = \{c' \in \mathbb{C}: |c' - c| \leq r \}$ que representa a distribuição uniforme.

> [!NOTE] Lema (2.2)
> Denote por $\sigma$ o *shift* à esquerda, i. e., $\sigma \omega = (c_2, c_3, \dots)$ se $\omega = (c_1, c_2, \dots)$. Então, $\sigma: \Omega_\mu \to \Omega_\mu$ é uma transformação ergódica que que preserva a medida com relação a $\mathbb{P}_\mu$

Uma transformação é dita ergódica se não pode ser reduzida a duas componentes dinâmicas independemntes, ou seja,
$$\sigma^{-1}(A) = A \ \implies \ \mathbb{P}_\mu(A) = 0 \text{ ou } 1$$

Dizer que ela preserva medida é dizer que
$$\mathbb{P}_\mu(\sigma^{-1}(A)) = \mathbb{P}_\mu(A)$$

> [!info] Definição (2.3)
> Para cada $n \in \mathbb{N}$ e uma sequência infinita de parâmetros $\omega = (c_n)_{n=1}^\infty \in \mathbb{C}^\mathbb{N}$, denotamos $f_\omega^{(n)} := f_{c_n} \circ \cdots \circ f_{c_2} \circ f_{c_1}$.

> [!warning] Definição
> Seja $D \subset \mathbb{C}$ aberto. Uma família $\mathcal{F}$ de funções holomorfas em $D$ é chamada ==normal== se toda sequência de funções $\{f_n\} \subset \mathcal{F}$ possui subsequência $\{f_{n_k}\}$ que converge uniformemente em subconjuntos compactos de $D$
> > O limite pode ser uma função holomorfa ou a constante $\infty$.

> [!info] Definição (2.4)
> Para cada $\omega = (c_n)_{n=1}^\infty \in \mathbb{C}^\mathbb{N}$, definimos o conjunto de Julia não-autônomo ou conjunto de Julia randômico de $\omega$ por
> $$J_\omega = \left\{ z \in \mathbb{C}: \left\{f_\omega^{(n)}\right\}_{n=1}^\infty \ \ \text{ não é normal em nenhuma vizinhança de }z \right\}$$

Em geral, usa-se os teoremas de Montel para caracterizar uma família de funções.

> [!warning] Teorema de Montel (Clássico)
> Uma família $\mathcal{F}$ de funções holomorfas em $D \subset \mathbb{C}$ é normal $\iff$ ela for localmente limitada.
> > Isto é, para todo $x \in D$, existe $V_x$ - uma vizinhança de $x$ - onde todos os valores de todas as funções da família estão presos numa região finita.

> [!warning] Teorema de Montel (Forte - *Fundamental Normality Test*)
> Seja $\mathcal{F}$ uma família de funções holomorfas em $D \subset \mathbb{C}$. Se existem $a \neq b$ em $\hat{\mathbb{C}}$ tal que $\{a, b\} \not\subset \mathrm{Im}(f) \ \forall \ f \in \mathcal{F}$, então $\mathcal{F}$ é normal.
> 
> > Isto é, se a família inteira omite ao menos dois pontos, ela é normal.

> [!info] Definição (2.5)
> Para cada $\omega = (c_n)_{n=1}^\infty \in \mathbb{C}^\mathbb{N}$, definimos o a bacia não-autônoma  no infinito de $\omega$ por 
> $$A_\omega = \{z \in \hat{\mathbb{C}}: f_\omega^{(n)} \to \infty \text{ as } n \to \infty\}$$ 
> ==Não seria $f_\omega^{(n)}(z) \to \infty$?==
> 
> Definimos o conjunto de Julia cheio de $\omega$ por $K_\omega = \hat{\mathbb{C}} \setminus A_\omega$.

Aqui, $\hat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$, endossada com a métrica esférica $d$. Uma função polinomial $f: \mathbb{C} \to \mathbb{C}$ pode ser analiticamente estendida para  $f: \hat{\mathbb{C}} \to \hat{\mathbb{C}}$ colocando $f(\infty) = \infty$.

A seguir, algumas propriedades elementares de conjuntos de Julia não autônomos, bacias no infinito e conjunto de Julia cheio. Para $R>0$, denotamos por $D_{R}$ o disco aberto $D_{R} = \{z \in \mathbb{C}: |z| < R\}$.


> [!NOTE] Lema (2.6)
> Seja $\mu$ uma medida de probabilidade de Borel em $\mathbb{C}$ com suporte compacto. Então, as afirmações a seguir valem.
> 
> (1) Existe $R>0$ de modo que $f_{\omega}^{(n)}(\hat{\mathbb{C}}\setminus D_{R}) \subset \hat{\mathbb{C}}\setminus D_{2R}$ para todo $n \in \mathbb{N}$ e $\omega \in \Omega_{\mu}$.
> 
> (2) Tome $R>0$ conforme acima. A bacia não autônoma no infinito é a união de uma sequência crescente de conjuntos abertos;
> $$A_{\omega} = \bigcup_{n=1}^{\infty}(f_{\omega}^{(n)})^{-1}(\hat{\mathbb{C}}\setminus \overline{D_{R}})$$ para todo $\omega \in \Omega_{\mu}$. Assim, $A_{\omega}$ é uma vizinhança de $\infty$. Por outro lado, $K_{\omega} = \bigcap_{n=1}^\infty(f_{\omega}^{(n)})^{-1}(\overline{D_{R}})$ é um subconjunto compacto não vazio para todo $\omega \in \Omega_{\mu}$.
> 
> (3) Para $\omega \in \Omega_{\mu}$, temos que $\partial A_{\omega} = J_{\omega} = \partial K_{\omega}$.
> 
> (4) Para $\omega \in \Omega_{\mu}$, temos que $A_{\omega} = f_{c_{1}}^{-1}(A_{\sigma\omega})$, $K_{\omega} = f_{c_{1}}^{-1}(K_{\sigma\omega})$ e $J_{\omega} = f_{c_{1}}^{-1}(J_{\sigma\omega})$

**Considerações:**

Possível ideia de demonstração de 2:

- A sequência $\{(f_{\omega}^{(n)})^{-1}(\hat{\mathbb{C}}\setminus \overline{D_{R}})\}_{n=1}^\infty$ é crescente: --
- Os conjuntos $(f_{\omega}^{(n)})^{-1}(\hat{\mathbb{C}}\setminus \overline{D_{R}})$ são abertos pois $\overline{D_{R}}$ é fechado e $f$ é contínua. 
- $A_{\omega}$ é vizinhança do infinito pois $\infty \in \hat{\mathbb{C}}\setminus\overline{D_{R}}$ e $f(\infty) = \infty$
- $K_{\omega} = \bigcap_{n=1}^\infty(f_{\omega}^{(n)})^{-1}(\overline{D_{R}})$: --
- $K_{\omega} = \hat{\mathbb{C}}\setminus A_{\omega}$, portanto $K_{\omega}$ é fechado e como $\infty \in A_{\omega}$, $K_{\omega}$ é limitado e portanto, compacto. É não vazio pois $A_{\omega}$ é não vazio. 

3 diz que o conjunto de Julia é o bordo da bacia no infinito e o conjunto de Julia cheio.

4 dá uma noção de invariância por shifts à esquerda. Preciso ver melhor.
