import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
      <p>Create a javascript file inside of your WP Theme named: ajax.js</p>
      <SyntaxHighlighter
        language="javascript"
        style={a11yDark}
        className="rounded-3 mb-5"
      >
        {exportAjax()}
      </SyntaxHighlighter>
    </section>
  );
};

export default Ajax;
