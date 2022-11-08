(function ($) {
  "use strict";
  (function () {
    emailjs.init("Rf3v8E-Pi08So1mch");
  })();

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
    if (btn == undefined || !btn.data("old-html")) return;
    btn
      .prop("disabled", false)
      .html(btn.data("old-html"))
      .data("old-html", false);
  };

  $(".close").click(function () {
    $("#myModal").modal("hide");
  });
  $("#booking").submit(function (e) {
    e.preventDefault();

    var form = $("#booking");

    if (form.valid()) {
      var {
        $btn,
        firstName,
        carName,
        details,
        serviceName,
        emailAddress,
        date,
        phone,
      } = getformValues();
      $.loading($btn, true);
      setTimeout(function () {
        $.loading($btn, false);
        resetFormAndShowModal();
      }, 1000);
      sendEmail(
        firstName,
        carName,
        details,
        serviceName,
        emailAddress,
        date,
        phone
      );
    }

    function getformValues() {
      var $btn = $("#book-submit-button");
      let firstName = $("#name").val();
      let emailAddress = $("#email").val();
      let carName = $("#carName").val();
      let details = $("#details").val();
      let date = $("#dateSelected").val();
      let phone = $("#phone").val();
      let serviceName = $("#serviceName option:selected").text();
      return {
        $btn,
        firstName,
        carName,
        details,
        serviceName,
        emailAddress,
        date,
        phone,
      };
    }

    function resetFormAndShowModal() {
      document.getElementById("booking").reset();

      $("#myModal").modal("show");
    }

    function sendEmail(
      firstName,
      carName,
      details,
      serviceName,
      emailAddress,
      date,
      phone
    ) {
      emailjs.send(
        "service_scqrgms",
        "template_21f81kt",
        {
          to_Name: firstName,
          to_Email: emailAddress,
          details: details,
          date: date,
          carName: carName,
          serviceName: serviceName,
        },
        "Rf3v8E-Pi08So1mch"
      );
      emailjs.send(
        "service_scqrgms",
        "template_kjnd385",
        {
          firstName: firstName,
          phoneNumber: phone,
          carName: carName,
          serviceName: serviceName,
          details: details,
          date: date,
          to_email: emailAddress,
          reply_to: "johnbiparva@yahoo.com",
        },
        "Rf3v8E-Pi08So1mch"
      );
    }
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
