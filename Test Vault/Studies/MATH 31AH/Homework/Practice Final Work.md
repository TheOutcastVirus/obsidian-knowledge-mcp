---
Created: 2025-12-06
Type: Zettel
aliases:
References:
Links:
tags:
  - MATH31AH
---
## Problem I
### (1)
Define map $T$ as $v\mapsto \left< S^\perp, v\right>$

We know that $\ker T \cap S^\perp=0$ no vectors inside $S^\perp$ are orthogonal to each other, by the definition of the set. 

### (2)
Start with the fact that $\left< v,w \right> = v^Tw$. 

With this, we can rewrite $\left< Av,Aw \right> = (Av)^T(Aw)$. We can expand this further $A^Tv^TAw = (A^TA)v^Tw$. Simplified, this is $Iv^Tw$, which is just $\left< v,w \right>$.

### (3)
We start $\left< Av,Aw \right> = \left< v,w \right>$. From the previous problem, we know that this is equal to $(Av)^T(Aw)=v^Tw$. Expanding, we get $A^Tv^TAw=v^Tw$. This means that $A^TA=I$, meaning that $A^T=A^{-1}$.  

### (4)
Let $B=\{ \hat{e}_{1}, \hat{e}_{2},\dots \hat{e}_{n} \}$. For $B$ to be a basis, the elements of $B$ must be linearly independent. 

To prove that they are linearly independent, for the following equation: 
$$
a_{1}\hat{e}_{1}+a_{2}\hat{e}_{2}+\dots+a_{n}\hat{e}_{n}=\vec{0}
$$
must imply that all $a_{i}=0$. 

Expand the equation:
$$
a_{1}\begin{bmatrix}
1 \\
0 \\ 
0 \\
\vdots \\
0
\end{bmatrix}
+ a_{2} \begin{bmatrix}
1 \\
2 \\
0 \\
\vdots \\
0
\end{bmatrix}
+ \dots
+ a_{n} \begin{bmatrix}
1 \\
2 \\
3 \\
\vdots \\
n
\end{bmatrix} = \vec{0}
$$
Expanding the system of equations component wise, we get the following equations:
$a_{1}+a_{2}+\dots+a_{n-1}+a_{n}=0$
$2a_{2}+\dots+2a_{n-1}+a_{n}=0$
$\dots$
$(n-1)a_{n-1}+(n-1)a_{n}=0$
$na_{n}=0$

Working backwards from the last equation, we get that $a_{n}=0$. From that, we can deduce that $(n-1)a_{n-1}+(n-1)(0)=0$ and that $a_{n-1}=0$. Continuing this process for the rest of the equations, we can see that for all $a_{i}=0$. Therefore, the elements of $B$ are linearly independent. 

We know that there are $n$ linearly independent elements of $B$, so we know that the span of $B$ must be $\mathbb{R}^n$. Therefore, we can conclude that $B$ is a basis of $\mathbb{R}^n$. 

### (Unnumbered)

### (5)

### (6)

### (7)

### (8)

## Problem II
### (1)
- Is the product of two symmetric matrices always symmetric?
	- No, not always, as $AB=(AB)^T$ only holds when $AB=BA$. We can rewrite $(AB)^T=B^TA^T=BA$. Therefore, this is not always true.
- The sum of two symmetric matrices is symmetric
	- This is always true as matrix addition is done component wise, and as long as the order and relative values of the matrix do not change, the matrix remains symmetric. 
- The sum of two anti-symmetric matrices is anti-symmetric
	- This holds for the same reason as the previous problem.
- The inverse of an invertible symmetric matrix is symmetric
	- By definition, we know that $AA^{-1}=I$. Take the transpose of both sides. We get that $(AA^{-1})^T=(I)^T$. Simplifying, we get that $(A^{-1})^TA^T=I$. Since $A^T=A$, and $A$ is invertible, the matrix that multiplies $A$ to get $I$ must be $A^{-1}$. Therefore, we can conclude that $(A^{-1})^T=A^{-1}$. Therefore, $A^{-1}$ is symmetric.
