(function ($) {
    $.fn.randomize = function (childElem, callback) {
        return this.each(function () {
            var $this = $(this);
            var elems = $this.children(childElem);

            elems.sort(function () {
                return (Math.round(Math.random()) - 0.5);
            });
            $this.empty();

            for (var i = 0; i < elems.length; i++) {
                $(elems[i]).addClass('letter');
                $this.append(elems[i]);
            }

            if (typeof callback == 'function') { // make sure the callback is a function
                callback.call(this); // brings the scope to the callback
            }
        });
    };
})(jQuery);