---
Created: 2025-12-04
Type: Zettel
aliases:
References:
Links:
tags:
  - MATH31AH
---
> Recall: A matrix $A\in M_{n}(\mathbb{R})$ is said to have a simple spectrum if all the [[Eigenvalues and eigenvectors|eigenvalues]] of A are different (i.e have algebraic multiplicity of 1)

> Lemma (Wiggle Theorem):
> Let $A\in M_{n}(\mathbb{R})$ be a real symmetric matrix. $A$ can be approximated by symmetric matrices with simple spectrum.

> Recall: 
> 1) A matrix $S\in M_{n}(\mathbb{R})$ is called orthogonal if its column vectors forms an orthonormal basis of $\mathbb{R}^n$  Equivalently, $S^TS=Id_{n}$
> 2) $\det (S) = \{ 1,-1 \}$ and orthogonal [[matrices]] form a closes set 
>    "Limit of any sequence of orthogonal matrices is again an orthogonal matrix"
>    $\det Col_{n}(\mathbb{R})\to \mathbb{R}, O(n,\mathbb{R})=\det ^{-1}\{ 1,-1 \}$

> Approximation/Limit
> $\{ A_{1},A_{2},\dots, \} = \{ A_{k}, k \in \mathbb{N} \}$
> $A_{k}\in M_{n}(\mathbb{R})$
> $A_{k}=(a^k_{ij})_{n},a^k_{ij} \in \mathbb{R}$
> $\lim_{ k \to \infty }a^k_{ij}=a_{ij}$
> Summarizing, 
> $A_{k}\to A$ as $k\to \infty$
> $a^k_{ij}\to a_{ij}$ as $k\to \infty$
> Example:
> Suppose $A_{k}=\begin{bmatrix}1+\frac{1}{k} & 0 \\ 0 & 1-\frac{1}{k}\end{bmatrix}, vk\in \mathbb{N}$
> Taking the limit
> $\lim_{ k \to \infty }a^k_{11}=\lim_{ k \to \infty }1+\frac{1}{k}=1$
> $A(t)=\begin{bmatrix}1+t & 0 \\ 0 & 1-t\end{bmatrix}, t\in[0,1]$
> $\lim_{ t \to 1 }A(t)=\begin{bmatrix}2 & 0 \\ 0 & 0\end{bmatrix}$ 
- The limit of any matrix is the limit of its individual entries
> $A\in M_{n}(\mathbb{R})$ and $A^T=A$
> We'll show there exists $A_{k}\in M_{n}(\mathbb{R})$ & $A_{k}^T=A_{k}$ and that $A_{k}$s have simple spectrum
> In other words, we are showing that $A_{k}$ is symmetric for all $k$.

