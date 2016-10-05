!function(factory){"function"==typeof require&&"object"==typeof exports&&"object"==typeof module?factory(require("knockout"),exports):"function"==typeof define&&define.amd?define(["knockout","exports"],factory):factory(ko,ko.mapping={})}(function(ko,exports){function unionArrays(x,y){for(var obj={},i=x.length-1;i>=0;--i)obj[x[i]]=x[i];for(var i=y.length-1;i>=0;--i)obj[y[i]]=y[i];var res=[];for(var k in obj)res.push(obj[k]);return res}function extendObject(destination,source){var destType;for(var key in source)if(source.hasOwnProperty(key)&&source[key])if(destType=exports.getType(destination[key]),key&&destination[key]&&"array"!==destType&&"string"!==destType)extendObject(destination[key],source[key]);else{var bothArrays="array"===exports.getType(destination[key])&&"array"===exports.getType(source[key]);bothArrays?destination[key]=unionArrays(destination[key],source[key]):destination[key]=source[key]}}function merge(obj1,obj2){var merged={};return extendObject(merged,obj1),extendObject(merged,obj2),merged}function fillOptions(rawOptions,otherOptions){for(var options=merge({},rawOptions),i=recognizedRootProperties.length-1;i>=0;i--){var property=recognizedRootProperties[i];options[property]&&(options[""]instanceof Object||(options[""]={}),options[""][property]=options[property],delete options[property])}return otherOptions&&(options.ignore=mergeArrays(otherOptions.ignore,options.ignore),options.include=mergeArrays(otherOptions.include,options.include),options.copy=mergeArrays(otherOptions.copy,options.copy),options.observe=mergeArrays(otherOptions.observe,options.observe)),options.ignore=mergeArrays(options.ignore,defaultOptions.ignore),options.include=mergeArrays(options.include,defaultOptions.include),options.copy=mergeArrays(options.copy,defaultOptions.copy),options.observe=mergeArrays(options.observe,defaultOptions.observe),options.mappedProperties=options.mappedProperties||{},options.copiedProperties=options.copiedProperties||{},options}function mergeArrays(a,b){return"array"!==exports.getType(a)&&(a="undefined"===exports.getType(a)?[]:[a]),"array"!==exports.getType(b)&&(b="undefined"===exports.getType(b)?[]:[b]),ko.utils.arrayGetDistinctValues(a.concat(b))}function withProxyDependentObservable(dependentObservables,callback){var localDO=ko.dependentObservable;ko.dependentObservable=function(read,owner,options){options=options||{},read&&"object"==typeof read&&(options=read);var realDeferEvaluation=options.deferEvaluation,isRemoved=!1,wrap=function(DO){var tmp=ko.dependentObservable;ko.dependentObservable=realKoDependentObservable;var isWriteable=ko.isWriteableObservable(DO);ko.dependentObservable=tmp;var wrapped=realKoDependentObservable({read:function(){return isRemoved||(ko.utils.arrayRemoveItem(dependentObservables,DO),isRemoved=!0),DO.apply(DO,arguments)},write:isWriteable&&function(val){return DO(val)},deferEvaluation:!0});return DEBUG&&(wrapped._wrapper=!0),wrapped.__DO=DO,wrapped};options.deferEvaluation=!0;var realDependentObservable=new realKoDependentObservable(read,owner,options);return realDeferEvaluation||(realDependentObservable=wrap(realDependentObservable),dependentObservables.push(realDependentObservable)),realDependentObservable},ko.dependentObservable.fn=realKoDependentObservable.fn,ko.computed=ko.dependentObservable;var result=callback();return ko.dependentObservable=localDO,ko.computed=ko.dependentObservable,result}function updateViewModel(mappedRootObject,rootObject,options,parentName,parent,parentPropertyName,mappedParent){var isArray="array"===exports.getType(ko.utils.unwrapObservable(rootObject));if(parentPropertyName=parentPropertyName||"",exports.isMapped(mappedRootObject)){var previousMapping=ko.utils.unwrapObservable(mappedRootObject)[mappingProperty];options=merge(previousMapping,options)}var callbackParams={data:rootObject,parent:mappedParent||parent},hasCreateCallback=function(){return options[parentName]&&options[parentName].create instanceof Function},createCallback=function(data){return withProxyDependentObservable(dependentObservables,function(){return ko.utils.unwrapObservable(parent)instanceof Array?options[parentName].create({data:data||callbackParams.data,parent:callbackParams.parent,skip:emptyReturn}):options[parentName].create({data:data||callbackParams.data,parent:callbackParams.parent})})},hasUpdateCallback=function(){return options[parentName]&&options[parentName].update instanceof Function},updateCallback=function(obj,data){var params={data:data||callbackParams.data,parent:callbackParams.parent,target:ko.utils.unwrapObservable(obj)};return ko.isWriteableObservable(obj)&&(params.observable=obj),options[parentName].update(params)},alreadyMapped=visitedObjects.get(rootObject);if(alreadyMapped)return alreadyMapped;if(parentName=parentName||"",isArray){var changes=[],hasKeyCallback=!1,keyCallback=function(x){return x};options[parentName]&&options[parentName].key&&(keyCallback=options[parentName].key,hasKeyCallback=!0),ko.isObservable(mappedRootObject)||(mappedRootObject=ko.observableArray([]),mappedRootObject.mappedRemove=function(valueOrPredicate){var predicate="function"==typeof valueOrPredicate?valueOrPredicate:function(value){return value===keyCallback(valueOrPredicate)};return mappedRootObject.remove(function(item){return predicate(keyCallback(item))})},mappedRootObject.mappedRemoveAll=function(arrayOfValues){var arrayOfKeys=filterArrayByKey(arrayOfValues,keyCallback);return mappedRootObject.remove(function(item){return ko.utils.arrayIndexOf(arrayOfKeys,keyCallback(item))!=-1})},mappedRootObject.mappedDestroy=function(valueOrPredicate){var predicate="function"==typeof valueOrPredicate?valueOrPredicate:function(value){return value===keyCallback(valueOrPredicate)};return mappedRootObject.destroy(function(item){return predicate(keyCallback(item))})},mappedRootObject.mappedDestroyAll=function(arrayOfValues){var arrayOfKeys=filterArrayByKey(arrayOfValues,keyCallback);return mappedRootObject.destroy(function(item){return ko.utils.arrayIndexOf(arrayOfKeys,keyCallback(item))!=-1})},mappedRootObject.mappedIndexOf=function(item){var keys=filterArrayByKey(mappedRootObject(),keyCallback),key=keyCallback(item);return ko.utils.arrayIndexOf(keys,key)},mappedRootObject.mappedGet=function(item){return mappedRootObject()[mappedRootObject.mappedIndexOf(item)]},mappedRootObject.mappedCreate=function(value){if(mappedRootObject.mappedIndexOf(value)!==-1)throw new Error("There already is an object with the key that you specified.");var item=hasCreateCallback()?createCallback(value):value;if(hasUpdateCallback()){var newValue=updateCallback(item,value);ko.isWriteableObservable(item)?item(newValue):item=newValue}return mappedRootObject.push(item),item});var currentArrayKeys=filterArrayByKey(ko.utils.unwrapObservable(mappedRootObject),keyCallback).sort(),newArrayKeys=filterArrayByKey(rootObject,keyCallback);hasKeyCallback&&newArrayKeys.sort();var i,j,editScript=ko.utils.compareArrays(currentArrayKeys,newArrayKeys),ignoreIndexOf={},unwrappedRootObject=ko.utils.unwrapObservable(rootObject),itemsByKey={},optimizedKeys=!0;for(i=0,j=unwrappedRootObject.length;i<j;i++){var key=keyCallback(unwrappedRootObject[i]);if(void 0===key||key instanceof Object){optimizedKeys=!1;break}itemsByKey[key]=unwrappedRootObject[i]}var newContents=[],passedOver=0;for(i=0,j=editScript.length;i<j;i++){var mappedItem,key=editScript[i],fullPropertyName=parentPropertyName+"["+i+"]";switch(key.status){case"added":var item=optimizedKeys?itemsByKey[key.value]:getItemByKey(ko.utils.unwrapObservable(rootObject),key.value,keyCallback);mappedItem=updateViewModel(void 0,item,options,parentName,mappedRootObject,fullPropertyName,parent),hasCreateCallback()||(mappedItem=ko.utils.unwrapObservable(mappedItem));var index=ignorableIndexOf(ko.utils.unwrapObservable(rootObject),item,ignoreIndexOf);mappedItem===emptyReturn?passedOver++:newContents[index-passedOver]=mappedItem,ignoreIndexOf[index]=!0;break;case"retained":var item=optimizedKeys?itemsByKey[key.value]:getItemByKey(ko.utils.unwrapObservable(rootObject),key.value,keyCallback);mappedItem=getItemByKey(mappedRootObject,key.value,keyCallback),updateViewModel(mappedItem,item,options,parentName,mappedRootObject,fullPropertyName,parent);var index=ignorableIndexOf(ko.utils.unwrapObservable(rootObject),item,ignoreIndexOf);newContents[index]=mappedItem,ignoreIndexOf[index]=!0;break;case"deleted":mappedItem=getItemByKey(mappedRootObject,key.value,keyCallback)}changes.push({event:key.status,item:mappedItem})}mappedRootObject(newContents),options[parentName]&&options[parentName].arrayChanged&&ko.utils.arrayForEach(changes,function(change){options[parentName].arrayChanged(change.event,change.item)})}else if(canHaveProperties(rootObject)){if(mappedRootObject=ko.utils.unwrapObservable(mappedRootObject),!mappedRootObject){if(hasCreateCallback()){var result=createCallback();return hasUpdateCallback()&&(result=updateCallback(result)),result}if(hasUpdateCallback())return updateCallback(result);mappedRootObject={}}if(hasUpdateCallback()&&(mappedRootObject=updateCallback(mappedRootObject)),visitedObjects.save(rootObject,mappedRootObject),hasUpdateCallback())return mappedRootObject;visitPropertiesOrArrayEntries(rootObject,function(indexer){var fullPropertyName=parentPropertyName.length?parentPropertyName+"."+indexer:indexer;if(ko.utils.arrayIndexOf(options.ignore,fullPropertyName)==-1){if(ko.utils.arrayIndexOf(options.copy,fullPropertyName)!=-1)return void(mappedRootObject[indexer]=rootObject[indexer]);if("object"!=typeof rootObject[indexer]&&"array"!=typeof rootObject[indexer]&&options.observe.length>0&&ko.utils.arrayIndexOf(options.observe,fullPropertyName)==-1)return mappedRootObject[indexer]=rootObject[indexer],void(options.copiedProperties[fullPropertyName]=!0);var prevMappedProperty=visitedObjects.get(rootObject[indexer]),retval=updateViewModel(mappedRootObject[indexer],rootObject[indexer],options,indexer,mappedRootObject,fullPropertyName,mappedRootObject),value=prevMappedProperty||retval;if(options.observe.length>0&&ko.utils.arrayIndexOf(options.observe,fullPropertyName)==-1)return mappedRootObject[indexer]=value(),void(options.copiedProperties[fullPropertyName]=!0);ko.isWriteableObservable(mappedRootObject[indexer])?(value=ko.utils.unwrapObservable(value),mappedRootObject[indexer]()!==value&&mappedRootObject[indexer](value)):(value=void 0===mappedRootObject[indexer]?value:ko.utils.unwrapObservable(value),mappedRootObject[indexer]=value),options.mappedProperties[fullPropertyName]=!0}})}else switch(exports.getType(rootObject)){case"function":hasUpdateCallback()?ko.isWriteableObservable(rootObject)?(rootObject(updateCallback(rootObject)),mappedRootObject=rootObject):mappedRootObject=updateCallback(rootObject):mappedRootObject=rootObject;break;default:if(ko.isWriteableObservable(mappedRootObject)){if(hasUpdateCallback()){var valueToWrite=updateCallback(mappedRootObject);return mappedRootObject(valueToWrite),valueToWrite}var valueToWrite=ko.utils.unwrapObservable(rootObject);return mappedRootObject(valueToWrite),valueToWrite}var hasCreateOrUpdateCallback=hasCreateCallback()||hasUpdateCallback();if(mappedRootObject=hasCreateCallback()?createCallback():ko.observable(ko.utils.unwrapObservable(rootObject)),hasUpdateCallback()&&mappedRootObject(updateCallback(mappedRootObject)),hasCreateOrUpdateCallback)return mappedRootObject}return mappedRootObject}function ignorableIndexOf(array,item,ignoreIndices){for(var i=0,j=array.length;i<j;i++)if(ignoreIndices[i]!==!0&&array[i]===item)return i;return null}function mapKey(item,callback){var mappedItem;return callback&&(mappedItem=callback(item)),"undefined"===exports.getType(mappedItem)&&(mappedItem=item),ko.utils.unwrapObservable(mappedItem)}function getItemByKey(array,key,callback){array=ko.utils.unwrapObservable(array);for(var i=0,j=array.length;i<j;i++){var item=array[i];if(mapKey(item,callback)===key)return item}throw new Error("When calling ko.update*, the key '"+key+"' was not found!")}function filterArrayByKey(array,callback){return ko.utils.arrayMap(ko.utils.unwrapObservable(array),function(item){return callback?mapKey(item,callback):item})}function visitPropertiesOrArrayEntries(rootObject,visitorCallback){if("array"===exports.getType(rootObject))for(var i=0;i<rootObject.length;i++)visitorCallback(i);else for(var propertyName in rootObject)visitorCallback(propertyName)}function canHaveProperties(object){var type=exports.getType(object);return("object"===type||"array"===type)&&null!==object}function getPropertyName(parentName,parent,indexer){var propertyName=parentName||"";return"array"===exports.getType(parent)?parentName&&(propertyName+="["+indexer+"]"):(parentName&&(propertyName+="."),propertyName+=indexer),propertyName}function simpleObjectLookup(){var keys=[],values=[];this.save=function(key,value){var existingIndex=ko.utils.arrayIndexOf(keys,key);existingIndex>=0?values[existingIndex]=value:(keys.push(key),values.push(value))},this.get=function(key){var existingIndex=ko.utils.arrayIndexOf(keys,key),value=existingIndex>=0?values[existingIndex]:void 0;return value}}function objectLookup(){var buckets={},findBucket=function(key){var bucketKey;try{bucketKey=key}catch(e){bucketKey="$$$"}var bucket=buckets[bucketKey];return void 0===bucket&&(bucket=new simpleObjectLookup,buckets[bucketKey]=bucket),bucket};this.save=function(key,value){findBucket(key).save(key,value)},this.get=function(key){return findBucket(key).get(key)}}var dependentObservables,visitedObjects,DEBUG=!0,mappingProperty="__ko_mapping__",realKoDependentObservable=ko.dependentObservable,mappingNesting=0,recognizedRootProperties=["create","update","key","arrayChanged"],emptyReturn={},_defaultOptions={include:["_destroy"],ignore:[],copy:[],observe:[]},defaultOptions=_defaultOptions;exports.isMapped=function(viewModel){var unwrapped=ko.utils.unwrapObservable(viewModel);return unwrapped&&unwrapped[mappingProperty]},exports.fromJS=function(jsObject){if(0==arguments.length)throw new Error("When calling ko.fromJS, pass the object you want to convert.");try{mappingNesting++||(dependentObservables=[],visitedObjects=new objectLookup);var options,target;2==arguments.length&&(arguments[1][mappingProperty]?target=arguments[1]:options=arguments[1]),3==arguments.length&&(options=arguments[1],target=arguments[2]),target&&(options=merge(options,target[mappingProperty])),options=fillOptions(options);var result=updateViewModel(target,jsObject,options);if(target&&(result=target),!--mappingNesting)for(;dependentObservables.length;){var DO=dependentObservables.pop();DO&&(DO(),DO.__DO.throttleEvaluation=DO.throttleEvaluation)}return result[mappingProperty]=merge(result[mappingProperty],options),result}catch(e){throw mappingNesting=0,e}},exports.fromJSON=function(jsonString){var parsed=ko.utils.parseJson(jsonString);return arguments[0]=parsed,exports.fromJS.apply(this,arguments)},exports.updateFromJS=function(viewModel){throw new Error("ko.mapping.updateFromJS, use ko.mapping.fromJS instead. Please note that the order of parameters is different!")},exports.updateFromJSON=function(viewModel){throw new Error("ko.mapping.updateFromJSON, use ko.mapping.fromJSON instead. Please note that the order of parameters is different!")},exports.toJS=function(rootObject,options){if(defaultOptions||exports.resetDefaultOptions(),0==arguments.length)throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");if("array"!==exports.getType(defaultOptions.ignore))throw new Error("ko.mapping.defaultOptions().ignore should be an array.");if("array"!==exports.getType(defaultOptions.include))throw new Error("ko.mapping.defaultOptions().include should be an array.");if("array"!==exports.getType(defaultOptions.copy))throw new Error("ko.mapping.defaultOptions().copy should be an array.");return options=fillOptions(options,rootObject[mappingProperty]),exports.visitModel(rootObject,function(x){return ko.utils.unwrapObservable(x)},options)},exports.toJSON=function(rootObject,options){var plainJavaScriptObject=exports.toJS(rootObject,options);return ko.utils.stringifyJson(plainJavaScriptObject)},exports.defaultOptions=function(){return arguments.length>0?void(defaultOptions=arguments[0]):defaultOptions},exports.resetDefaultOptions=function(){defaultOptions={include:_defaultOptions.include.slice(0),ignore:_defaultOptions.ignore.slice(0),copy:_defaultOptions.copy.slice(0)}},exports.getType=function(x){if(x&&"object"==typeof x){if(x.constructor===Date)return"date";if(x.constructor===Array)return"array"}return typeof x},exports.visitModel=function(rootObject,callback,options){options=options||{},options.visitedObjects=options.visitedObjects||new objectLookup;var mappedRootObject,unwrappedRootObject=ko.utils.unwrapObservable(rootObject);if(!canHaveProperties(unwrappedRootObject))return callback(rootObject,options.parentName);options=fillOptions(options,unwrappedRootObject[mappingProperty]),callback(rootObject,options.parentName),mappedRootObject="array"===exports.getType(unwrappedRootObject)?[]:{},options.visitedObjects.save(rootObject,mappedRootObject);var parentName=options.parentName;return visitPropertiesOrArrayEntries(unwrappedRootObject,function(indexer){if(!options.ignore||ko.utils.arrayIndexOf(options.ignore,indexer)==-1){var propertyValue=unwrappedRootObject[indexer];if(options.parentName=getPropertyName(parentName,unwrappedRootObject,indexer),ko.utils.arrayIndexOf(options.copy,indexer)!==-1||ko.utils.arrayIndexOf(options.include,indexer)!==-1||!unwrappedRootObject[mappingProperty]||!unwrappedRootObject[mappingProperty].mappedProperties||unwrappedRootObject[mappingProperty].mappedProperties[indexer]||!unwrappedRootObject[mappingProperty].copiedProperties||unwrappedRootObject[mappingProperty].copiedProperties[indexer]||"array"===exports.getType(unwrappedRootObject)){switch(exports.getType(ko.utils.unwrapObservable(propertyValue))){case"object":case"array":case"undefined":var previouslyMappedValue=options.visitedObjects.get(propertyValue);mappedRootObject[indexer]="undefined"!==exports.getType(previouslyMappedValue)?previouslyMappedValue:exports.visitModel(propertyValue,callback,options);break;default:mappedRootObject[indexer]=callback(propertyValue,options.parentName)}}}}),mappedRootObject}});