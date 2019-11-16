var plotId = 0;

let main = function() {
    for (let i = 0; i < word.length; i++) {
        drawPlot(word[i], "charts_area");
    }
};

function drawPlot(data) {
    let plot = JSON.parse(data);
    console.log(plot);

    let plotsHolder = $('#charts_area');

    let traces = [];
    // data points
    Object.keys(plot.data).forEach(function(key) {
        let dataTrace = {
            type: 'bar',
            name: key,
            x: plot.categories,
            y: plot.data[key]
        };

        traces.push(dataTrace);
    });

    var layout = {
        height: 500,
        barmode: 'group',
        title: plot.title,
        xaxis: {
            title: {
                text: plot.x_label
            }
        },
        yaxis: {
            title: {
                text: "Number of Failures"
            }
        }
    };

    // let rowElement = $("<div>").addClass("row mb-3 mx-0").attr("id", lastRow);
    // plotsHolder.append(rowElement);

    let sizeClasses = "col-lg-12 col-xl-12";

    let buffer = $("<div>").addClass(sizeClasses + " order-lg-2 order-xl-1");

    let plotContainer = $("<div>").addClass("kt-portlet kt-portlet--height-fluid-half");
    plotContainer.css("height", 500 + plot.text_height);
    buffer.append(plotContainer);

    let plotElement = $("<div>").attr("id", String(plotId)).addClass("");
    plotContainer.append(plotElement);

    plotsHolder.append(buffer);

    Plotly.newPlot(String(plotId), traces, layout, {showSendToCloud: false});

    plotContainer.append($('<p>').html(plot.text).addClass("mx-5"));

    plotId++;
}

$(document).ready(function () {
    "use strict";

    main();
});

