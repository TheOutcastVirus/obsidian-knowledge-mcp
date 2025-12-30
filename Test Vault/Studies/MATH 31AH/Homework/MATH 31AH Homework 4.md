---
Created: 2025-10-26
Type: Task
aliases:
References:
Links:
tags:
  - MATH31AH
Start date: 2025-10-23
Due date: 2025-10-31
Status: DONE
Subtasks:
Priority:
---
## Problem I
![[image-7.png]]
### (1)
To prove that $T_{1}, T_{2}$ are linear maps, we have to show that $T_{1}(\alpha \vec{v}+\beta \vec{w}) = \alpha T_{1}(\vec{v})+\beta T_{1}(\vec{w})$ and $T_{2}(\alpha \vec{v}+\beta \vec{w}) = \alpha T_{2}(\vec{v})+\beta T_{2}(\vec{w})$. 

We know that $T(\vec{v}) = (T_{1}(\vec{v}), T_{2}(\vec{v}))$. Say we have some $T(\vec{v}+\vec{w})$. We could write this as $T(\vec{v})+T(\vec{w})$. This is also equal to $(T_{1}(\vec{v}), T_{2}(\vec{v}))+(T_{1}(\vec{w}),T_{2}(\vec{w}))$. Adding these two vectors, we get that $(T_{1}(\vec{v})+T_{1}(\vec{w}), T_{2}(\vec{v})+T_{2}(\vec{w}))$. Since we can also write $T(\vec{v}+\vec{w}) = (T_{1}(\vec{v}+\vec{w}), T_{2}(\vec{v}+\vec{w}))$, this means that $T_{1}(\vec{v}+\vec{w}) = T_{1}(\vec{v})+T_{1}(\vec{w})$, and that $T_{2}(\vec{v}+\vec{w}) = T_{2}(\vec{v})+T_{2}(\vec{w})$.

We also have to show that $T_{1}(\alpha \vec{v}) = \alpha T_{1}(\vec{v})$, and that $T_{2}(\alpha \vec{v}) = \alpha T_{2}(\vec{v})$. We can write $T(\alpha \vec{v}) = \alpha T(\vec{v})$, which is then $\alpha(T_{1}(\vec{v}),T_{2}(\vec{w}))$. Multiplying by scalar $\alpha$, we get that $(\alpha T_{1}(\vec{v}), \alpha T_{2}(\vec{w}))$. Since we can also write that $T(\alpha \vec{v}) = (T_{1}(\alpha \vec{v}),T_{2}(\alpha \vec{v}))$, this means that we can equation the two. This means that $T_{1}(\alpha \vec{v}) = \alpha T_{1}(\vec{v})$ and that $T_{2}(\alpha \vec{v}) = \alpha T_{2}(\vec{v})$. 

With the above proven, $T_{1},T_{2}$ are both linear maps. 

### (2)
Recalling the definition, we know that the kernel of T $\ker T = \{ \vec{v} \in \mathbb{R}^2 : T(\vec{v}) = \vec{0} \}$. We have to find the set of vectors that make the function go to zero. We have to find $\vec{v} \in \mathbb{R}^2$ such that $(T_{1}(\vec{v}),T_{2}(\vec{v}))=\vec{0}$. 

We know that for the above equation to be true, both $T_{1},T_{2}$ have to be equal to zero. This means that $\vec{v}$ has to line in $\ker T_{1}$ and $\ker T_{2}$. To represent this, we can take the intersection between the two sets. Therefore, $\ker T = \ker T_{1} \cap \ker T_{2}$. 

### (3)
Here, we are asked to show if there exists an associated vector $A_{1}$ for the transform $T_{1}$ such that $T_{1}(\vec{v}) = A_{1} \cdot \vec{v}$. 

Essentially, this vector is just a $1 \times n$ associated matrix of the transformation. Since we earlier proved that $T_{1}$ is a linear transformation, we can prove that every transformation must have an associated matrix, and so will $T_{1}$. 

We know that any vector in $\mathbb{R}^n$ can be described as a linear combination of vectors $\vec{x} = x_{1}\vec{e}_{1}+\dots+x_{n}\vec{e}_{n}$. For this, we can apply the the linear transform $T_{1}$. We get that $T_{1}(\vec{x}) = T_{1}(x_{1}\vec{e}_{1}+\dots+x_{n}\vec{e}_{n})$. Using properties of linear maps, we can break this into $T_{1}(\vec{x}) = x_{1}T_{1}(\vec{e}_{1})+\dots+x_{n}T_{1}(\vec{e}_{n})$.  We can write this as a do product, with each $T_{1}(\vec{e}_{n})$ as one of the elements of one vector, and $x_{n}$ as elements of vector $\vec{x}$. We get that $T_{1}(\vec{x}) = \begin{bmatrix}T_{1}(\vec{e}_{1}) & \dots & T_{1}(\vec{e}_{1})\end{bmatrix} \cdot \vec{x}$. 

