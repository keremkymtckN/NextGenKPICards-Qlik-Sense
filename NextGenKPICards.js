define([
  "qlik",
  "angular",
  "text!./template.html",
  "css!./styles.css"
], function (qlik, angular, template) {
  "use strict";

  function byId(root, id) {
    return root.querySelector("#" + id);
  }

  function setPlaceholder(el, html) {
    if (!el) return;
    el.innerHTML = html;
  }

  function embedObject(app, el, objId, label) {
    if (!el) return;

    if (!objId || String(objId).trim() === "") {
      setPlaceholder(
        el,
        `<div class="vfb-empty">
           <div class="vfb-empty-title">${label} Object ID not set</div>
           <div class="vfb-empty-sub">
             Create a native Qlik object (KPI/Chart/Table) and paste its Object ID in Properties.
           </div>
         </div>`
      );
      return;
    }

    // Clear old content and embed
    el.innerHTML = "";
    app.getObject(el, objId);
  }

  // 12 KPI props helper
  function buildKpiItems() {
    var items = {};
    for (var i = 1; i <= 12; i++) {
      items["kpi" + i] = {
        label: "KPI " + i + " Object ID",
        ref: "props.kpi" + i,
        type: "string",
        defaultValue: ""
      };
    }
    return items;
  }

  return {
    template: template,

    // Dashboard container: no hypercube needed
    initialProperties: {
      title: "VakıfBank Executive Dashboard",
      props: {
        mode: "dark",

        // KPI object ids
        kpi1: "", kpi2: "", kpi3: "", kpi4: "",
        kpi5: "", kpi6: "", kpi7: "", kpi8: "",
        kpi9: "", kpi10: "", kpi11: "", kpi12: "",

        // charts / table object ids
        lineObjId: "",
        barObjId: "",
        pieObjId: "",
        tableObjId: ""
      }
    },

    definition: {
      type: "items",
      component: "accordion",
      items: {
        header: {
          label: "Header",
          items: {
            title: {
              label: "Dashboard title",
              ref: "title",
              type: "string",
              defaultValue: "VakıfBank Executive Dashboard"
            }
          }
        },

        theme: {
          label: "Theme",
          items: {
            mode: {
              type: "string",
              component: "dropdown",
              label: "Mode",
              ref: "props.mode",
              options: [
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" }
              ],
              defaultValue: "dark"
            }
          }
        },

        kpis: {
          label: "KPIs (embed)",
          items: buildKpiItems()
        },

        embeds: {
          label: "Charts & Table (embed)",
          items: {
            lineObjId: {
              label: "Line chart Object ID",
              ref: "props.lineObjId",
              type: "string",
              defaultValue: ""
            },
            barObjId: {
              label: "Bar chart Object ID",
              ref: "props.barObjId",
              type: "string",
              defaultValue: ""
            },
            pieObjId: {
              label: "Pie/Donut Object ID",
              ref: "props.pieObjId",
              type: "string",
              defaultValue: ""
            },
            tableObjId: {
              label: "Table Object ID",
              ref: "props.tableObjId",
              type: "string",
              defaultValue: ""
            }
          }
        }
      }
    },

    controller: ["$scope", function ($scope) {
      $scope.title = "VakıfBank Executive Dashboard";
      $scope.theme = "dark";
    }],

    paint: function ($element, layout) {
      var scope = angular.element($element).scope();
      scope.title = layout.title || "VakıfBank Executive Dashboard";
      scope.theme = (layout.props && layout.props.mode) ? layout.props.mode : "dark";
      scope.$applyAsync();

      var root = $element[0];
      var app = qlik.currApp(this);

      // KPI container ids MUST exist in template.html
      // Expected ids: vfb_kpi_1 ... vfb_kpi_12
      for (var i = 1; i <= 12; i++) {
        var el = byId(root, "vfb_kpi_" + i);
        var objId = layout.props ? layout.props["kpi" + i] : "";
        embedObject(app, el, objId, "KPI " + i);
      }

      // Chart/Table containers MUST exist in template.html
      embedObject(app, byId(root, "vfb_line"), layout.props?.lineObjId, "Line chart");
      embedObject(app, byId(root, "vfb_bar"), layout.props?.barObjId, "Bar chart");
      embedObject(app, byId(root, "vfb_pie"), layout.props?.pieObjId, "Pie/Donut");
      embedObject(app, byId(root, "vfb_table"), layout.props?.tableObjId, "Table");

      return qlik.Promise.resolve();
    }
  };
});
