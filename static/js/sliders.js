function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


update_led_strip = debounce(
    function(slider, slidertype){
        $.ajax({
            url: `/update/${slidertype}/${slider.val()}`,
            type: 'PUT',
        })
    },
    500,
    false
)


window.onload = function(){
    const sliders = ["red", "blue", "green", "brightness"];
    sliders.forEach(
        function(slidertype){           
            var slider = $(`#${slidertype} .slider`);
            var slidervalue = $(`#${slidertype} .slidervalue`);
            
            slider.on("input", function(){
                slidervalue.text(slider.val());
                update_led_strip(slider, slidertype);
            })

            $.get(`/slider/${slidertype}`, function(data){
                slider.val(data);
                slider.trigger("input");
            });
        }
    )
}