var plotId = 0;

let main = function() {

    for (let i = 0; i < comp.length; i++) {
        drawPlot(comp[i], "comp_charts_area");
    }

    for (let i = 0; i < turb.length; i++) {
        drawPlot(turb[i], "turbine_charts_area");
    }
};

function drawPlot(data, id) {
    let plot = JSON.parse(data);
    console.log(plot);

    let plotsHolder = $('#'+id);

    let traces = [];

    // we always have three traces: data, model, predict. Data and model are scatter while predict is the model

    // data points
    let dataTrace = {
        type: 'scatter',
        name: 'Data',
        mode: 'markers',
        marker: {
            color: 'blue'
        },
        x: plot.data.map(function(value) { return value[0]; }),
        y: plot.data.map(function(value) { return value[1]; })
    };

    // predict points
    let predictTrace = {
        type: 'scatter',
        name: 'Predict',
        mode: 'markers',
        marker: {
            color: 'red'
        },
        x: plot.predict.map(function(value) { return value[0]; }),
        y: plot.predict.map(function(value) { return value[1]; }),
    };

    // model trace
    let modelTrace = {
        type: 'scatter',
        name: 'Model',
        mode: 'lines',
        marker: {
            color: 'lightgray'
        },
        x: plot.model.map(function(value) { return value[0]; }),
        y: plot.model.map(function(value) { return value[1]; }),
    };

    // finished traces
    // now add them
    traces.push(modelTrace);
    traces.push(dataTrace);
    traces.push(predictTrace);

    // general plot info
    let layout = {
        margin: {
            pad: 4
        },
        legend: {
            "orientation": "h",
            y: -0.2
        },
        title: plot.title,
        xaxis: {
            title: {
                text: plot.x_label
            }
        },
        yaxis: {
            title: {
                text: plot.y_label
            }
        }
    };

    // let rowElement = $("<div>").addClass("row mb-3 mx-0").attr("id", lastRow);
    // plotsHolder.append(rowElement);

    let sizeClasses; // full width
    if (plot.size === 3) {
        sizeClasses = "col-lg-6 col-xl-4";
    }else if (plot.size === 2) {
        sizeClasses = "col-lg-12 col-xl-6";
    }else{
        sizeClasses = "col-lg-12 col-xl-12";
    }

    let buffer = $("<div>").addClass(sizeClasses + " order-lg-2 order-xl-1");

    let plotContainer = $("<div>").addClass("kt-portlet kt-portlet--height-fluid-half");
    buffer.append(plotContainer);

    // plotContainer.append(
    //     $('<div/>', {'class': 'kt-portlet__head'}).append(
    //         $('<div/>', {'class': 'kt-portlet__head-label'}).append(
    //             $('<h3>', {text: "hello"}, {'class': 'kt-portlet__head-title'})
    //         )
    //     )
    // );

    let plotElement = $("<div>").attr("id", String(plotId)).addClass("");
    plotContainer.append(plotElement);

    plotsHolder.append(buffer);

    Plotly.newPlot(String(plotId), traces, layout, {showSendToCloud: false});

    plotId++;
}

$(document).ready(function () {
    "use strict";

    main();
});

