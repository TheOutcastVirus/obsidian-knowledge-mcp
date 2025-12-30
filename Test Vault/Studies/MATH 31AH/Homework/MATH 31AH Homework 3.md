---
Created: 2025-10-22
Type: Zettel
aliases:
References:
Links:
tags:
  - MATH31AH
---
## Problem 1
![[image-50.webp]]
### (1)
Pick some $\vec{v}, \vec{w} \in S \subset \mathbb{R}^n$ as $\alpha \in R$. If we can prove that $T(\vec{v}) + T(\vec{w}) \in T(S)$, $\alpha T(\vec{v}) \in T(S)$, and $\vec{0}_{m} \in T(S)$, then we can prove that $T(S)$ is a linear subspace of $\mathbb{R}^m$. In other words, we want to prove that $T(S)$ is closed under addition and scalar multiplication. 

First, let us prove that $T(\vec{v}) + T(\vec{w}) \in T(S)$. We can write this as $T(\vec{v} + \vec{w})$, as $T$ is a linear map. We know that $\vec{v} + \vec{w} \in S$, as $S$ is a linear subspace and is closed under vector addition. Since $T$ is defined for $\mathbb{R}^n$, and $S \subset \mathbb{R}^n$, we know for a fact that $T(S)$ is defined for all elements in $S$. Therefore, we know that  $T(\vec{v} + \vec{w}) \in T(S)$. 

Next, let us prove that $\alpha T(\vec{v}) \in T(S)$, when $\alpha \in \mathbb{R}$. Again, we can write this as $T(\alpha \vec{v})$. We know that $\alpha \vec{v} \in S$, as $S$ is a linear subspace and is closed under scalar multiplication. Therefore, $T(\alpha \vec{v}) \in T(S)$.

Finally, we have to show that $\vec{0}_{m} \in T(S)$. As we have proven that $\alpha T(\vec{v}) \in T(S)$, we can take the case where $\alpha = 0$. In this case, $\alpha T(\vec{v}) = \vec{0}_{m}$, therefore $\vec{0}_{m} \in T(S)$. 

As these 3 properties are satisfied, we know that if $S$ is a linear subspace, that $T(S)$ is also a linear subspace.

### (2)
Select some $\vec{u}, \vec{v} \in T^{-1}(S)$. We have to show that $\vec{u} + \vec{v} \in T^{-1}(S)$. We know that $T(\vec{u}), T(\vec{v}) \in S$. We know from the above proof, that $T(\vec{u}+\vec{v}) \in S$ as $T$ is a linear transformation ($T(\vec{u})+T(\vec{v})=T(\vec{u}+\vec{v})$) and since $S$ is a linear subspace ($T(\vec{u}), T(\vec{v}) \in S$, then $T(\vec{u}) + T(\vec{v}) \in S$).  As $T(\vec{u}+\vec{v}) \in S$, it follows that $\vec{u}+\vec{v} \in T^{-1}(S)$. 

Now we have to show that for some $\vec{v} \in T^{-1}(S)$ and for all $\alpha \in \mathbb{R}$, that $\alpha \vec{v} \in T^{-1}(S)$. We know that $T(\vec{v}) \in S$. Since $T$ is a linear transformation, we know that $\alpha T(\vec{v}) = T(\alpha \vec{v})$, and since $S$ is a linear subspace, we know that $\alpha\vec{v}$ is in $S$. Therefore, $\alpha \vec{v} \in T^{-1}(S)$. 

Finally, we have to prove that $\vec{0} \in T^{-1}(S)$. Since we know that for any $\alpha \in \mathbb{R}$, any $v \in T^{-1}(S)$ that $\alpha \vec{v} \in T^{-1}(S)$, we can simply take the case that $\alpha = 0$, and we can see that $\alpha \vec{v} = \vec{0}$. Therefore, $\vec{0} \in T^{-1}(S)$.

