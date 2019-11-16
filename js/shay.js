var formData;
var plotId = 0;
var currFile;

let main = function() {

};

var myDropzone;

Dropzone.options.dropzoneSMF = {
    paramName: 'file',
    url: "http://localhost:5000/getColumns",
    method: 'post',
    withCredentials: false,
    // enqueueForUpload: true,
    autoProcessQueue: false,
    parallelUploads: 1,
    maxFilesize: 10,
    maxFiles: 1,
    acceptedFiles: '.csv, .numbers',
    dictDefaultMessage: 'Drag your file here',
    init: function () {
        var submitButton = document.querySelector("#btn_upload");
        myDropzone = this;
        submitButton.addEventListener("click", function() {
            myDropzone.processQueue();
        });

        this.on("sending", function (file, xhr, formData) {
            console.log(file.name);
        });

        this.on("uploadprogress", function () {
            console.log("uploading");

            // this.disable()
        });

        this.on("error", function () {

        });

        this.on("complete", function (file) {
            // this.removeFile(file);
        });

        this.on("processing", function () {
            console.log('processing');
        });

        this.on("success", function (file, response) {
            console.log("success");

            // myDropzone.disable();
            let resJson = JSON.parse(response);

            console.log(resJson);

            $('#selection_phase').fadeIn();
            fillCyt(resJson.data);

            currFile = file;
        });

        this.on("addedfile", function() {
            if (this.files[1]!=null) {
                this.removeFile(this.files[0]);
            }
        });
    }
};

function fillCyt(cytNames) {
    let title = $('#selection_title');
    let submit = $('#submit_btn');
    let buttons = $('#cyt_selection');

    buttons.empty();

    if (cytNames.length === 0) {
        title.text("The file submitted can't be analyzed. No Columns can be analyzed");
        submit.hide();
        return;
    }

    title.text("select two columns to include in the analysis");
    submit.show();

    for (let i = 0; i < cytNames.length; i++) {
        buttons.append(
            $('<label/>', {'class': 'btn btn-outline-primary mt-1 ml-1'}).append(
                $('<input/>', {'type': 'checkbox', 'autocomplete':'off', 'value':cytNames[i]})
            ).append(cytNames[i])
        );
        // var htmlObject = "<label class=\"btn btn-outline-primary mt-1 ml-1\"><input type=\"checkbox\" autocomplete=\"off\"> " + cytNames[i] + " </label>";
        // buttons.append(htmlObject);
        console.log(buttons.last().outerHTML);
    }

    // buttons.children().each(function (index, node) {
    //     console.log(node.children());
    // });

    bindColsClick();
}

function bindColsClick() {
    let colsLimit = 2;

    $('#cyt_selection > label > input').on('change', function(evt) {
        if($('#cyt_selection').find('input:checked').length > colsLimit) {
            this.checked = false;
        }else{
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
            }else{
                $(this).parent().addClass('active');
            }
        }
    });
}

function analyze() {
    console.log("running");

    let sentCyts = [];

    let cytsResult = $('#cyt_selection > label > input[type="checkbox"]:checked');
    if (cytsResult.length !== 2) {
        alert("Please pick at 2 columns groups");
        return;
    }
    cytsResult.each(function () {
        sentCyts.push($(this).val());
    });

    $('#submit_btn').prop('disabled', true);
    // $('#selection_phase').fadeOut();
    // $('#loading_spinner').fadeIn();

    console.log(sentCyts);

    formData = new FormData();
    formData.append('file', currFile);
    formData.append('cyts', JSON.stringify(sentCyts));

    $.ajax({
        url: 'http://localhost:5000/getResults',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response){
            if(response != 0){
                console.log(response.data);

                $('#submit_btn').prop('disabled', false);
                $('#submit_btn').prop('enabled', true);

                drawPlot(response.data);

            }else{
                alert('file not uploaded');
            }
        },
        failure: function () {
            $('#submit_btn').prop('disabled', false);
            $('#submit_btn').prop('enabled', true);
        }
    });
}

function drawPlot(data) {
    let plot = JSON.parse(data);
    console.log(plot);

    let plotsHolder = $('#charts_area');

    let traces = [];

    let categories = [];
    Object.keys(plot.data).forEach(function(key) {
        categories.push(key);
    });

    // we always have three traces: data, model, predict. Data and model are scatter while predict is the model

    // data points
    Object.keys(plot.data).forEach(function(key) {
        let dataTrace = {
            type: 'bar',
            name: key,
            x: categories,
            y: plot.data[key]
        };

        traces.push(dataTrace);
    });

    var layout = {
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