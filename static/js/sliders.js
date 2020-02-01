window.onload = function(){
    const sliders = ["red", "blue", "green", "brightness"];
    sliders.forEach(
        function(slidertype){           
            var slider = $(`#${slidertype} .slider`);
            var slidervalue = $(`#${slidertype} .slidervalue`);
            
            slider.on("input", function(){
                slidervalue.text(slider.val());
                $.ajax({
                    url: `/update/${slidertype}/${slider.val()}`,
                    type: 'PUT',
                })
            })
            
            $.get(`/slider/${slidertype}`, function(data){
                slider.val(data);
                slider.trigger("input");
            });
        }
    )
}