Therefore, we know that $T^{-1}(S)$ is indeed a linear subspace of $\mathbb{R}^n$, in the case that $T^{-1}(S) := \{ \vec{v} \in \mathbb{R}^n : T(\vec{v}) \in S\}$. 

### (3)
The kernel of $T$ is the set such that $\ker T := \{  \vec{v} \in \mathbb{R}^n : T(\vec{v}) = \vec{0} \}$. We have to work to show that $\ker T$ is a linear subspace. 

Earlier, we proved that a set is also a linear subspace if it includes the set of vectors that when transforms by some linear transformation $T$ that they belong to some linear subspace $S$. Essentially, if you have set a set $A$ such that:$A := \{ \vec{v} \in \mathbb{R}^n : T(\vec{v}) \in S \}$ And $T$ is a linear transformation, and $S$ is a linear subspace, then $A$ is also a linear subspace. 

We can apply this to the set $\ker T$. In our case, $T$ is indeed a linear transformation. For us, $S = \{ \vec{0} \}$ . We know that this is a linear subspace, as this one of the trivial linear subspaces.

Therefore, we can conclude that $\ker T$ is indeed a linear subspace.

### (4)
Say that $q \in Q$ and $T(p) = q$. For all $\alpha \in \ker T$, let us evaluate what $T(\alpha + p)$. 

We can write it as $T(\alpha) + T(p)$ as $T$ is a linear transformation. Since $\alpha \in \ker T$, we know that $T(\alpha) = \vec{0}$. We know that $T(p)=q$. Therefore, for all $\alpha$, $T(\alpha + p) = q \in Q$. Therefore, we know that $\alpha + p \in T^{-1}(Q)$

Here, we are close to a mapping that gives a mapping between the elements of $\ker T$ and $T^{-1}(Q)$. We can define a mapping $\phi : \ker T \to T^{-1}(Q)$ such that $\phi (\alpha) = \alpha + p$, where $T(p) \in Q$. 

We now have to prove that this mapping is injective. Suppose that $\phi(\alpha_{1}) = \phi(\alpha_{2})$. Then, $\alpha_{1}+p=\alpha_{2}+p$. Subtracting $p$ from both sides, we get that $\alpha_{1}=\alpha_{2}$, proving that $\phi$ is injective. 

## Problem 2
![[image-51.webp]]
### (1)
We know that since $\ker T = L(\{ v_{1},..,v_{n-m} \})$, the first $n-m$ vectors, as well any scalar multiple or linear combination of them, all map to zero. The leaves it to the $n-m+1\leq 1 \leq n$ to give the space its non-triviality. This would lead it to be a basis of $\mathbb{R}^m$, which is what we need to prove. 

For $C:= \{ T(v_{i}) : n-m +1 \leq i \leq n \}$ to be a basis of $\mathbb{R}^m$, it needs to have $m$ number of elements, and it must be linearly independent. 

To show that $C$ has $m$ elements, we can simply see the bounds of $n-m +1 \leq i \leq n$. This implies that set $C$ has $n-(n-m)$ elements, which is just $m$ elements. 

To show that $C$ is linearly independent, we have to show that for
$$
\vec{0} = a_{1}T(v_{n-m+1})+\dots+a_{m}T(v_{n})
$$
That $a_{1}=\dots=a_{m}=0$. We can show this by proving that $T(v_{i}) \neq \vec{0}$. We know this because we know that all the vectors of transform $T$ that map to zero (null space of $T$) are in $L(\{ v_{1},\dots,v_{n-m} \})$. We know that $\{ v_{n-m+1},\dots,v_{n} \}$ is not in the null space of $T$ because the set of basis vectors is linearly independent, and it therefore not mapped to by the linear span. Therefore, for $T(v_{i}) \neq \vec{0}$. Therefore, $a_{1}=\dots=a_{m}=0$, showing that $C$ is linearly independent. 

As we have shown that $C$ has $m$ elements, and is linearly independent, we know that $C$ is a basis of $\mathbb{R}^m$. $\square$

