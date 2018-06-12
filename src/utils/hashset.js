const HASHSET_TABLESIZE = 100;

function hashCode(v) {
  return v[0] * 31 + v[1] * 41;
}

/**
 * A HashSet specifically made for two-element arrays.
 */
export default class HashSet {
  constructor() {
    this.table = [...Array(HASHSET_TABLESIZE)].map(() => []);
  }

  put(v) {
    if (!this.has(v)) {
      let index = hashCode(v) % HASHSET_TABLESIZE;
      this.table[index].push(v);
    }
  }

  has(v) {
    let index = hashCode(v) % HASHSET_TABLESIZE;
    let bucket = this.table[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === v[0] && bucket[i][1] === v[1]) {
        return true;
      }
    }

    return false;
  }

  copy() {
    let x = new HashSet();
    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table[i].length; j++) {
        // hashing is consistent, and tables aren't resized
        x.table[i].push(this.table[i][j]);
        // x.put(this.table[i][j]);
      }
    }
    return x;
  }
}
