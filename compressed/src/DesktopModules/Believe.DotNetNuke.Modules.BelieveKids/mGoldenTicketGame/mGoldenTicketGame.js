!function($){$.fn.randomize=function(childElem,callback){return this.each(function(){var $this=$(this),elems=$this.children(childElem);elems.sort(function(){return Math.round(Math.random())-.5}),$this.empty();for(var i=0;i<elems.length;i++)$(elems[i]).addClass("letter"),$this.append(elems[i]);"function"==typeof callback&&callback.call(this)})}}(jQuery);