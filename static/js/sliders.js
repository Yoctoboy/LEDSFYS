update_led_strip = _.debounce(
  function(slider, slidertype) {
    $.ajax({
      url: `/update/${slidertype}/${slider.val()}`,
      type: "PUT"
    });
  },
  50,
  (options = { leading: true, maxWait: 50 })
);

window.onload = function() {
  const sliders = ["red", "blue", "green", "brightness"];
  sliders.forEach(function(slidertype) {
    var slider = $(`#${slidertype} .slider`);
    var slidervalue = $(`#${slidertype} .slidervalue`);

    slider.on("input", function() {
      slidervalue.text(slider.val());
      update_led_strip(slider, slidertype);
    });
    slider.trigger("input");
    let updateSliderValue = () =>
      $.get(`/slider/${slidertype}`, function(data) {
        if (data != slider.val()) {
          slider.val(data);
          slidervalue.text(slider.val());
        }
      });
    updateSliderValue();
    setInterval(updateSliderValue, 500);
  });
};
