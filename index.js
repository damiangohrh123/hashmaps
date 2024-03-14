class HashMap{
  constructor(initialCapacity = 6) {
    this.initialCapacity = initialCapacity;
    this.bucket = new Array(initialCapacity);
    this.arrayOfExistingLinkedLists = [];
    this.createLists();
  }

  // Create linked lists in each bucket index
  createLists() {
    for (let i = 0; i < this.bucket.length; i++) {
      this.bucket[i] = new linkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    // Prime number for hashing algorithm (31 is widely used)
    const primeNumber = 31;

    // Calculate hashCode using ACSII
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.bucket.length;
    }
    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    // Get the node (Check if it exists in bucket)
    const node = this.get(key);

    // If it exists, rewrite the value. Else, apend a new node. (Collision handling)
    node ? node.value = value : this.bucket[hashCode].append(key, value);

    this.growBucket();
  }

  get(key) {
    const hashCode = this.hash(key);

    // Check if node exits in bucket
    return this.bucket[hashCode].find(key);
  }

  has(key) {
    const hashCode = this.hash(key);

    // Check if node exits in bucket
    const node = this.bucket[hashCode].find(key);

    // If node exists, return true, else return false
    return node ? true : false;
  }

  remove(key) {
    const hashCode = this.hash(key);

    // Get the node (Check if it exists in bucket)
    const node = this.get(key);

    if (node) {
      this.bucket[hashCode].removefromList(key);
      return true;
    } else {
      return false;
    }
  }

  length() {
    let storedKeys = 0;

    // Loop through buckets, then loop through linked lists and accumulate node count
    for (let i = 0; i < this.bucket.length; i++) {
      let currentNode = this.bucket[i].head;

      while (currentNode !== null) {
        storedKeys += 1;
        currentNode = currentNode.next;
      }
    }
    return storedKeys;
  }

  clear() {
    this.bucket = new Array(this.initialCapacity);
    this.arrayOfExistingLinkedLists = [];
    this.createLists();
  }

  keys() {
    let keys = [];

    // Loop through buckets, then loop through linked lists and push node keys into arrayOfExistingKeys
    for (let i = 0; i < this.bucket.length; i++) {
      let currentNode = this.bucket[i].head;

      while (currentNode !== null) {
        keys.push(currentNode.key);
        currentNode = currentNode.next;
      }
    }
    return keys;
  }

  values() {
    let values = [];

    // Loop through buckets, then loop through linked lists and push node keys into arrayOfExistingKeys
    for (let i = 0; i < this.bucket.length; i++) {
      let currentNode = this.bucket[i].head;

      while (currentNode !== null) {
        values.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }
    return values;
  }

  entries() {
    let entries = [];

    // Loop through buckets, then loop through linked lists and push node keys into arrayOfExistingKeys
    for (let i = 0; i < this.bucket.length; i++) {
      let currentNode = this.bucket[i].head;

      while (currentNode !== null) {
        entries.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.next;
      }
    }
    return entries;
  }

  growBucket(){
    let loadFactor = 0.75;
    let filledIndexes = this.bucket.reduce((count, node) => (node.head !== null ? count + 1 : count), 0);

    if (filledIndexes / this.bucket.length >= loadFactor) {
      // Save existing nodes to arrayOfExistingNodes
      for (const list of this.bucket) {
        if (list.head !== null){
          this.arrayOfExistingLinkedLists.push(list.head);
        }
      }

      // Create a new bucket double in size. Then create linked lists.
      this.bucket = new Array(this.bucket.length * 2);
      this.createLists();
      
      // Repopulate the new bucket
      this.arrayOfExistingLinkedLists.forEach(node => this.set(node.key, node.value));
      console.log("Bucket grew");
    }
  }
}

class Node{
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class linkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);

    // If list is empty, create newNode as head
    if (!this.head) {
      this.head = newNode;
      return;
    }

    // Get to the end of the linked list, then create newNode
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  find(key) {
    let current = this.head;
    while (current) {
      if (current.key === key) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  removefromList(key) {
    // If the node to be deleted is the head node
    if (this.head.key === key) {
      this.head = this.head.next;
      return;
    }

    // Traverse the list to find the node before the one to be deleted
    let prev = this.head;
    let current = this.head.next;
    while (current !== null) {
      if (current.key === key) {
        prev.next = current.next;
        return;
      }
      prev = current;
      current = current.next;
    }
  }
}

const hashMap = new HashMap();

const keyValuePaires = [
  {key: "Carlos", value: "CarlosV"},
  {key: "Carlas", value: "CarlasV"},
  {key: "Dexter", value: "DexterV"},
  {key: "Sam", value: "SamV"},
  {key: "Sams", value: "SamV"},
  {key: "Sama", value: "SamV"},
];

keyValuePaires.forEach(element => hashMap.set(element.key, element.value));
console.log(hashMap);

// Tests
// Getting and setting
console.log(hashMap.get("Carlos"));
console.log(hashMap.has("Sam"));

// Removing
console.log("Before removal:", hashMap);
console.log("Removal result:", hashMap.remove("Carlos"));
console.log("After removal:", hashMap);

// Length
console.log(hashMap.length());

// Clear
hashMap.clear();
console.log(hashMap);

// Keys, values and entries
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());



