class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
		} else {
			console.log("Can't append child");
		}
	}

	
	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error("Can't append child");
		}
	}
		
	remove() {
		if (this.parent === null) {
			console.log("Remove Error: This node has no parent");
		} else {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent === null) {
			console.log("Swap Error: This node has no parent");
		} else {
			let rootNode = this.parent.parent;
			let parentNode = this.parent;
			let mainNode = this;
			
			if (rootNode !== null) {
				rootNode.removeChild(parentNode);
			}

			parentNode.removeChild(mainNode);
			
			let mainLeft = mainNode.left;
			let mainRight = mainNode.right;
			let parentLeft = parentNode.left;
			let parentRight = parentNode.right;

			mainNode.left = parentLeft;
			mainNode.right = parentRight;
			parentNode.left = mainLeft;
			parentNode.right = mainRight;

			if (mainNode.left !== null) {
				mainNode.left.parent = mainNode;
			}

			if (mainNode.right !== null) {
				mainNode.right.parent = mainNode;
			}

			if (parentNode.left !== null) {
				parentNode.left.parent = parentNode;
			}

			if (parentNode.right !== null) {
				parentNode.right.parent = parentNode;
			}

			if (rootNode !== null) {
				rootNode.appendChild(mainNode);
			}

			mainNode.appendChild(parentNode);
		}
	}

}

module.exports = Node;
