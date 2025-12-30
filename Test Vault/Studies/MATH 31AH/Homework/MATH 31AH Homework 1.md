---
Created: 2025-09-30
Type: Zettel
aliases:
References:
Links:
  - "[[Homework 1 Problem Set.pdf]]"
tags:
  - MATH31AH
---
## Problem I
![[image.png]]
### (1)
 $S$ can be called countably infinite if it can be proven that $S$ is bijective to $\mathbb{N}$.
 
### (2)
First, we have to prove that $\mathbb{N}^k$ is countable. To do so, we have to prove its bijection to $\mathbb{N}$. 
By definition $\mathbb{N}^1$ is countable. Assume $N^k$ is countable. $N^{k+1}$ is $N^k \times \mathbb{N}$, which is the cartesian product of two countable sets, which is also therefore countable. 

Now, we have to map from $S$ to $(\mathbb{N}^k)^5$ . For each $s \in S$ let $A_{s} \subseteq \mathbb{N}^k$  bet the set of $k$-tuples where $|A_{s}|\leq 5$. By the definition of the problem, $s\neq t$ means $A_{s}\neq A_{t}$. Therefore, each value $s$ has a unique mapping. Then we can define an injective mapping $s \to A_{s}$ from $S$ to the set $F$ of all subsets of $\mathbb{N}^k$ with size $\leq 5$. 

As $F$ contains subsets of size $\leq5$, and we have previously proven that $\mathbb{N}^k$ is countable, $F=(\mathbb{N}^k)^5$ is also countable. 

As we have an injective mapping from the set $S$ and $F$, and $F$ is countable infinite, we know that at most $S$ is countably infinite. It could also be finite. 

### (3)
Claim: The set $S$ of all infinite subsets of $\mathbb{N}$ is uncountable.

For contradiction, suppose that $S$ is countable. Then we can list all infinite subsets of $\mathbb{N}$ as $S_{1}, S_{2},S_{3},\dots$.

Since each $S_{i}$ is an infinite subset of $\mathbb{N}$, we can enumerate its elements in increasing order: 
- $S_{1} = \{ a_{11}, a_{12}, a_{13}, \dots \}$
- $S_{2} = \{ a_{21}, a_{22}, a_{23}, \dots \}$
- $S_{3} = \{ a_{31}, a_{32}, a_{33}, \dots \}$
- and so on. 
Now we can use Cantor's diagonal trick to construct an infinite subset $D$ of $\mathbb{N}$ that's not in our list. 

Define $D=\left\{  a_{11} + 1, a_{22} +1, a_{33} +1, a_{44} +1, \dots  \right\}$. $D$ is clearly infinite, and is not in $S$.

For any $i$, consider the $i$-th smallest element of $D$, which is $a_{ii}+1$. The $i$-th smallest element of $S_{i}$ is $a_{ii}$. Since $a_{ii}+1\neq a_{ii}$, we have that $D$ and $S_{i}$ differ for at least in their $i$th position. 

Therefore $D\neq S_{i}$ for all $i$, which means $D$ is an infinite subset of $\mathbb{N}$ thats not in our supposed complete list. Therefore, $S$ must be uncountable. $\square$

## Problem II
![[image-1.png]]

Let $a$ be a algebraic number. For $a$, find $p_{a}(x)$, its monic polynomial of minimal degree that has $a$ as a solution. You can define the height of a polynomial as the absolute value sum of its integer coefficients except for the leading 1. 

For each fixed polynomial height $H$, there are a finite number of polynomials with such a height. For for each of these polynomials, they have a finite number of solutions, as a polynomial can only have as many solutions as its degree. 

We can list all of the algebraic numbers in the following way:
- Height 0
- Height 1
- Height 2
- ...
Each of these heights have finitely many algebraic numbers. A countable union of finite sets is considered countable, so therefore, the set of algebraic numbers is considered countable. 

## Problems 1.1.1 - 1.1.9
![[image-2.png]]
![[image-3.png]]
### 1.1.1
![[IMG_4304 2.jpeg]]
### 1.1.2
a. $\begin{bmatrix}3 \\ \pi \\ 1\end{bmatrix} + \begin{bmatrix}1 \\ -1 \\ \sqrt{ 2 }\end{bmatrix} = \begin{bmatrix}4 \\ \pi-1 \\ 1+\sqrt{ 2 }\end{bmatrix}$
b. $\begin{bmatrix}1 \\ 4 \\ c \\ 2\end{bmatrix} + \vec{\mathbf{e}_{2}} = \begin{bmatrix}1 \\ 5 \\ c \\ 2\end{bmatrix}$
c. $\begin{bmatrix}1 \\ 4 \\ c \\ 2\end{bmatrix}-\vec{\mathbf{e}}_{4}=\begin{bmatrix}1 \\ 4 \\ c \\ 1\end{bmatrix}$
### 1.1.3
a. A vector $\mathbf{\vec{v}} \in \mathbb{R}^3$
b. A line $L \subset \mathbb{R}^2$
c. A curve $C \subset \mathbb{R}^3$
d. A point $\mathbf{x} \in \mathbb{C}^2$
e. A sequence of nested balls $B_{0} \subset B_{1} \subset B_{2} \dots$

