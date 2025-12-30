---
Created: 2025-12-04
Type: Zettel
aliases:
References:
Links:
tags:
  - MATH31AH
---
## Problem 1
> Compute an eigenbasis. Find an orthonormal eigenbasis (if any) for the following matrix:
$$
\begin{bmatrix}
4 & 1 & 1 \\
1 & 2 & 3 \\
4 & 1 & 1
\end{bmatrix}
$$

To find an eigenbasis, we have to:
1. Compute the eigenvalues of the given matrix
2. Find associated eigenvectors
3. Put them in a set
## Finding eigenvalues
Let $A=\begin{bmatrix}4 & 1 & 1 \\ 1 & 2 & 3 \\ 4 & 1 & 1\end{bmatrix}$. $\chi(A)=\det(A-xId_{3})$.
$$
=\det \begin{bmatrix}
4-x & 1 & 1 \\
1 & 2-x & 3 \\
4 & 1 & 1-x
\end{bmatrix}
$$
$$
=(4-x)\det \begin{bmatrix}
2-x & 3 \\
1 & 1-x
\end{bmatrix}
-\det \begin{bmatrix}
1 & 1 \\
1 & 1-x
\end{bmatrix}
+ 4 \det \begin{bmatrix}
1 & 1 \\
2-x & 3
\end{bmatrix}
$$
$$
=(4-x)[(2-x)(1-x)-3]-[(1-x)-1]+4[3-(2-x)]
$$
$$
=-x^3+7x^2-6x = x(x^{2}-7x+6)
$$
$$
0=x(x-6)(x-1)
$$
As a result, our eigenvalues are $\lambda_{0}=0, \lambda_{1}=1, \lambda_{2}=6$. The fact that we have zero as an eigenvalue means that our matrix was singular and non-invertible, but it does not prevent us from having eigenvectors or an eigenbasis.

## Finding eigenvectors
### Eigenvector for $\lambda_{0}=0$
For $\lambda_{0}=0$, we have the following equation:
$$
(A-\lambda Id_{3})v=0
$$
$$
\begin{bmatrix}
4 & 1 & 1 \\
1 & 2 & 3 \\
4 & 1 & 1
\end{bmatrix} \begin{bmatrix}
v_{1} \\
v_{2} \\
v_{3}
\end{bmatrix} = \vec{0}
$$
We get the following equations:
$$
4v_{1}+v_{2}+v_{3}=0
$$
$$
v_{1}+2v_{2}+3v_{3}=0
$$
$$
4v_{1}+v_{2}+v_{3}=0
$$
Solving for the system, we get that $v_{3}=-\frac{7}{11}v_{2}$, and that $v_{1}=-\frac{1}{11}v_{2}$, with $v_{2}$ being a free variable. As a result of this, and example of an eigenvector is:
$$
\vec{v}_{0}=\begin{bmatrix}
-\frac{1}{11} \\
1 \\
-\frac{7}{11}
\end{bmatrix}
$$
### Eigenvector for $\lambda_{1}=1$
For $\lambda_{1}=1$, we have the following equation:
$$
\begin{bmatrix}
3 & 1 & 1 \\
1 & 1 & 3 \\
4 & 1 & 0
\end{bmatrix} \begin{bmatrix}
v_{1} \\
v_{2} \\
v_{3}
\end{bmatrix} = \vec{0}
$$
We get the following equations:
$$
3v_{1}+v_{2}+v_{3}=0
$$
$$
v_{1}+v_{2}+3v_{3}=0
$$
$$
4v_{1}+v_{2}=0
$$
Solving the system, we get that $v_{2}=-4v_{1}$, and that $v_{3}=v_{1}$. As a result, we get an example of an eigenvector is:
$$
\vec{v}_{1} = \begin{bmatrix}
1 \\
-4 \\
1
\end{bmatrix}
$$

### Eigenvector for $\lambda_{2}=6$
For eigenvector $\lambda_{2}=6$, we have the following equation:
$$
\begin{bmatrix}
-2 & 1 & 1 \\
1 & -4 & 3 \\
4 & 1 & -5
\end{bmatrix} \begin{bmatrix}
v_{1} \\
v_{2} \\
v_{3}
\end{bmatrix} = \vec{0}
$$
We get the following equations:
$$
-2v_{1}+v_{2}+v_{3}=0
$$
$$
v_{1}-4v_{2}+3v_{3}=0
$$
$$
4v_{1}+v_{2}-5v_{3}=0
$$
Solving the system, we get that $v_{1}=v_{2}$ and that $v_{2}=v_{3}$. As a result, we get an example of an eigenvector as:
$$
\vec{v}_{2}=\begin{bmatrix}
1 \\
1 \\
1
\end{bmatrix}
$$
## Final eigenbasis
Finally, we have out eigenbasis as:
$$
\left\{  \begin{bmatrix}
-\frac{1}{11} \\
1 \\
-\frac{7}{11}
\end{bmatrix},
\begin{bmatrix}
1 \\
-4 \\
1
\end{bmatrix},
\begin{bmatrix}
1 \\
1 \\
1
\end{bmatrix}
\right\}
$$
these vectors are all linearly independent. However, they are not all mutually orthogonal, and therefore we cannot construct an orthonormal eigenbasis for this matrix. We can check this by taking the dot product of two of the elements. 
$$
\left< \begin{bmatrix}
1 \\
1 \\
1
\end{bmatrix},\begin{bmatrix}
1 \\
-4 \\
1
\end{bmatrix} \right> =1-4+1 =-2\neq 0
$$
As the dot product is not equal to zero, this fails the condition to be an orthogonal and hence an orthonormal basis.