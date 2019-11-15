// Dropzone.autoDiscover = false;

var myDropzone;
var result = [];
var datatable;

Dropzone.options.dropzoneSMF = {
    paramName: 'file',
    url: "http://127.0.0.1:5000/new_csv",
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

            // console.log(response);
            populateTable(response);

        });

        this.on("addedfile", function() {
            if (this.files[1]!=null) {
                this.removeFile(this.files[0]);
            }
        });
    }
};

function populateTable(arr) {
    result = [];

    var headers = ['lp', 'v', 'GT', 'GTn', 'GGn', 'Ts', 'Tp', 'HP', 'T1', 'T2', 'P48', 'P1', 'P2', 'Pexh', 'TIC', 'mf', 'CompHealth'];

    for (var i = 0; i < arr.length; i++) {
        var row = {};
        for (var j = 0; j < arr[i].length; j++) {
            row[headers[j]] = arr[i][j];

        }
        result.push(row);
    }

    console.log(result);


    datatable.clear();
    datatable.rows.add(result);
    datatable.draw();

    // // var thead = document.getElementById("header");
    // var thead = $('#m_table_2 > thead');
    //
    // for (var i = 0; i < headers.length; i++) {
    //     var th = document.createElement('th');
    //     th.innerHTML = headers[i];
    //     thead.append(th);
    // }

    // var datatable = $('#m_table_2').KTDatatable({
    //     // datasource definition
    //     data: {
    //         type: 'local',
    //         source: result,
    //         pageSize: 10,
    //         // serverPaging: true,
    //         // serverFiltering: true,
    //         // serverSorting: true,
    //     },
    //     scrollY: '50vh',
    //     scrollX: true,
    //     scrollCollapse: true,
    //
    //     // layout definition
    //     layout: {
    //         scroll: true,
    //         footer: false,
    //     },
    //
    //     // column sorting
    //     sortable: true,
    //     pagination: true,
    //
    //     search: {
    //         input: $('#generalSearch'),
    //     },
    //
    //     // columns definition
    //     columns: [
    //         {
    //             field: 'lp',
    //             title: 'lp',
    //             sortable: 'asc',
    //             width: 40,
    //             // type: 'number',
    //             textAlign: 'center',
    //             overflow: 'visible',
    //             // autoHide: false
    //         },
    //         {
    //             field: 'v',
    //             title: 'v',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         }, {
    //             field: 'GT',
    //             title: 'GT',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         },
    //         {
    //             field: 'GTn',
    //             width: 150,
    //             title: 'GTn',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         }, {
    //             field: 'GGn',
    //             title: 'GGn',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         }, {
    //             field: 'Ts',
    //             title: 'Ts',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         }, {
    //             field: 'Tp',
    //             title: 'Tp',
    //             // type: 'number',
    //             //autoHide: false
    //         }, {
    //             field: 'HP',
    //             title: 'HP',
    //             // type: 'number',
    //             //autoHide: false
    //         },
    //         {
    //             field: 'T1',
    //             title: 'T1',
    //             // type: 'number',
    //             //autoHide: false
    //         },
    //         {
    //             field: 'T2',
    //             title: 'T2',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         }, {
    //             field: 'P48',
    //             title: 'P48',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         }, {
    //             field: 'P1',
    //             title: 'P1',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         }, {
    //             field: 'P2',
    //             title: 'P2',
    //             // type: 'number',
    //             overflow: 'visible',
    //             // autoHide: false
    //         }, {
    //             field: 'Pexh',
    //             title: 'Pexh',
    //             // type: 'number',
    //             autoHide: false
    //         }, {
    //             field: 'TIC',
    //             title: 'TIC',
    //             // type: 'number',
    //             autoHide: false
    //         }, {
    //             field: 'mf',
    //             title: 'mf',
    //             // type: 'number',
    //             autoHide: false
    //         }, {
    //             field: 'CompHealth',
    //             title: 'CompHealth',
    //             // type: 'number',
    //             autoHide: false
    //         }],
    //
    // });




    // datatable.destroy();
}

$(document).ready(function () {
    "use strict";

    datatable = $('#m_table_2').DataTable({
        // datasource definition
        data: result,
        scrollY: '50vh',
        scrollX: true,
        scrollCollapse: true,

        // column sorting
        sortable: true,
        pagination: true,

        search: {
            input: $('#generalSearch'),
        },

        // columns definition
        columns: [
            {data: 'lp', title: "lp"},
            {data: 'v', title: "v"},
            {data: 'GT', title: "GT"},
            {data: 'GTn', title: "GTn"},
            {data: 'GGn', title: "GGn"},
            {data: 'Ts', title: "Ts"},
            {data: 'Tp', title: "Tp"},
            {data: 'HP', title: "HP"},
            {data: 'T1', title: "T1"},
            {data: 'T2', title: "T2"},
            {data: 'P48', title: "P48"},
            {data: 'P1', title: "P1"},
            {data: 'P2', title: "P2"},
            {data: 'Pexh', title: "Pexh"},
            {data: 'TIC', title: "TIC"},
            {data: 'mf', title: "mf"},
            {data: 'CompHealth', title: "CompHealth"}
        ],

    });
});