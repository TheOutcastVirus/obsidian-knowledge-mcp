---
Created: 2025-12-04
Type: Zettel
aliases:
References:
Links:
tags:
  - MATH31AH
---


## Problem I
> Question: Prove that the characteristic polynomial of the matrix $A\in M_{n}(\mathbb{R})$ defined as $\begin{bmatrix}\lambda Id_{n} & C \\ 0_{n-m \times m} & D\end{bmatrix}$
> is of the form $\chi(A)=(\lambda-x)^m \chi(D)$

To find the characteristic polynomial, we use the equation $\chi(A)=\det(A-xId_{n})$.
$$
\chi(A) = \det(\begin{bmatrix}
\lambda Id_{m}  & C \\
0_{n-m \times m}  & D
\end{bmatrix} - xId_{n})
$$
$$
=\det(\begin{bmatrix}
(\lambda-x)Id_{m}  & C \\
0_{n-m\times m}  & D - xId_{n-m}
\end{bmatrix})
$$
Taking the determinant using co-factor expansion, we get that 
$$
=\det((\lambda-x)Id_{m})\det(D-xId_{n-m})
$$
We know that the determinant of a diagonal matrix is simply the product of the diagonal elements. We also that know $\det(D-xId_{n})=\chi(D)$. Therefore, our final answer is as such:
$$
=(\lambda-x)^m\chi(D)
$$
