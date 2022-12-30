import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const exportFunctions = (generator) => {
  let arr = [];

  Object.entries(generator).forEach((element, i) => {
    if (typeof element[1] === "boolean" && element[1]) {
      arr.push(`            "${element[0]}" => $_REQUEST["${element[0]}"],\n`);
    }
  });

  return `<?php
  function js_enqueue_scripts() {
      wp_enqueue_script ("my-ajax-handle", get_stylesheet_directory_uri() . "/ajax.js", array('jquery')); 
      wp_localize_script('my-ajax-handle', 'the_ajax_script', array('ajaxurl' =>admin_url('admin-ajax.php')));
  } 
  
  function lead_insert(){
      if(isset($_REQUEST["action"]) && $_REQUEST["action"] === "lead_insert"){
          $data = array(
  ${arr.join("").slice(0, -2)}
          );
  
          $table_name = "landing";
          global $wpdb;
          $result = $wpdb->insert($table_name,$data,$format=NULL);
  
          if($result == 1){
              wp_die('{ "status": "ok" }',200);
          }
          else {
              wp_die('{ "status": "error" }',200);
          }
      }        
  }
  
  add_action("wp_enqueue_scripts", "js_enqueue_scripts");
  add_action('wp_ajax_nopriv_lead_insert', 'lead_insert');
  add_action('wp_ajax_lead_insert', 'lead_insert');
?>`;
};

const Functions = ({ generator }) => {
  return (
    <section>
      <p>Insert below code to your functions.php</p>
      <SyntaxHighlighter
        language="php"
        style={a11yDark}
        className="rounded-3 mb-5"
      >
        {exportFunctions(generator)};
      </SyntaxHighlighter>
    </section>
  );
};

export default Functions;