- If $B$ is an arbitrary $n \times m$ matrix, then $A=B^TB$ is symmetric.
	- For $A$ to be symmetric, then $A^T=A$. That means we have to see if $(B^TB)^T=B^TB$. Simplifying, we get that $(B^TB)^T=B^T(B^T)^T$ which simplifies to just $B^TB$. Therefore, $A=B^TB$ is symmetric.
- If $A$ is similar to $B$ and $A$ is symmetric, then $B$ is symmetric
	- This is not necessarily true, as $(SAS^{-1})^T=(S^{-1})^TA^TS^T$, which is only equal to $SAS^{-1}$ if $S$ is orthogonal. Therefore, this is not always true.
- If $A=SBS^{-1}$ with $S^TS=I$, and $A$ is symmetric, then $B$ is symmetric
	- This is true. We get that $(SBS^{-1})^T=SBS^{-1}$. We get that $(S^{-1})^TB^TS^T$. We know that $S^TS=I$, so that means $S^T=S^{-1}$. Using this, we simplify $SB^TS^{-1}=SBS^{-1}$. Therefore, we know that $B=B^T$, and $B$ is symmetric. 
- Every symmetric matrix is diagonalizable
	- By the spectral theorem, all symmetric matrices have simple spectra. This means that their eigenvalues have equal algebraic and geometric multiplicity. This means they are also all diagonalizable. 
- Only the zero matrix is both anti-symmetric and symmetric
	- This is true, because for a matrix to be anti symmetric, the entries of some matrix $A=(a_{ij})_{nm}$ have to fulfill both $a_{ij}=-a_{ji}$ and $a_{ij}=a_{ji}$. The only number for which $a_{ji}=-a_{ji}$ is zero. 

### (2)
#### (a)
The characteristic polynomial of matrix $\begin{bmatrix}A & C \\ 0 & B\end{bmatrix}$ would be equal to $\det( \begin{bmatrix}A & C \\ 0 & B\end{bmatrix}-xI)$. This is equal to $\det \begin{bmatrix}A-xI & C \\ 0 & B-xI\end{bmatrix}$.
Taking this determinant, we get $\det(A-xI)\det(B-xI)$. This is simply the product of the characteristic polynomial of $A$ and the characteristic polynomial of $B$. 

#### (b)
Since the determinant of a transpose is the same, and the determinant to get the characteristic polynomial only subtracts along the diagonal (which) is unchanged by the transpose, the characteristic polynomial will be the same.

### (3)
Done on paper.

### (4)
#### (a)
Make a diagonal matrix $A$ with the eigenvalues as the entries. Then, find any invertible 4 by 4 matrix, $S$, and you result will be computed as $SAS^{-1}$.

#### (b)
No, since we know that if a matrix has complex eigenvalues, that each of them must have a conjugate. This means that along with these 3 eigenvalues, this matrix needs to have 3 more eigenvalues that correspond with each of their conjugates. This means that this is only possible with a 6 by 6 matrix.

#### (c)
No, this is not generally true. This only works when $A$ and $B$ share eigenvectors. If the eigenvector associated with $\lambda$ and $\mu$ are different, it does not make sense to multiply them.

#### (d)
Yes, because $A$ and $A^{2}$ share eigenvectors. That means that for some eigenvalue $\lambda$, and associated some eigenvector $v$, $A^{2}v$ can be written as $\lambda^{2}v$.

#### (e)
$Ax=\lambda x$. 
$A^{-1}Ax=A^{-1}\lambda x$
$x=A^{-1}\lambda x$
$\frac{1}{\lambda}x=A^{-1}x$
Therefore, $\frac{1}{\lambda}$ is a eigenvalue of $A^{-1}$.

#### (f)
Since characteristic polynomials of $A$ and $A^T$ are the same, then the eigenvalues are also the same.

### (5)
Done on paper.