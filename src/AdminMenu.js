import _ from "lodash";
import Syntax from "./Syntax";

export const exportAdminMenu = (generator) => {
  let columnsArr = [],
    dbArr = [`                    \`id\` int(11) NOT NULL,\n`],
    primary = null;

  Object.entries(generator).forEach((element, i) => {
    if (typeof element[1] === "boolean" && element[1]) {
      if (!columnsArr.length) primary = element[0];
      columnsArr.push(
        `                    '${element[0]}' => __('${_.upperFirst(
          element[0].replace(/([A-Z])/g, " $1").trim()
        )}', 'leads-table'),\n`
      );
      dbArr.push(
        `                    \`${element[0]}\` varchar(100) NOT NULL,\n`
      );
    }
  });
  columnsArr.push(`                    'date' => __('Date', 'leads-table')\n`);
  dbArr.push(
    `                    \`date\` datetime DEFAULT CURRENT_TIMESTAMP\n`
  );

  return `
  <?php
  /*
   * Plugin Name: Landing Page Table
   * Description: Table with all the leads from the landing page.
   * Author URI: https://www.EliteWebmaster.com/
   */
  
   add_action( 'admin_menu' , 'Leads_init');
  
   function Leads_init(){
       $page_title = '${generator.templateName}';
       $menu_title = 'Leads';
       $capability = 'manage_options';
       $menu_slug  = 'leads.php';
       $function   = 'Leads_page';
   
       add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, "dashicons-list-view" );
   }
   
   function Leads_page(){
      if (!class_exists('WP_List_Table')) {
          require_once(ABSPATH . 'wp-admin/includes/class-wp-list-table.php');
      }
  
      class Leads_List_Table extends WP_List_Table
      {
          private $table_data;
  
          function get_columns()
          {
              $columns = array(
  ${columnsArr.join("").slice(0, -1)}
              );
              return $columns;
          }
  
          function prepare_items(){
              $this->table_data = $this->get_table_data();
      
              $columns = $this->get_columns();
              $hidden = array();
              $sortable = $this->get_sortable_columns();
              $primary  = '${primary}';
              $this->_column_headers = array($columns, $hidden, $sortable, $primary);
      
              usort($this->table_data, array(&$this, 'usort_reorder'));
              
              $this->items = $this->table_data;
          }
  
          private function get_table_data() {
              global $wpdb;
              $check = $wpdb->get_results("select 1 from landing LIMIT 1");
              if(count($check) === 0){
                  $wpdb->get_results("CREATE TABLE \`landing\` (
  ${dbArr.join("").slice(0, -1)}
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");
              }
              
              return $wpdb->get_results("select * from landing", ARRAY_A);
          }
  
          function column_default($item, $column_name)
          {
              return $item[$column_name];
          }
  
          protected function get_sortable_columns()
          {
              $sortable_columns = array(
                      'date'   => array('date', true)
              );
              return $sortable_columns;
          }
  
          function usort_reorder($a, $b)
          {
              $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'date';
              $order = (!empty($_GET['order'])) ? $_GET['order'] : 'desc';
              $result = strcmp($a[$orderby], $b[$orderby]);
              return ($order === 'asc') ? $result : -$result;
          }
  
          function column_name($item)
          {
              $actions = array(
                      'delete'    => sprintf('<a href="?page=%s&action=%s&lead=%s">' . __('Delete', 'leads-table') . '</a>', $_REQUEST['page'], 'delete', $item['id']),
              );
              return sprintf('%1$s %2$s', $item['name'], $this->row_actions($actions));
          }
  
          function delete(){
              global $wpdb;
              $lead = $_REQUEST["lead"];
              $wpdb->get_results("DELETE FROM landing WHERE id = {$lead} LIMIT 1");
          }
      }
  
      $table = new Leads_List_Table();
  
      if(isset($_REQUEST["action"]) && $_REQUEST["action"] === "delete"){
          $table->delete();
      }
  
      echo '<div class="wrap"><h2>${generator.templateName}</h2>';
      $table->prepare_items();
      $table->display();
      echo '</div>';
   }
  ?>
          `;
};

const AdminMenu = () => {
  return (
    <section>
      <ol>
        <li>Create new PHP file and copy below code</li>
        <li>Compress the PHP file you just created as ZIP</li>
        <li>
          Then upload this file as a plugin in the WordPress Admin Panel
          (Plugins -&gt; Add New -&gt; Upload Plugin)
        </li>
        <li>Activate the plugin</li>
        <li>Go to Leads Tab in WordPress admin menu</li>
      </ol>
      <Syntax page="admin" />
    </section>
  );
};

export default AdminMenu;
