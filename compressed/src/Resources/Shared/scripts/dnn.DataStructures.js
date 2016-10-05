"undefined"!=typeof dnn&&null!==dnn||(dnn={}),function($,window,document,undefined){"use strict";var NTree=this.NTree=function(data){this.data="undefined"==typeof data?null:data,this.children=[]};NTree.prototype={constructor:NTree,addChildNode:function(node){return this.children.push(node),this},addChildNodes:function(nodes){return this.children=this.children.concat(nodes),this},hasNode:function(node){return NTree.hasNode(this,node)},removeChildren:function(){for(var i=0,count=this.children.length;i<count;i++){var child=this.children[i];child&&child.removeChildren()}return this.children=[],this},getNumberOfChildren:function(recursive){var n=this.children.length;if(recursive)for(var i=0,count=this.children.length;i<count;i++){var child=this.children[i];child&&(n+=child.getNumberOfChildren(recursive))}return n},hasChildren:function(){return this.children&&this.children.length>0},inOrderTraverse:function(callback){return NTree.inOrderTraverse(this,callback)}},NTree.equals=function(one,another,nodeComparer){return one===another||"function"==typeof nodeComparer&&one&&another&&nodeComparer.call(this,one.data,another.data)},NTree.sort=function(root,comparer){if(root&&comparer){root.children.sort(comparer);for(var i=0,count=root.children.length;i<count;i++)NTree.sort(root.children[i],comparer)}},NTree.hasNode=function(root,node){if(!root||!node)return!1;if(root===node)return!0;for(var i=0,count=root.children.length;i<count;i++)if(NTree.hasNode(root.children[i],node))return!0;return!1},NTree.isEmpty=function(node){return!node||!(node.data||node.children&&0!==node.children.length)},NTree.inOrderTraverse=function(root,callback){if(!root)return!1;for(var node=root,stack=[],indexStack=[],index=0;;){for(;node;){if("function"==typeof callback&&callback.call(this,node,stack)){stack=[],indexStack=[];break}node.children.length>0?(stack.push(node),indexStack.push(0),node=node.children[0]):node=null}if(0===stack.length)break;node=stack.pop(),index=indexStack.pop(),node.children.length-1>index?(index+=1,stack.push(node),indexStack.push(index),node=node.children[index]):node=null}return!0},NTree.getPath=function(root,predicate){var path=[],callback=function(traversedNode,stack){return!("function"!=typeof predicate||!predicate.call(this,traversedNode.data))&&(path=stack.slice(0),path.push(traversedNode),!0)};return NTree.inOrderTraverse(root,callback),path};var Dictionary=this.Dictionary=function(elements){this._elements=elements||{},this.hasSpecialProto=!1,this.specialProto=undefined};Dictionary.prototype={constructor:Dictionary,has:function(key){return"__proto__"===key?this.hasSpecialProto:{}.hasOwnProperty.call(this._elements,key)},get:function(key){return"__proto__"===key?this.specialProto:this.has(key)?this._elements[key]:undefined},set:function(key,value){if(Object.isNullOrUndefined(key))throw"InvalidArgumentException {"+key+"},{"+value+"}";"__proto__"===key?(this.hasSpecialProto=!0,this.specialProto=value):this._elements[key]=value},remove:function(key){"__proto__"===key?(this.hasSpecialProto=!1,this.specialProto=undefined):delete this._elements[key]},clear:function(){this._elements=[]},keys:function(){var names=Object.getOwnPropertyNames(this._elements);return this.hasSpecialProto&&names.push("__proto__"),names},entries:function(){return this._elements}};var MinHeap=this.MinHeap=function(array,comparator){this.heap=array||[],this.compare=comparator||function(one,another){return one==another?0:one<another?-1:1},this._left=function(index){return 2*index+1},this._right=function(index){return 2*index+2},this._parent=function(index){return index>0?index-1>>1:-1},this._heapify=function(i){var smallest,lIdx=this._left(i),rIdx=this._right(i);if(smallest=lIdx<this.heap.length&&this.compare(this.heap[lIdx],this.heap[i])<0?lIdx:i,rIdx<this.heap.length&&this.compare(this.heap[rIdx],this.heap[smallest])<0&&(smallest=rIdx),i!=smallest){var temp=this.heap[smallest];this.heap[smallest]=this.heap[i],this.heap[i]=temp,this._heapify(smallest)}},this.siftUp=function(i){var p=this._parent(i);if(p>=0&&this.compare(this.heap[p],this.heap[i])>0){var temp=this.heap[p];this.heap[p]=this.heap[i],this.heap[i]=temp,this.siftUp(p)}},this.heapifyArray=function(){for(var i=Math.floor(this.heap.length/2)-1;i>=0;i--)this._heapify(i)},null!=array&&this.heapifyArray()};MinHeap.prototype.push=function(item){this.heap.push(item),this.siftUp(this.heap.length-1)},MinHeap.prototype.insert=function(item){this.push(item)},MinHeap.prototype.pop=function(){var value;return this.heap.length>1?(value=this.heap[0],this.heap[0]=this.heap.pop(),this._heapify(0)):value=this.heap.pop(),value},MinHeap.prototype.remove=function(){return this.pop()},MinHeap.prototype.getMin=function(){return this.heap[0]},MinHeap.prototype.size=function(){return this.heap.length}}.apply(dnn,[jQuery,window,document]);