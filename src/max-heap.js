const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (!this.isEmpty()) {
			return this.detachRoot().data;
		} 
	}

	detachRoot() {
		if (this.root === this.parentNodes[0]) {
			this.root = null;
			return this.parentNodes.shift();
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length) {
			let last = this.parentNodes.pop();
		}
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		return this.size() === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);

			if (this.parentNodes[0].left != null && this.parentNodes[0].right != null) {
				this.parentNodes.shift();
			}
		}
		
		
			
		
	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			this.root = node;
		} else if (node.priority > node.parent.priority) {
				let nodeIdx = this.parentNodes.indexOf(node);
				let parentIdx = this.parentNodes.indexOf(node.parent);
				if (nodeIdx != -1) this.parentNodes[nodeIdx] = node.parent;
				if (parentIdx != -1) this.parentNodes[parentIdx] = node;
				
				node.swapWithParent();
				return this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node.left === null && node.right === null) {
			return;
		} else if (node.right === null) {
			if (node !== null && node.priority < node.left.priority){
				let nodeIdx = this.parentNodes.indexOf(node);
				let nodeLeftIdx = this.parentNodes.indexOf(node.left);
				if (nodeIdx != -1) this.parentNodes[nodeIdx] = node.left;
				if (nodeLeftIdx != 1) this.parentNodes[nodeLeftIdx] = node;

				node.left.swapWithParent();
				return this.shiftNodeDown();
			}

		} else if (node.left === null) {
			if (node !== null && node.priority < node.right.priority) {
				let nodeIdx = this.parentNodes.indexOf(node);
				let nodeRightIdx = this.parentNodes.indexOf(node.right);
				if (nodeIdx != -1) this.parentNodes[nodeIdx] = node.right;
				if (nodeRightIdx != 1) this.parentNodes[nodeRightIdx] = node;

				node.right.swapWithParent();
				return this.shiftNodeDown();
			}
		} else {
			let child = (node.left.priority > node.right.priority) ? node.left : node.right;
			if (node !== null && node.priority < child){
				let nodeIdx = this.parentNodes.indexOf(node);
				let childIdx = this.parentNodes.indexOf(child);
				if (nodeIdx != -1) this.parentNodes[nodeIdx] = child;
				if (childIdx != 1) this.parentNodes[nodeLeftIdx] = node;

				child.swapWithParent();
				return this.shiftNodeDown();
			} 
		}
	}
}

module.exports = MaxHeap;