> Proof: Wiggle Theorem
> We'll use induction on $n$. 
> Base case:
> if $n=1$, there is nothing to prove. 
> Inductive hypothesis:
> Suppose that this is true for any symmetric matrix in $M_{n}(\mathbb{R})$
> That is, for any $A\in M_{n}(\mathbb{R})$ with $A^T=A$.
> There exists $(A_{k})_{k\in \mathbb{N}}$ such that $A_{k}\to A$.
> $A_{k}$ have simple spectrum and $A^T_{k}=A_{k}$.
> We need to show this for all symmetric $A\in M_{n+1}(\mathbb{R})$
> Suppose $v_{1}$ is an eigenvector of $A$ associated to an eigenvalue $\lambda$.
> Say $\lVert v_{1} \rVert=1$.
> Consider matrix $A(t)=A+tvv^T$, say $t\in[0,1]$
> $v=\begin{bmatrix}v_{1} \\ \dots \\ v_{n+1}\end{bmatrix}\begin{bmatrix}v & \dots & v_{n+1}\end{bmatrix}$
> Claim: we will show that this matrix has $\lambda+t$ as an eigenvalue
> $A(t)v=(A+tvv^T)v$
> $=Av+tvv^Tv$, and $v^Tv=1$
> $=Av+tv$
> $=\lambda v+tv=(\lambda+t)v$
> Therefore, we show that $\lambda+t$ is an eigenvalue of $A(t)$
> Say $v^\perp=\{ v \}^\perp$ and set $\{ w_{1},\dots w_{n} \}$ to be an orthonormal basis of $v^\perp$
> Define $S(t)=\begin{bmatrix}v & w_{1} & \dots & w_{n}\end{bmatrix}$
> Then, $(S(t))^{-1}A(t)S(t)$
> $(S(t))^{-1}A(t)\begin{bmatrix} v & w_{1} & \dots & w_{n}\end{bmatrix}$ 
> Note: $A(t)w_{j} = (A+tvv^T)w_{j}$
> $=Aw_{j}+tvvt^Tw_{j}$
> $=Aw_{j}$
> Continuing the proof:
> $=(S(t))^{-1}\begin{bmatrix}(\lambda+t)v & Aw_{1} & \dots & Aw_{n}\end{bmatrix}$
> $=\begin{bmatrix}(\lambda+t)S(t)^{-1}v & S(t)^{-1}Aw_{1} & \dots & S(t)^{-1}Aw_{n}\end{bmatrix}$
> $=\begin{bmatrix}(\lambda+t)e_{1} & S(t)^{-1}Aw_{1} & \dots & S(t)^{-1}Aw_{n}\end{bmatrix}$
> $=\begin{bmatrix}(\lambda+t) & 0 & \dots & 0 \\ 0  \\ \dots  \\  0 & \dots  &D\end{bmatrix} = (S(t))^{-1}A(t)S(t)$
> Note that $S(t)$ is an orthogonal matrix.
> $Q^{-1}AQ$, where $A$  is symmetric and $Q$ is orthogonal
> $\implies(Q^{-1}AQ)^T=Q^TA^T(Q^{-1})^T$
> $=Q^{-1}A^TQ=Q^{-1}AQ$
> Back to the proof:
> $S(t)^{-1}A(t)S(t)$ is symmetric.
> Note that $D_{n\times n}$ is independent of $t$
> By the inductive hypothesis, there exists $D(t)$ of symmetric matrices with simple spectrum such that $D(0)=D$
> Define $\tilde{B}(t)=\begin{bmatrix}\lambda+t & 0 \\ 0 & D(t)\end{bmatrix}$ 
> Define $\tilde{A}(t)=S(t)\tilde{B}(t)(S(t))^{-1}$
> Claim: $\tilde{A}(0)=A$
> Note, since $\tilde{B}(t)$ has simple spectrum, so does $\tilde{A}(t)$, which it is similar to. 
> $\tilde{A}(0)=S(0)\tilde{B}(0)(S(0))^{-1}$
> $=S(0)\begin{bmatrix}\lambda & 0 \\ 0 & D(0)\end{bmatrix}(S(0))^{-1}$
> $S(0)\begin{vmatrix}\lambda & 0 \\ 0 & D\end{vmatrix}(S(0))^{-1}$
> $=S(0)B(0)(S(0))^{-1}$
> $=A(0)=A$
- What this proof is trying to do is to get a matrix that might not have simple spectrum to have simple spectrum
	- We do this by "wiggle" the matrix in a way so that the multiplicity of the eigenvalues goes back to 1
	- This is kinda of moving a polynomial such as $x^{2}=0$ to $x^{2}-0.000001=0$ to change it from having 1 zero to two.

> Spectral theorem:
> Every real symmetric matrix is orthogonally diagonalizable  
> $A$, there exists an invertible $S\in M_{n}(\mathbb{R})$ such that 
> $S^{-1}AS=D=\begin{bmatrix}\lambda_{1} & 0 \\ 0 & \lambda_{n}\end{bmatrix}$
> Proof: We use induction on $n$.
> Base case and inductive hypothesis:
> Given any $A\in M_{n}(\mathbb{R})$, there exists an orthogonal $S\in M_{n}(\mathbb{R})$ diagonalizing $A$.
> $A\in M_{n+1}(\mathbb{R})$, choose an eigenvalue $\lambda$, unit eigenvector $v$ and define
> We restarted the proof:

> Proof: Let $A\in M_{n}(\mathbb{R})$, eigenvalue $\lambda$, and eigenvector $v$. 
> $(S(t))^{-1}\tilde{A}(t)(S(t))=\begin{bmatrix}\lambda+t & 0 \\ 0 & D(t)\end{bmatrix}$
> Since $D(t)$ has 1) a simple spectrum, and 2) is symmetric, we have an orthogonal [[eigenbasis]] for $D(t)$, and say $\{ \hat{w}_{1}(t),\dots,\hat{w}_{n}(t) \}$ is an orthonormal eigenbasis for $D(t)$.
> $\begin{bmatrix}\lambda+t & 0 \\ 0 & D(t)\end{bmatrix}$
> $\hat{S}(t)=\{ v, \hat{w}_{1}(t),\dots,\hat{w}_{n}(t) \}$
> $(\hat{S}(t))^{-1}\tilde{B}(t)\hat{S}(t)$
> $=\begin{bmatrix}\lambda+t &  &  &  \\  & \lambda_{2}(t) \\  &  &  & \lambda_{n}(t)\end{bmatrix}$
> $\implies(\hat{S}(t))(S(t))^{-1}\tilde{A}(t)(S(t))(\hat{S}(t))^{-1}$

> Proof: $A(t) \to A=A(0)$ as $t\to 0$
> $A(t)$ has simple spectrum and is symmetric
> This implies there exists an orthogonal and thus an orthonormal eigenbasis, that $S(t)$ are orthogonal.
> $(S(t))^{-1}A(t)(S(t))$ is diagonal 
> as $t\to 0$, $(S(0))^{-1}A(S(0))$ is diagonal
> 