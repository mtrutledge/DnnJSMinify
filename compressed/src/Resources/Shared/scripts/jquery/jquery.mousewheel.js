!function($){function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,deltaX=0,deltaY=0;return event=$.event.fix(orgEvent),event.type="mousewheel",orgEvent.wheelDelta&&(delta=orgEvent.wheelDelta/120),orgEvent.detail&&(delta=-orgEvent.detail/3),deltaY=delta,void 0!==orgEvent.axis&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS&&(deltaY=0,deltaX=-1*delta),void 0!==orgEvent.wheelDeltaY&&(deltaY=orgEvent.wheelDeltaY/120),void 0!==orgEvent.wheelDeltaX&&(deltaX=-1*orgEvent.wheelDeltaX/120),args.unshift(event,delta,deltaX,deltaY),($.event.dispatch||$.event.handle).apply(this,args)}var types=["DOMMouseScroll","mousewheel"];if($.event.fixHooks)for(var i=types.length;i;)$.event.fixHooks[types[--i]]=$.event.mouseHooks;$.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var i=types.length;i;)this.addEventListener(types[--i],handler,!1);else this.onmousewheel=handler},teardown:function(){if(this.removeEventListener)for(var i=types.length;i;)this.removeEventListener(types[--i],handler,!1);else this.onmousewheel=null}},$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}})}(jQuery);