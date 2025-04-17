D3.js (Data-Driven Documents) has a variety of built-in layouts that help with visualizing complex data structures by transforming data into visual-friendly formats. While some of the older layouts were split into separate modules in D3 v4+, here are some **common D3 layouts** (and corresponding modules, where applicable):

---

### 📊 **Hierarchical Layouts**

1. **Tree Layout (`d3.tree`)**
   - Visualizes hierarchical data as a tree with nodes and links.
   - Good for organizational charts, family trees, etc.

2. **Cluster Layout (`d3.cluster`)**
   - Similar to a tree but optimized for compact space.
   - Nodes are grouped more tightly than in a tree.

3. **Pack Layout (`d3.pack`)**
   - Shows hierarchy using nested circles.
   - Often used for bubble charts and visualizing proportions.

4. **Partition Layout (`d3.partition`)**
   - Splits space into rectangles to show hierarchical structure.
   - Often used with sunburst or icicle charts.

5. **Treemap Layout (`d3.treemap`)**
   - Visualizes hierarchical data as nested rectangles.
   - Excellent for showing part-to-whole relationships.

---

### 🔄 **Network Layouts**

6. **Force Layout (`d3.forceSimulation`)**
   - For force-directed graphs or network diagrams.
   - Nodes repel each other and links act like springs.

---

### 🔁 **Sequential or Circular Layouts**

7. **Chord Layout (`d3.chord`)**
   - Shows relationships between groups using arcs and ribbons.
   - Useful for flow diagrams between categories.

8. **Pie Layout (`d3.pie`)**
   - Converts data into angles for pie or donut charts.

9. **Stack Layout (`d3.stack`)**
   - For stacked area or bar charts.
   - Helps build cumulative series plots.

---

### 🌀 Other Specialized Layouts

10. **Sankey Layout** (via `d3-sankey` plugin)
    - For flow diagrams (e.g., energy transfers, money flows).
    - Nodes have width, and links have flow weight.

---

Want a demo or example code for any of these?