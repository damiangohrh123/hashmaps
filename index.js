class HashMap{
  constructor(initialCapacity = 3) {
    this.bucket = new Array(initialCapacity);
    this.arrayOfExistingNodes = [];
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
    const node = this.bucket[hashCode].find(key);

    // If node exists, return the value, else return null
    return node ? node.value : null
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

    } else {
      return false;
    }
  }

  length() {

  }

  clear() {

  }

  keys() {

  }

  values() {

  }

  entries() {

  }

  growBucket(){
    let loadFactor = 0.75;
    let filledIndexes = this.bucket.reduce((count, node) => (node.head !== null ? count + 1 : count), 0);

    if (filledIndexes / this.bucket.length >= loadFactor) {
      // Save existing nodes to arrayOfExistingNodes
      for (const node of this.bucket) {
        if (node.head !== null){
          this.arrayOfExistingNodes.push(node.head);
        }
      }

      // Create a new bucket double in size. Then create linked lists.
      this.bucket = new Array(this.bucket.length * 2);
      this.createLists();
      
      // Repopulate the new bucket
      this.arrayOfExistingNodes.forEach(node => this.set(node.key, node.value));
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

  remove(key) {
    // If list is empty, return
    if (!this.head) {
      return;
    }

    // If the node to be deleted is the head node
    if (this.head.key === key) {
      this.head = this.head.next;
      return
    }

    // Traverse the list to find the node before the one to be deleted
    let prev = this.head;
    let current = this.head.next;
    while (current !== null) {
      if (current.key === key) {
        prev.next = current.next;
        return
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
  {key: "Sam", value: "SamV"}
];

keyValuePaires.forEach(element => hashMap.set(element.key, element.value));

/** Tests */
console.log(hashMap.get("Carlos"));
console.log(hashMap.has("Sam"));

console.log(hashMap);