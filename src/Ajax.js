import Syntax from "./Syntax";

export const exportAjax = () => {
  return `
  jQuery(function () {
    const $form = jQuery("#landing-form"),
      $alert = jQuery(".alert");
  
    $form.submit(function (e) {
      e.preventDefault();
      jQuery.ajax({
        url: the_ajax_script.ajaxurl,
        type: "POST",
        dataType: "json",
        data: $form.serialize(),
        success: (res) => {
          if (res.status === "ok") {
            $alert
              .text("Your information has been submitted.")
              .removeClass("alert-danger")
              .addClass("alert-success");
          } else {
            $alert
              .text("Error")
              .removeClass("alert-success")
              .addClass("alert-danger");
          }
        },
        error: function (err) {
          $alert
            .text("Error")
            .removeClass("alert-success")
            .addClass("alert-danger");
        },
      });
    });
  });
            `;
};

const Ajax = () => {
  return (
    <section>
      <Syntax page="ajax" />
    </section>
  );
};

export default Ajax;
