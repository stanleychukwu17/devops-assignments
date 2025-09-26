
## 🔧 `flex: <flex-grow> <flex-shrink> <flex-basis>`

This is a shorthand for these three properties:

| Property      | What it does                                                                    |
| ------------- | ------------------------------------------------------------------------------- |
| `flex-grow`   | How much the item **grows** relative to it's siblings. **Default**: `0` (won’t grow)               |
| `flex-shrink` | How much the item **shrinks** relative to it's siblings when there's not enough space. **Default**: `1` (can shrink) |
| `flex-basis`  | The **initial size** of the item before `grow` and `shrink` are applied.        |

---

## 📘 1. `flex-grow`
```css
.item {
  flex-grow: 1;
}
```

If you have three items in a flex container and each has `flex-grow: 1`, they all grow **equally** to fill the available space.

If one has `flex-grow: 2`, it grows **twice as much** as the others.

---

## 📘 2. `flex-shrink`
```css
.item {
  flex-shrink: 1;
}
```

If there's not enough room, all items shrink equally. If one item has `flex-shrink: 0`, it **won’t shrink at all**, possibly causing overflow. <br>
But if one item has `flex-shrink: 2`, it will shrink double the rate of it's sibilings

---

## 📘 3. `flex-basis`

* **Type**: Any valid CSS length (`px`, `%`, `auto`, etc.)
* **Default**: `auto` (size based on content)
* **What it does**: Sets the **initial size** of the item **before** grow or shrink is applied.

### Example:

```css
.item {
  flex-basis: 200px;
}
```

This item starts at 200px wide, and then can grow or shrink based on `flex-grow` and `flex-shrink`.

---

## 🧪 Combined `flex` Shorthand Examples

| Shorthand         | Meaning                                             |
| ----------------- | --------------------------------------------------- |
| `flex: 0 1 auto`  | Default: no grow, can shrink, size based on content |
| `flex: 1 1 auto`  | Can grow and shrink, initial size from content      |
| `flex: 1 0 200px` | Will grow, won’t shrink, starts at 200px            |
| `flex: 0 0 100px` | won't grow, won’t shrink, starts at 100px           |

---