update_led_strip = _.debounce(
    function(slider, slidertype){
        $.ajax({
            url: `/update/${slidertype}/${slider.val()}`,
            type: 'PUT',
        })
    },
    wait=0.5,
    options={leading:true}
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