Therefore, the vector $\begin{bmatrix}T_{1}(\vec{e}_{1}) & \dots & T_{1}(\vec{e}_{1})\end{bmatrix}$ is the vector that is associated with the transform $T_{1}: \mathbb{R}^n \to \mathbb{R}$. We know this because the vector itself has dimension $1 \times n$. Therefore, we can conclude that there exists a vector $A_{1}$ that $T_{1}(\vec{v}) = A_{1} \cdot \vec{v}$. 

### (4)
To find the associated matrix for a linear transformation, we have to apply the transformation itself to each of the standard basis vectors of the input space.

Therefore, to find the associated matrix $[T]$, we have to do $\begin{bmatrix} T(\vec{e}_{1}) & T(\vec{e}_{2}) & \dots & T(\vec{e}_{n})\end{bmatrix}$. Evaluating the first term here, we get that $T(\vec{e}_{1})= \begin{bmatrix}T_{1}(\vec{e}_{1}) \\ T_{2}(\vec{e}_{1})\end{bmatrix} = \begin{bmatrix}A_{1} \cdot\vec{e}_{1} \\ A_{2} \cdot \vec{e}_{1}\end{bmatrix}$. Doing this for $T(\vec{e}_{2})= \begin{bmatrix}T_{1}(\vec{e}_{2}) \\ T_{2}(\vec{e}_{2})\end{bmatrix} = \begin{bmatrix}A_{1} \cdot\vec{e}_{2} \\ A_{2} \cdot \vec{e}_{2}\end{bmatrix}$. So the pattern we get is $[T] = \begin{bmatrix}\begin{bmatrix}A_{1} \cdot\vec{e}_{1} \\ A_{2} \cdot \vec{e}_{1}\end{bmatrix} & \begin{bmatrix}A_{1} \cdot\vec{e}_{2} \\ A_{2} \cdot \vec{e}_{2}\end{bmatrix} & \dots & \begin{bmatrix}A_{1} \cdot\vec{e}_{n} \\ A_{2} \cdot \vec{e}_{n}\end{bmatrix}\end{bmatrix}$ .

This can be generalized as $T = \begin{bmatrix}A_{1} \\ A_{2}\end{bmatrix} in M_{2 \times n}(\mathbb{R})$.

## Problem II
![[image-8.png]]
### (1)
We can represent this system of equations as:
$$
\begin{bmatrix}
1 & 1 & 0 & | & a \\
0 & 1 & 1 & | & b \\
1 & 0 & 1 & | & c
\end{bmatrix}
$$
$$
\begin{bmatrix}
2 & 0 & 0 & | & a-b+c \\
0 & 1 & 1 & | & b \\
1 & 0 & 1 & | & c
\end{bmatrix}
$$
$$
\begin{bmatrix}
1 & 0 & 0 & | & \frac{a-b+c}{2} \\
0 & 1 & 0 & | & b-c+\frac{a-b+c}{2} \\
1 & 0 & 1 & | & c
\end{bmatrix}
$$
$$
\begin{bmatrix}
1 & 0 & 0 & | & \frac{a-b+c}{2} \\
0 & 1 & 0 & | & b-c+\frac{a-b+c}{2} \\
0 & 0 & 1 & | & c - \frac{a-b+c}{2}
\end{bmatrix}
$$
So we get that:
$x = \frac{a-b+c}{2}$
$y = b-c+\frac{a-b+c}{2}$
$z = c-\frac{a-b+c}{2}$

### (2)
A matrix is invertible if it can be reduced to the identity matrix using row reduction. It is also not invertible if during row reduction, a zero row appears.

$M = \begin{bmatrix}0 & a & 1 \\ -a & 0 & b \\ -1 & -b & 0\end{bmatrix}$
$\begin{bmatrix}-1 & - b & 0 \\ -a & 0 & b \\ 0 & a & 1\end{bmatrix}$
$\begin{bmatrix}1 & b & 0 \\ -a & 0 & b \\ 0 & a & 1\end{bmatrix}$
$\begin{bmatrix}1 & b & 0 \\ 0 & ab & b \\ 0 & a & 1\end{bmatrix}$
$\begin{bmatrix}1 & b & 0 \\ 0 & 0 & 0 \\ 0 & a & 1\end{bmatrix}$

As a zero row appears, we know that the determinant of $M$ is zero, and therefore there is no inverse for $M$. 

## Problem III
![[image-9.png]]

a. The system of equations has infinitely many solutions for all $a$. This can be seen with the fact that $y = 2-ax$, and then $z = -a(2-ax)+3$. This means any value of $x$ to compute $z$, which can be used to find $y$. 

b. There is no value of $a$ for the system of equations to have a unique solution.