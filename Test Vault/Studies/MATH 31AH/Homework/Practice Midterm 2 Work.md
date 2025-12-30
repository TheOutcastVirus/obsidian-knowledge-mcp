---
Created: 2025-11-17
Type: Zettel
aliases:
References:
Links:
tags:
  - MATH31AH
---
## Problem I
### 1.
The cross product for two vectors $v \times w = \begin{bmatrix}v_{1} \\ v_{2} \\ v_{3}\end{bmatrix}\times \begin{bmatrix}w_{1} \\ w_{2} \\ w_{3}\end{bmatrix}$ is defined as $\det \begin{bmatrix}\hat{i} & \hat{j} & \hat{k} \\ v_{1} & v_{2} & v_{3} \\ w_{1} & w_{2} & w_{3}\end{bmatrix}$. 

## 2.
To prove that $v \times w$ is orthogonal to both $v,w$, we have to show that $v \cdot(v \times w)=0$ and $w \cdot (v \times w)=0$. 

First, we have to compute what $v \times w$. Expanding $\det \begin{bmatrix}\hat{i} & \hat{j} & \hat{k} \\ v_{1} & v_{2} & v_{3} \\ w_{1} & w_{2} & w_{3}\end{bmatrix} = \vec{i} \det \begin{bmatrix}v_{2} & v_{3} \\ w_{2} & w_{3}\end{bmatrix} - \hat{j}\det \begin{bmatrix}v_{1} & v_{3} \\ w_{1} & w_{3}\end{bmatrix} +\hat{k}\det \begin{bmatrix}v_{1} & v_{2} \\ w_{1} & w_{2}\end{bmatrix}$. We get that $v\times w = \hat{i}(v_{2}w_{3}-v_{3}w_{2})-\hat{j}(v_{1}w_{3}-v_{3}w_{1})+\hat{k}(v_{1}w_{2}-v_{2}w_{1})$
$= \begin{bmatrix}v_{2}w_{3}-v_{3}w_{2} \\ v_{1}w_{3}-v_{3}w_{1} \\ v_{1}w_{2}-v_{2}w_{1}\end{bmatrix}$

We have that $\begin{bmatrix}v_{1} \\ v_{2} \\ v_{3}\end{bmatrix} \cdot\begin{bmatrix}v_{2}w_{3}-v_{3}w_{2} \\ v_{1}w_{3}-v_{3}w_{1} \\ v_{1}w_{2}-v_{2}w_{1}\end{bmatrix}$. Expanding this, we get that $v_{1}(v_{2}w_{3}-v_{3}w_{2})+v_{2}(v_{1}w_{3}-v_{3}w_{1})+v_{3}(v_{1}w_{2}-v_{2}w_{1})$. 
TBD

## 3.
The dot product of two vectors $v,w\in \mathbb{R}^n$ is equal to $v_{1}w_{1}+v_{2}w_{2}+\dots+v_{n}w_{n}$.

## 4. 
On paper.


## 5. 

## 6.
On paper. Messed this up so retry more rigorously if time permits. 

## Problem II
### 1.
For some $A \in M_{n}(\mathbb{R})$, the characteristic polynomial is $\det(A-xI)$. The eigenvalues are the solutions of the characteristic polynomial. 

### 2. 
On paper.

## 3. 
Let $p_{A}(\lambda)=\det(A-\lambda I)$ and $p_{B}(\lambda)=\det(B-\lambda I)$ be the characteristic polynomials of $A$ and $B$. 

If $B=QAQ^{-1}$ with $Q$ being invertible, then for every scalar $\lambda$
$$
B-\lambda I=QAQ^{-1}
-\lambda I = QAQ^{-1}-\lambda QQ^{-1}=Q(A-\lambda I)Q^{-1}
$$
Taking determinants and using $\det(XY)=\det X\det Y$ gives
$$
p_{B}(\lambda)=\det(B-\lambda I)=\det(Q(A-\lambda I)Q^{-1})
$$
$$
=\det (Q) \det(A-\lambda I) \det(Q^{-1})
$$
Since $\det (Q^{-1}) = \det(Q)^{-1}$, the factors $\det(Q)$ and $\det(Q^{-1})$ cancel, so 
$$
p_{B}(\lambda)=\det(A-\lambda I)=p_{A}(\lambda)
$$
For all $\lambda$. Thus, $A$ and $B$ have the same characteristic polynomial, hence the same eigenvalues.  

## 4.
Let $B=QAQ^{-1}$ with $Q$ invertible. Select and eigenpair $(\lambda,v)$ of $B$, so $v \neq 0$ and $Bv=\lambda v$. Put $w:=Q^{-1}v$. Since $Q^{-1}$is invertible and $v\neq 0$, we have $w \neq 0$. 

Compute
$$
QAw=QA(Q^{-1}v)=(QAQ^{-1})v=Bv=\lambda v=\lambda Qw
$$
Because $Q$ is invertible we many left-multiply by $Q^{-1}$ to get 
$$
Aw=\lambda w
$$
Thus $w=Q^{-1}v$ is a nonzero eigenvector of $A$ with eigenvalue $\lambda$. Hence every eigenvalue of $B$ is an eigenvalue of $A$. 

## Problem III
## 1.
For some $S\subset \mathbb{R}^n$, we can define $S^\perp$ as
$$
S^\perp :=\{ v\in \mathbb{R}^n : \left< v,s \right>, s \in S  \}
$$
## 2.
To show that $S^\perp$ is a linear subspace of $\mathbb{R}^n$, we have to show that $\vec{0} \in S^\perp$, and that for any $v,w\in S^\perp$ and $\alpha,\beta \in \mathbb{R}$that $\alpha v+\beta w\in S^\perp$.