### (2)
As we know that for $\ker T = L(\{ v_{1},\dots,v_{n-m} \})$, we know that for every dimension (basis vector) until $n-m$, the mapping is to zero. We can partially define $T$ for these dimensions. We know that $T$ maps to $\vec{v_{1}} \dots \vec{v}_{n-m} \mapsto \vec{0}$ for those basis vectors. 

We know for an associated matrix $T$, that the first columns of the matrix are $T(\vec{v}_{1})\dots T(\vec{v}_{n-m})$. Since we just discussed what the map would be, there would all be equal to $\vec{0}$. 

### (3)
To calculate the matrix for the transform, we simply have to apply the transform to each of the standard basis vectors. 

Let $F:= S_{m} \circ T \circ T_{n} : \mathbb{R}^n \to \mathbb{R}^m$.

For $1 \leq i \leq n-m$, $F(e_{i}) = S_{m}(T(T_{n}(e_{i}))) = S_{m}(T(v_{i})) = \vec{0}$. 

Then, for the values that are not in the kernel of $T$, for $j=1,\dots,m$, that: $F(e_{n-m+j}) = S_{m}(T(T_{n}(e_{n-m+j}))) = S_{m}(T(v_{n-m+j})) = S_{m}(c_{j}) = e_{j}$. So, we just get the standard basis vectors again. 

Putting these columns together, we get a a matrix such that $[0_{m \times (n-m)}|I_{m}]$. Therefore, this shows that the form of the matrix is as such.

## Problem 3
![[image-49.webp|432x35]]
### 1.3.2
![[image-52.webp]]
a. $3 \times 2$
b. $3 \times 3$
c. $2 \times 4$
d. $1 \times 4$

### 1.3.4
![[image-53.webp]]
a. $\begin{bmatrix} 2  & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$
b. $\begin{bmatrix}0 & 1 & 0 \\ 1 & 2 & 0 \\ 1 & 0 & 1\end{bmatrix}$
### 1.3.10
![[image-54.webp|493x118]]
Off the bat, we know that the first column of the matrix is $\begin{bmatrix}1 \\ 0 \\ 0\end{bmatrix}$. So we are left with the matrix: $\begin{bmatrix}1 & b & c \\ 0 & f & g \\ 0 & i & j\end{bmatrix}$. We can multiply this with $\begin{bmatrix}1 \\ 1 \\ 0\end{bmatrix}$ to get $\begin{bmatrix}b+1 \\ f \\ i\end{bmatrix} = \begin{bmatrix}4  \\ 2 \\ 2\end{bmatrix}$. This gets us the the second column is $\begin{bmatrix}3 \\ 2 \\ 2\end{bmatrix}$. Finally, we have to multiply $\begin{bmatrix}1 & 3 & c \\ 0 & 2 & g \\ 0 & 2 & j\end{bmatrix}$ with $\begin{bmatrix}1 \\ 1 \\ 1\end{bmatrix}$ and we get that $\begin{bmatrix}c+4 \\ g+2 \\ j+2\end{bmatrix} = \begin{bmatrix}2 \\ 3 \\ 3\end{bmatrix}$. So from this, we can conclude that our full matrix is:
$$
T : \begin{bmatrix}
1 & 3 & 2 \\
0 & 2 & 1 \\
0 & 2 & 1
\end{bmatrix}
$$
### 1.3.20
![[image-55.webp|631x358]]
a. This linear transformation is the same as selecting the first entry. This would be equal to the matrix $\begin{bmatrix}1 & 0 \\ 0 & 0\end{bmatrix}$
b. This would be the same as selecting the second entry, so this would be similar to $\begin{bmatrix}0 & 0 \\ 0 & 1\end{bmatrix}$
c. This transform would make the second entry negative. So, this would $\begin{bmatrix}1 & 0 \\ 0 & -1\end{bmatrix}$
d. This transform would be the same as $\begin{bmatrix}u & -v \\ v & u\end{bmatrix}$. This is because complex number multiplication is analogous to rotation as well as scaling by $w$.