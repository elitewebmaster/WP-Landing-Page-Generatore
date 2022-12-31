import _ from "lodash";
import Syntax from "./Syntax";

export const exportPageTemplate = (generator) => {
  let arr = [];

  Object.entries(generator).forEach((element, i) => {
    if (typeof element[1] === "boolean" && element[1]) {
      let name = _.upperFirst(element[0].replace(/([A-Z])/g, " $1").trim());
      arr.push(`            <div class="form-group form-group-lg d-flex mt-4 mb-4 align-items-center justify-content-between">
                <label class="col-sm-2 control-label" for="${element[0]}">${name}</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" id="${element[0]}" name="${element[0]}">
                </div>
            </div>\n`);
    }
  });

  return `
  <?php 
  /*
  Template Name: ${generator.templateName}
  */
  
  get_header(); 
  
  the_content();
  ?>
  <section class='row mt-2 mb-2'>
      <div class="col-md-10 col-sm-12">
          <form id="landing-form"  method="POST">
  ${arr.join("")}
              <div class="form-group form-group-lg d-flex mt-4 mb-4 align-items-center justify-content-between">
                  <div class="col-sm-offset-4 col-sm-10">
                      <button type="submit" class="btn btn-dark mt-4">Submit</button>
                  </div>
              </div>
              
              <input type="hidden" name="action" value="lead_insert" />
          </form>
      </div>
      <div class="alert" role="alert"></div>
  </section>
  
  <?php get_footer(); ?>
          `;
};

const PageTemplate = () => {
  return (
    <section>
      <p>
        Create a page template landing_page_template.php inside of your WP Theme
        then copy & paste the code below to the file that you just created.
        Below form use Bootstrap CSS.
      </p>
      <Syntax page="template" />
    </section>
  );
};

export default PageTemplate;
