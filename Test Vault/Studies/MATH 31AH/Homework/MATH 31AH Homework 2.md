---
Created: 2025-10-10
Type: Zettel
aliases:
References:
Links:
  - "[[Homework 2 Math 31AH]]"
tags:
  - MATH31AH
---
![[image-31.webp]]

## Problem I
### (1)
$L(S)$ is a linear subspace of $\mathbb{R}^n$. This is because it is closed under addition and scalar multiplication. Let $L(S) = \{ a_{1}\vec{v}_{1} + \dots+a_{l}\vec{v}_{l} : \vec{v}_{i} \in S, a_{i} \in \mathbb{R}, l \in \mathbb{N} \}$. 

## (2)
Let $L(S) = \{ a_{1}\vec{v}_{1} + \dots+a_{n}\vec{v}_{n} : \vec{v}_{j} \in S, a_{j} \in \mathbb{R}, n \in \mathbb{N} \}$. Say that $T (\neq \emptyset)\subset S$. If we can prove that for every element in $L(T)$, it is also in $L(S)$, we can prove that $L(T) \subset L(S)$. 

Let $L(T) = \{ a_{1}\vec{v}_{1} + \dots + a_{l}\vec{v}_{l} : \vec{v}_{i} \in T, a_{i} \in \mathbb{R}, l \in \mathbb{N} \}$. Select some element from $L(T)$,  $\vec{w} =  a_{1}\vec{v}_{1} + \dots + a_{l}\vec{v}_{l} : \vec{v}_{i} \in T, a_{i} \in \mathbb{R}, l \in \mathbb{N}$. 

For every $\vec{v}_{i} \in T$, we know that $\vec{v}_{i} \in S$, as $T \subset S$. As a result, every $\vec{w}$ satisfies the conditions to belong in $L(S)$: $\vec{v}_{j} \in S, a_{j} \in \mathbb{R}, n \in \mathbb{N}$. As a result, every $\vec{w} \in L(T)$ is also in $L(S)$. As a result, we know that $L(T) \subset L(S) \square$. 

## (3)
 We are trying to prove that $S \cup \{ \vec{v} \}$ is linearly independent, given some linearly independent set $S$ and vector $\vec{v} \not\in L(S)$. For a proof by inversion, suppose that $S \cup \{ \vec{v} \}$ was not linearly independent. 

We know that if $S \cup \{ \vec{v} \}$ was not linearly dependent, that $\vec{v} \in L(S \cup \{ \vec{v} \} \setminus \{ \vec{v} \})$ (or $L(S)$, to be simplified). This result is proved as follows (we did this proof in class).

As $\vec{v}\in L(S)$, then there exists $w_{i} \in S, r_{i} \in \mathbb{R}$ . We want to see if $\vec{v}$ can be made by these combinations.  $\vec{v} = r_{1}\vec{w}_{1}+\dots+r_{k}\vec{w}_{k}$. Subtracting $\vec{v}$ from both sides, we get that: $0=(-1)\vec{v}+r_{1}\vec{w}_{1}+\dots+r_{k}\vec{w}_{k}$. Since the coefficient of $\vec{v}=-1\neq 0$, and the total sums to 0, we can conclude that $\{ \vec{w}_{1},\dots,\vec{w}_{k} \} \subset Q$ is not linearly independent.

However, we know for a fact that $\vec{v} \not\in L(S)$. This negates our case in our contradiction. As a result, we know that $S \cup \{ \vec{v} \}$ is indeed linearly independent. $\square$. 

## (4)
 Let $T_{0}=S$ be our first set. This set is linearly independent, but since $L(S) \subsetneq \mathbb{R}^n$, and $T_{0}$ is linearly independent, we know that $L(T_{0})\neq \mathbb{R}^m$, and that there is some $\vec{v}_{0} \not\in T_{0}$ such that $\vec{v}_{0} \not\in L(T_{0})$.  

Let $T_{1}=T_{0}\cup \vec{v}$. If $L(T_{1})=\mathbb{R}^n$, then we are done. But if not, we have to repeat the process with some vector $\vec{v}_{1} \not\in T_{1}$ such that $\vec{v}_{1} \not\in L(T_{1})$. We then continue the process with $T_{2}=T_{1} \cup \vec{v}_{1}$.

Since we know any linearly independent subset of $\mathbb{R}^n$ it has at most $n$ elements. Since we know that $n$ is finite, we know that for some $T_{i}=\mathbb{R}^n$. We create a chain such that $S \subset T_{0} \subset T_{1} \subset \dots T_{i}= \mathbb{R}^n$, eventually proving the existence of $T$. $\square$

## Problem II
The vector field that I choose is the electric field of a point charge: 
$$
\vec{E}(r) = \frac{1}{4\pi \epsilon_{0}}\frac{q}{r^2}\hat{r}
$$
It looks like the following:

![[image-5.png|576x227]]

This vector field contains vectors representing the electric field strength at every point in space. These are strongest right near the charge, and get weaker and weaker as you go farther and farther from the charge. If the charge is negative, the vector field points towards the charge, and if positive, points away from the charge.  

