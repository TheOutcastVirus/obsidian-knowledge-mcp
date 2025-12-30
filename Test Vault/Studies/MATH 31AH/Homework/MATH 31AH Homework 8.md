---
Created: 2025-12-12
Type: Zettel
aliases:
References:
Links:
tags:
  - MATH31AH
---
## Problem I


$$
v_1=\begin{pmatrix}1\\2\\0\\0\end{pmatrix},\quad  
v_2=\begin{pmatrix}1\\0\\-1\\0\end{pmatrix},\quad
v_3=\begin{pmatrix}4\\3\\2\\1\end{pmatrix}.
$$

$$
u_1 = v_1,\qquad 
\|u_1\| = \sqrt{1^2 + 2^2} = \sqrt{5}.
$$

$$
e_1 = \frac{u_1}{\|u_1\|} 
= \frac{1}{\sqrt{5}}
\begin{pmatrix}1\\2\\0\\0\end{pmatrix}.
$$

$$
u_2 
= v_2 - \frac{v_2\cdot u_1}{u_1\cdot u_1} u_1
= \begin{pmatrix}1\\0\\-1\\0\end{pmatrix}
- \frac{1}{5}\begin{pmatrix}1\\2\\0\\0\end{pmatrix}
= \begin{pmatrix}\tfrac{4}{5}\\[4pt]-\tfrac{2}{5}\\[4pt]-1\\[4pt]0\end{pmatrix}.
$$

$$
\|u_2\|^2 = \frac{16}{25} + \frac{4}{25} + 1 = \frac{9}{5}
\quad\Rightarrow\quad
\|u_2\| = \frac{3}{\sqrt{5}}.
$$
$$
e_2 
= \frac{u_2}{\|u_2\|}
= \frac{\sqrt{5}}{3}
\begin{pmatrix}\tfrac{4}{5}\\[4pt]-\tfrac{2}{5}\\[4pt]-1\\[4pt]0\end{pmatrix}
=
\begin{pmatrix}
\frac{4\sqrt{5}}{15}\\[4pt]
-\frac{2\sqrt{5}}{15}\\[4pt]
-\frac{\sqrt{5}}{3}\\[4pt]
0
\end{pmatrix}.
$$

$$
v_3 - \text{proj}_{u_1}(v_3)
= \begin{pmatrix}4\\3\\2\\1\end{pmatrix}
- \frac{14}{5}\begin{pmatrix}1\\2\\0\\0\end{pmatrix}
= \begin{pmatrix}2\\-1\\2\\1\end{pmatrix}.
$$


$$
u_3 = \begin{pmatrix}2\\-1\\2\\1\end{pmatrix},\qquad
\|u_3\| = \sqrt{10}.
$$
$$
e_3 = \frac{1}{\sqrt{10}}
\begin{pmatrix}2\\-1\\2\\1\end{pmatrix}.
$$

$$

e_1=\frac{1}{\sqrt5}\begin{pmatrix}1\\2\\0\\0\end{pmatrix},
\quad
e_2=\begin{pmatrix}
\frac{4\sqrt5}{15}\\[4pt]
-\frac{2\sqrt5}{15}\\[4pt]
-\frac{\sqrt5}{3}\\[4pt]
0
\end{pmatrix},
\quad
e_3=\frac{1}{\sqrt{10}}
\begin{pmatrix}2\\-1\\2\\1\end{pmatrix}

$$
