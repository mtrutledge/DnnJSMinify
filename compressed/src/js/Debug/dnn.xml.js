Type.registerNamespace("dnn.xml"),dnn.extend(dnn.xml,{pns:"dnn",ns:"xml",parserName:null,get_parserName:function(){return null==this.parserName&&(this.parserName=this._getParser()),this.parserName},createDocument:function(){if("MSXML"==dnn.xml.get_parserName()){var o=new ActiveXObject("MSXML.DOMDocument");return o.async=!1,new dnn.xml.documentObject(o)}return"DOMParser"==dnn.xml.get_parserName()?new dnn.xml.documentObject(document.implementation.createDocument("","",null)):new dnn.xml.documentObject(new dnn.xml.JsDocument)},init:function(){function __dnn_getNodeXml(){var oXmlSerializer=new XMLSerializer,sXml=oXmlSerializer.serializeToString(this);return sXml}"DOMParser"==this.get_parserName()&&Node.prototype.__defineGetter__("xml",__dnn_getNodeXml)},_getParser:function(){return dnn.dom.browser.isType(dnn.dom.browser.InternetExplorer)?"MSXML":dnn.dom.browser.isType(dnn.dom.browser.Netscape,dnn.dom.browser.Mozilla)?"DOMParser":"JS"}}),dnn.xml.documentObject=function(oDoc){this._doc=oDoc},dnn.xml.documentObject.prototype={getXml:function(){return"MSXML"==dnn.xml.get_parserName()?this._doc.xml:"DOMParser"==dnn.xml.get_parserName()?this._doc.xml:this._doc.getXml()},loadXml:function(sXml){if("MSXML"==dnn.xml.get_parserName())return this._doc.loadXML(sXml);if("DOMParser"!=dnn.xml.get_parserName())return this._doc.loadXml(sXml);for(var oDoc=(new DOMParser).parseFromString(sXml,"text/xml");this._doc.hasChildNodes();)this._doc.removeChild(this._doc.lastChild);for(var i=0;i<oDoc.childNodes.length;i++)this._doc.appendChild(this._doc.importNode(oDoc.childNodes[i],!0))},childNodes:function(iIndex){if(null!=this._doc.childNodes[iIndex])return new dnn.xml.XmlNode(this._doc.childNodes[iIndex])},findNode:function(sNodeName,sAttr,sValue){return this.childNodes(0).findNode(sNodeName,sAttr,sValue)},childNodeCount:function(){return this._doc.childNodes.length},rootNode:function(){for(var oNode,i=0;i<this.childNodeCount();i++)if(7!=this.childNodes(i).nodeType){oNode=this.childNodes(i);break}return oNode}},dnn.xml.documentObject.registerClass("dnn.xml.documentObject"),dnn.xml.XmlNode=function(oNode){this.node=oNode,this.ownerDocument=this.node.ownerDocument,this.nodeType=this.node.nodeType},dnn.xml.XmlNode.prototype={parentNode:function(){return null!=this.node.parentNode?new dnn.xml.XmlNode(this.node.parentNode):null},childNodes:function(iIndex){if(null!=this.node.childNodes[iIndex])return new dnn.xml.XmlNode(this.node.childNodes[iIndex])},childNodeCount:function(){return this.node.childNodes.length},nodeName:function(){return this.node.nodeName},getAttribute:function(sAttr,sDef){var sRet=this.node.getAttribute(sAttr);return null==sRet&&(sRet=sDef),sRet},setAttribute:function(sAttr,sVal){return null==sVal?this.node.removeAttribute(sAttr):this.node.setAttribute(sAttr,sVal)},getXml:function(){return null!=this.node.xml?this.node.xml:this.node.getXml()},getDocumentXml:function(){return null!=this.node.ownerDocument.xml?this.node.ownerDocument.xml:this.node.ownerDocument.getXml()},appendXml:function(sXml){var oDoc=dnn.xml.createDocument();oDoc.loadXml("<___temp>"+sXml+"</___temp>");for(var aNodes=new Array,i=0;i<oDoc.childNodes(0).childNodeCount();i++)aNodes[aNodes.length]=oDoc.childNodes(0).childNodes(i).node;for(var i=0;i<aNodes.length;i++)this.node.appendChild(aNodes[i]);return!0},getNodeIndex:function(sIDName){for(var oParent=this.parentNode(),sID=this.getAttribute(sIDName),i=0;i<oParent.childNodeCount();i++)if(oParent.childNodes(i).getAttribute(sIDName)==sID)return i;return-1},findNode:function(sNodeName,sAttr,sValue){var oNode,sXPath="//"+sNodeName+"[@"+sAttr+"='"+sValue+"']";if("undefined"!=typeof this.node.selectSingleNode)oNode=this.node.selectSingleNode(sXPath);else if("undefined"!=typeof this.node.ownerDocument.evaluate){var oNodeList=this.node.ownerDocument.evaluate(sXPath,this.node,null,0,null);null!=oNodeList&&(oNode=oNodeList.iterateNext())}else oNode=this.node.ownerDocument.findNode(this.node,sNodeName,sAttr,sValue);if(null!=oNode)return new dnn.xml.XmlNode(oNode)},removeChild:function(oNode){return this.node.removeChild(oNode.node)}},dnn.xml.XmlNode.registerClass("dnn.xml.XmlNode"),dnn.xml.init();