## Problem III
![[image-32.webp]]
### 1.2.6
a. The following matrix, $\begin{bmatrix}a & 0  \\ 0 & a\end{bmatrix}$ is a diagonal, symmetric, and triangular. 
b. The following matrix, $\begin{bmatrix}a & 0 \\ 0 & b\end{bmatrix}$ is diagonal, symmetric, and triangular.  The matrix multiplication (done by me by hand by the way) follows: 
$$\begin{bmatrix}a & 0 \\ 0 & b\end{bmatrix}^2 = \begin{bmatrix}a \cdot a + 0 \cdot 0  & a \cdot 0 + 0 \cdot b \\ a \cdot 0 + b \cdot 0 & 0 \cdot 0 + b \cdot b\end{bmatrix} = \begin{bmatrix}a^{2} & 0 \\ 0 & b^{2}\end{bmatrix}$$
c. $\begin{bmatrix}a & 0 \\ 0 & a\end{bmatrix}$ is diagonal, symmetric, and triangular, but $\begin{bmatrix}0 & 0 \\ b & b\end{bmatrix}$ is not any of those. The matrix multiplication follows: 
$$
\begin{bmatrix}
a & 0 \\
0 & a
\end{bmatrix} \begin{bmatrix}
0 & 0 \\
b & b
\end{bmatrix} = \begin{bmatrix}
a \cdot 0 + 0 \cdot b & a \cdot 0 + 0 \cdot b \\
0 \cdot 0 + a \cdot b & 0 \cdot 0 + a \cdot b
\end{bmatrix} =  \begin{bmatrix}
0 & 0 \\
ab & ab
\end{bmatrix}
$$
d. $\begin{bmatrix}a & 0 \\ 0 & b\end{bmatrix}$ is diagonal, symmetric and triangular. The matrix multiplication is as follows: 
$$
\begin{bmatrix}a & 0 \\ 0 & b\end{bmatrix}^2 = \begin{bmatrix}
a \cdot a + 0 \cdot 0 & a \cdot 0 + 0 \cdot b \\
0 \cdot a + b \cdot 0 & 0 \cdot 0 + b \cdot b
\end{bmatrix} = \begin{bmatrix}
a^{2} & 0 \\
0 & b^{2}
\end{bmatrix}
$$
![[image-34.webp]]
![[image-35.webp]]
### 1.2.12
Say that $A=\begin{bmatrix}a & b \\ c & d\end{bmatrix}$ and that $A^{-1}=\frac{1}{ad-bc}\begin{bmatrix}d & -b \\ -c & a\end{bmatrix}$. 
For $A$ to have an inverse, the following equation must be true:
$$
\begin{bmatrix}
 a & b \\
c & d
\end{bmatrix} \begin{bmatrix}
w & x \\
y & z
\end{bmatrix} = \begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
$$
Simplifying, we get that:
$$
\begin{bmatrix}
aw + by & ax + bz  \\
cw + dy  & cx+dz
\end{bmatrix} = \begin{bmatrix}
1 & 0  \\
0 & 1
\end{bmatrix}
$$
We get the following system of equations:
$aw+by =1$
$ax+bz = 0$
$cw+dy =0$
$cx+dz=1$

We can solve it to get that:
$w = \frac{d}{ad-bc}$
$x = \frac{-b}{ad-bc}$
$y = \frac{-c}{ad-bc}$
$z = \frac{a}{ad-bc}$

We can put this back into the matrix to get that:
$$
A^{-1} = \frac{1}{ad-bc}\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}
$$
### 1.2.13
Building off of the last problem, we know that
$$A^{-1} = \frac{1}{ad-bc}\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}$$
For a matrix to be invertible, it needs to have a left and right inverse that are the same, equal to the matrix we have above. If the determinant, $ad-bc$ is equal to zero, we get division by zero, we show that the inverse does not exist for that case. 

### 1.2.15
Show that $\begin{bmatrix}1 & a & b \\ 0 & 1 & c \\ 0 & 0 & 1\end{bmatrix}$ has an inverse of form $\begin{bmatrix}1 & x & y \\ 0 & 1 & z \\ 0 & 0 & 1\end{bmatrix}$. For the matrix to be an inverse, the following has to be true: 
$$
 \begin{bmatrix}1 & a & b \\ 0 & 1 & c \\ 0 & 0 & 1\end{bmatrix}\begin{bmatrix}1 & x & y \\ 0 & 1 & z \\ 0 & 0 & 1\end{bmatrix} = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

We can multiply the two matrices: 

$$
\begin{bmatrix}
1 & x+a & y+az+b \\
0 & 1 & z+c \\
0 & 0 & 1
\end{bmatrix} =  \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$
We get that $x+a=0$, $z+c=0$, and $y+az+b=0$. Therefore, $x=-a$, $z=-c$, $y=ac-b$. 

Therefore, you get that the inverse of the matrix is of form: 
$$
\begin{bmatrix}
1 & -a & ac-b \\
0 & 1 & -c \\
0 & 0 & 1
\end{bmatrix}
$$
