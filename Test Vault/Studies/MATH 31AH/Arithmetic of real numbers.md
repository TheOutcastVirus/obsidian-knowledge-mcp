---
Created: 2025-09-28
Type: Zettel
aliases:
References:
Links:
  - "[[Real numbers]]"
tags:
  - MATH31AH
---
> Note: I took notes on this topic by accident when I read the wrong section of the textbook for the reading. 
- We have to define addition, multiplication, subtraction, and division for the real numbers
	- Addition and multiplication start at the right side and there is no right side for real numbers
	- The idea is that we have to truncate the numbers further and further to the right, perform an operation (addition, multiplication, subtraction, etc)
		- You then look at the numbers to the left of any fixed position, and see that they don't change
	- However, this isn't quite true always
- Consider adding $.22222\dots 222\dots$  and $.77777\dots778\dots$
	- The result would be either $1.0000\dots 0$ or $0.9999\dots 9$ depending on where you truncate the decimal
- Let us denote $\mathbb{D}$ as the set of finite decimals
> **Definition 0.4.4 (Finite decimal continuity).** A mapping of $f :\mathbb{D}^n \to \mathbb{D}$ will be called finite decimal continuous ($\mathbb{D}$-continuous) if for all integers $N$ and $k$, there exists $l$ such that if $(x_{1},\dots,x_{n})$ and $(y_{1},\dots,y_{n})$ are two elements of $\mathbb{D}^n$ with all $|x_{i}|,|y_{i}|<N$and if $|x_{i}-y_{i}|<10^{l}$ for all $i=1,\dots n$, then $$
|f(x_{1},\dots,x_{n})-f(y_{1},\dots,y_{n})| < 10^{-k}
$$
- This definition is saying that given two sets of $n$ dimensional coordinates that have finite decimals, the function is continuous if the inputs are close ($|x_{i}-y_{i}|<10^{l}$), the outputs are also close ($|f(x_{1},\dots,x_{n})-f(y_{1},\dots,y_{n})| < 10^{-k}$) 
	- However, this does not make sense without defining what close is
> **Definition 0.4.5 (k-close).** Two points $x,y \in \mathbb{R}^n$ are $k$-close if for each $i=0,\dots,n$, then $|[x_{i}]_{k}-[y_{i}]_{k}|\leq 10^{-k}$
- Note here that $[x_{i}]_{k}$ is the $i$th element of point $x$ truncated to the $k$th decimal 
- For example, two numbers that are 2-close would have the 1st decimal place be identical, and the 2nd one differ
	- If two numbers are $k$-close for all $k$, they are equal
- If $f : \mathbb{D}^n \to \mathbb{D}$ is $\mathbb{D}$-continuous, then define $\tilde{f} : \mathbb{R}^n \to \mathbb{R}$ with 
	- $$
	\tilde{f}(x) = \sup_{k} \inf_{l \geq k} f([x_{1}]_{l},\dots,[x_{n}]_{l})
	$$
- How I see this definition is that as you go through higher values of $l$, the 'resolution' of the function increases (as you use more decimal places)
	- The infimum is the greats lower bound of a set, and the supremum is the least upper bound, so you are essentially bounding the function to make it continuous on the reals.
> **Proposition 0.4.06.** The function $\tilde{f}:\mathbb{R}^n\to \mathbb{R}$ is the unique function that coincides with $f$ on $\mathbb{D}^n$ and which satisfies that the continuity condition for all $k \in \mathbb{N}$, for all $N \in \mathbb{N}$, there exists $l \in \mathbb{N}$ such that when $\mathbf{x,y}\in \mathbb{R}^n$ are $l$-close and all coordinates $x_{i}$ of $\mathbf{x}$ satisfy $|x_{i}|<N$, then $\tilde{f}(x)$ and $\tilde{f}(y)$ are $k$-close.
- Somehow this proposition helps use set up the arithmetic for reals 
	- We can prove that addition is commutative, associative, etc. 
	- Basically, whatever we can do for finite decimals, we can approximate it with reals and prove that it will be continuous
