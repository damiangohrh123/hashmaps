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
    // Calculate hashcode
    let hashCode = this.hash(key);

    // Check if the key already exists.
    const nodeExists = this.bucket[hashCode].find(key);

    // If it exists, rewrite the value. Else, apend a new node. (Collision handling)
    nodeExists ? nodeExists.value = value : this.bucket[hashCode].append(key, value);

    this.growBucket();
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

  get(key) {
    // Calculate hashcode
    let hashCode = this.hash(key);

    // Check if node exits
    
  }

  has(key) {

  }

  remove(key) {

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

    // If head is null, create newNode as head
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

  // Find the node using the key's name, then return node
  find(keyName) {
    let current = this.head;
    while (current) {
      if (current.key === keyName) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
}

const hashMap = new HashMap();

const keyValuePaires = [
  {key: "Carlos", value: "old"},
  {key: "Carlas", value: "old"},
  {key: "Dexter", value: "old"},
  {key: "Sam", value: "old"}
];

keyValuePaires.forEach(element => hashMap.set(element.key, element.value));

console.log(hashMap);