### 1.1.4
Two trivial subspaces of $\mathbb{R}^n$ are 
1. $\{ 0 \}$
2. $\mathbb{R}^n$

### 1.1.5
1. $$
\vec{\mathbf{v}}=\sum_{i=1}^{n} \vec{\mathbf{e}_{i}}
$$
2. $$
\vec{\mathbf{v}} = \sum_{i=1}^n i \vec{\mathbf{e}_{i}}
$$
3. $$
\vec{\mathbf{v}}=\sum_{i=3}^n i \vec{\mathbf{e}_{i}}
$$
### 1.1.6
a. ![[image-22.webp|317x336]]
b. ![[image-23.webp|314x332]]
c. ![[image-24.webp|307x325]]
d. ![[image-25.webp|300x317]]
e. ![[image-26.webp|300x318]]
f. ![[image-27.webp|311x329]]
g. ![[image-28.webp|317x336]]
h. ![[image-29.webp|318x336]]
i. ![[image-30.webp|317x336]]
### 1.1.7
![[IMG_4305.jpeg|382x233]]

### 1.1.8
a. If the speed of the water is given by $r^{2}-a^{2}$, where $r$ is the radius of the pipe and $a$ is the distance from the axis of the pipe, the vector field could be written as:
$$
S(x,y) = (r^{2} - x^2-y^2)\hat{k}
$$
b. To find this vector field, we need to first find an expression for $a$, the distance from the axis. 

On a 2D plane, the closest point on the unit circle to some $(x,y)$ would be the point normalized to distance 1. 
$$
\begin{bmatrix}
\frac{x}{\sqrt{ x^{2}+y^{2} }} \\
\frac{y}{\sqrt{ x^{2}+y^{2} }} \\
0
\end{bmatrix}
$$
The distance from $(x,y,z)$ to this point is:
$$
\begin{bmatrix}
x-\frac{x}{\sqrt{ x^{2}+y^{2} }} \\
y-\frac{y}{\sqrt{ x^{2}+y^{2} }} \\
z
\end{bmatrix}
$$
The magnitude of this vector is:
$$
a=\sqrt{ x^{2}-2\sqrt{ x^{2}+y^{2} }+1+y^{2}+z^{2} }
$$
The magnitude of velocity follows our equation $r^{2}+a^{2}$.
$$
r^{2}-( x^{2}-2\sqrt{ x^{2}+y^{2} }+1+y^{2}+z^{2} )
$$
The vector valued function can be defined as the above magnitude multiplied by $\begin{bmatrix}-y  \\ x \\ 0\end{bmatrix}$ to define the flow as tangent to the unit circle.
$$
V(x,y,z) = (r^{2}-( x^{2}-2\sqrt{ x^{2}+y^{2} }+1+y^{2}+z^{2} )) \cdot \begin{bmatrix}
-y \\
x \\
0
\end{bmatrix}
$$

### 1.1.9
The set of complex numbers $\{ z | \mathrm{Re}(zw) = 0 \}$ with fixed $w \in \mathbb{C}$ is the set of complex numbers $z$ whose angles when added up to the angle of $w$ sum to either $\frac{\pi}{2}$ or $\frac{3\pi}{2}$ radians. This is because the real portion of a complex number corresponds to its x-coordinate on the complex plane. Therefore, a complex number with real component zero would land on a subspace that consists of the y-axis. 

To multiply two complex numbers, you add their angles and multiply their magnitudes. Given some fixed complex number $w$, to find an element of the aforementioned set, you need to find some complex number $z$ such that the angles sum to either $\frac{\pi}{2}$ or $\frac{3\pi}{2}$ radians. 

This set is a subspace of $\mathbb{R}^2$ because it is closed under addition and scalar multiplication, and contains 0. Adding any two complex numbers of the set will make them remain on the y-axis, and scalar multiplication means that they will not change angle, so they will remain on the axis. As a result, the set $\{ z | \mathrm{Re}(zw) = 0 \}$ is a vector subspace of $\mathbb{R}^n=\mathbb{C}$.
