---
Created: 2025-10-24
Type: Task
aliases:
References:
Links:
tags:
  - MATH31AH
Status: DONE
Start date: 2025-10-24
Due date: 2025-10-29
Subtasks:
Priority:
---
## Problem I
### (1)
$\mathcal{P}(A) = \{ \{  \},\{ 1 \},\{ 2 \},\{ a \},\{ 1,2 \}, \{ 1,a \}, \{ 2,a \} \{ 1,2,a \} \}$

### (2)
An equivalence relation is a relation that is transitive, symmetric, and reflexive. 

## (3)
To show that relation $R$ on $\mathbb{R}^n$ as $vRw$ if and only if $v-w \in\ker T$, we need to show that it is transitive, symmetric, and reflexive. 

If $R$ is reflexive, that means that $vRv$ is true. $v-v=\vec{0}$, and for any linear transform, $T(\vec{0}) = \vec{0}$. This means that for all $v \in \mathbb{R}^n$, $v-v \in \ker T$. 

To should that a transform is symmetric, we need to prove that if $vRw$, that $wRv$ is true. If $v-w \in \ker T$, that means that $T(v-w) = \vec{0}$. We need to see if $T(w-v) = \vec{0}$.  We can expand to $T(v) - T(w) = \vec{0}$. Moving terms, we get that $T(v) = T(w)$. Doing the same with $T(w-v) = \vec{0}$, we get that $T(w) - T(v) = \vec{0}$, and that $T(w)=T(v)$, proving that this property is symmetric.

### (4)


