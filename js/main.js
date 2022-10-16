(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });
  $.loading = function (btn, action) {
    if (action && !btn.data("old-html")) {
      btn
        .data("old-html", btn.html())
        .prop("disabled", true)
        .html(btn.data("loading-text") || "Loading...");
      return;
    }
    if (!btn.data("old-html")) return;
    btn
      .prop("disabled", false)
      .html(btn.data("old-html"))
      .data("old-html", false);
  };

  $("#book-submit-button").click(function () {
    var $btn = $(this);
    let firstName = $("#name").val();
    let emailAddress = $("#email").val();
    let carName = $("#carName").val();
    let details = $("#details").val();
    let date = $("#dateSelected").val();
    let phone = $("#phone").val();
    let serviceName = $("#serviceName option:selected").text();
    $.loading($btn, true);
    // $.get(
    //   `https://auto-services.onrender.com/email?firstName=${firstName}&carName=${carName}&details=${details}&serviceName=${serviceName}&receivingAddress=${emailAddress}&date=${date}&phone=${phone}`,
    //   function (data) {
    //     $.loading($btn, false);
    //     $("#myModal").modal("show");
    //   }
    // );
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://auto-services.onrender.com/email?firstName=${firstName}&carName=${carName}&details=${details}&serviceName=${serviceName}&receivingAddress=${emailAddress}&date=${date}&phone=${phone}`,
      data: {},
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      },
      success: function () {
        // alert("Success!" + authHeader);
        $.loading($btn, false);
      },
      error: function (error){
        console.log(error);
      }
    });

    // $("#myModal").modal("show");
  });
  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 25,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);