Pick $v,w \in S^{\perp}, \alpha,\beta \in \mathbb{R}$. 
Then, $\langle v,s \rangle = 0$ and $\langle w,s \rangle = 0$, for all $s \in S$
 $\implies\alpha \langle v,s \rangle + \beta \langle w,s \rangle = 0$, for all $s \in S$
$\implies \langle \alpha v+\beta w,s \rangle = 0$, for all $s \in S$
$\implies\alpha v +\beta w \in S^{\perp}$. Hence, $S^{\perp}$ is a a linear subspace.

## 3.  
For some vector $v$ to be in $L(S)\cap S^\perp$, this means that $\left< v,v \right> =0$. The only vector whose dot product is zero is the zero vector itself. Therefore, $L(S)\cap S^\perp$. 

## 4. 
The direct sum is a combination of all possible sums of vectors in two sets. 
TBD

## 5. 
Let $S_{1}=\{ v_{1},v_{2},\dots,v_{k} \}$. If the vectors of $S_{1}$ are linear independent then
$$
c_{1}v_{1}+c_{2}v_{2}+\dots+c_{k}v_{k}=\vec{0}
$$
would imply that $c_{1},..,c_{k}$ are all $0$. 

We can take the dot product of both sides with respect to $v_{1}$.
$$
v_{1}\cdot(c_{1}v_{1}+c_{2}v_{2}+\dots+c_{k}v_{k})=v_{1}\cdot \vec{0}
$$
We can distribute the dot product over vector addition as follows:
$$
c_{1}(v_{1}\cdot v_{1})+c_{2}(v_{1}\cdot v_{2})+\dots+c_{k}(v_{1}\cdot v_{k})=0
$$
As all $v\in S_{1}$ are orthogonal to each other, this means that the dot product of $v_{1}$ with every other element of $S_{1}$ is zero.
$$
c_{1}(v_{1}\cdot v_{1})+c_{2}(0)+\dots+c_{k}(0)=\vec{0}
$$
We get that
$$
c_{1}\lVert v_{1} \rVert^{2}=0 
$$
Meaning that $c_{1}=0$. We can repeat this process for any vector $v_{i}$ in the set. This implies that call $c_{i}=0$, meaning that the set $S_{1}$ is linearly independent. 

## 6.


## 7.
An orthonormal set is one whose elements all have magnitude of 1, and whose elements are all orthogonal to each other. 

## 8.
Let  the columns of $A\in M_{n}(\mathbb{R})$ be $v_{1},\dots,v_{n}$. Orthonormal means
$$
v_{i} \cdot v_{j} = \{ 1 : i =j, 0:i \neq j \}
$$
Compute the $(i,j)$-entry of $A^TA$. By the definition of matrix multiplication, 
$$
(A^TA)_{ij}=(\text{row i of }A^T)\cdot(\text{column j of }A)=v_i\cdot v_{j}
$$
Since this is an orthonormal  matrix, this means that the only times that the diagonal entries will have values of 1. All other values will be zero. This means that $A^TA=I$. 

## 9.
As $T$ preserves the dot product, this means that any vectors in an orthogonal subset (meaning that the dot product between any two vectors is zero) will stay orthogonal even after $T$ is applied to them. 

To find the associated matrix of $T$, we have to apply $T$ to all of the basis vectors. Let us start by applying $T$ to some orthogonal basis of $V_{1}$.

This would mean that $T=\begin{bmatrix}T(e_{1}) & \dots & T(e_{k})\end{bmatrix}$. For $T$ to be an orthogonal matrix, any two columns of $T$ have to have a dot product that is zero. Select any two columns of $T$, $i\neq j$. $\left< T(e_{i}), T(e_{j}) \right> = \left< e_{i}, e_{j} \right> =0$. Therefore, $T$ is a orthogonal matrix. 

Using the preservation of the inner product, we get that $\left< T(v), T(v) \right> =\left< \lambda v,\lambda v \right>$. We can factor out $\lambda$. $\lambda^{2}\left< v,v \right> = \left< v,v \right>$. This implies that $\lambda^{2}=1$. 
## 10.
We have to show that $\ker T_{i} = \{ T_{i}(e_{1}),\dots,T_{i}(e_{n}) \}^\perp$. 

The first step is to show that $\ker T_{i} \subset \{ T_{i}(e_{1}),\dots,T_{i}(e_{n}) \}^\perp$. Select some $v \in \ker T_{i}$. This means that $T(v)=\vec{0}$. This means that $\left< T(v),T_{i}(e_{n}) \right> = 0$. Therefore, $\ker T_{i} \subset \{ T_{i}(e_{1}),\dots,T_{i}(e_{n}) \}^\perp$. 

Next we have to show that $\{ T_{i}(e_{1}),\dots,T_{i}(e_{n}) \}^\perp \subset\ker T_{i}$. Select some $w \in\{ T_{i}(e_{1}),\dots,T_{i}(e_{n}) \}^\perp$. We can write any element in the image of $T$ as a linear span of $\{ T_{i}(e_{1}),\dots,T_{i}(e_{n}) \}$. Given the definition of $w$, we know that for any $u\in T_{i}$, $\left< w, u \right> = 0$. This mean that for any $T(w)=0$. Therefore, $w\in \ker(T)$.

Things to review:
- change of basis and calculations
- matrix forms for row operations
	- Swapping rows change determinant sign
- Gram Schmidt method
- 