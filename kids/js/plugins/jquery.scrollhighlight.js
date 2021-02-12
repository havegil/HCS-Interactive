/* =====================================
    SCROLL HIGHLIGHTING JQUERY PLUGIN
===================================== */

;(function($) {
    $.fn.scrollHighlight = function (options) {
        var opts = jQuery.extend({}, jQuery.fn.scrollHighlight.defaults, options);
        
        return this.each(function () {
            var context = $(this);
            
            // Update highlighted item based on visibility.
            function updateHighlight() {
                $('.' + opts.itemClass, context).each(function () {
                    var $element = $(this),
                        viewportHeight = $(window).height(),
                        documentScrollTop = $(document).scrollTop(),
                        minTop = documentScrollTop - $element.height(),
                        maxTop = documentScrollTop + (viewportHeight * opts.activeZone),
                        elementOffset = $element.offset(),
                        elementId = $element.attr('id');
                        
                    // Check if any part of the element appears in the active zone.
                    if (elementOffset.top > minTop && elementOffset.top < maxTop) {
                        $('.'  + elementId).addClass(opts.visibleClass);
                    } else {
                        $('.' + elementId).removeClass(opts.visibleClass).removeClass(opts.highlightedClass);
                    }
                    // Highlight visibile element.
                    // If there is more than 1 visible element, highlight only the last one.
                    var visibleElements = $('.' + opts.visibleClass);
                    if (visibleElements.length > 1) {
                        visibleElements.slice(0, -1).removeClass(opts.highlightedClass);
                        visibleElements.slice(-1).addClass(opts.highlightedClass);
                    } else {
                        visibleElements.addClass(opts.highlightedClass);
                    }
                });
            }
            // Update highlighted item when page scrolls.
            $(document).scroll(function () {
                updateHighlight();
            });
            // Set initial page highlighting.
            updateHighlight();
            
        });
    };

    // The following defaults can be overridden in OPTIONS.
    $.fn.scrollHighlight.defaults = {
        // Class used to identify items that should have scroll highlighting.
        itemClass: "scrollHighlightItem",
        // Class added to items in the active zone.
        visibleClass: "visible",
        // Class added to the highlighted item.
        highlightedClass: "highlighted",
        // Distance from top of page before items are highlighted.
        activeZone: 0.4
    }
})(jQuery);

/*===============================
* INSTRUCTIONS
* ===============================
*
* $(SELECTOR).scrollHighlight(OPTIONS);
*
* SELECTOR should be a containing element. All decendents of SELECTOR that have 
* a class of scrollHighlightItem will have scroll highlighting applied to them. Any 
* element with a class name matching the ID of a scrollHighlightItem will be 
* highlighted when its item is active. The item class (default "scrollHighlightItem")
* can be changed in the options, along with the classes applied to visible and
* highlighted items, and the size of the "active zone" (the distance from the top
* of the page that will cause items to highlight.)
*
*/