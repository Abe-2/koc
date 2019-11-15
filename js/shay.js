let main = function() {

    fillCyt(['hello', 'bye', 'good', 'testing', 'yes']);
};

function fillCyt(cytNames) {
    for (let i = 0; i < cytNames.length; i++) {
        var htmlObject = "<label class=\"btn btn-outline-primary mt-1 ml-1\"><input type=\"checkbox\" value=" + cytNames[i] + " autocomplete=\"off\"> " + cytNames[i] + " </label>";
        $('#cyt_selection').append(htmlObject);
    }

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

var myDropzone;

Dropzone.options.dropzoneSMF = {
    paramName: 'file',
    url: "http://127.0.0.1:5000/new_csv", // TODO: change url
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

$(document).ready(function () {
    "use strict";

    main();

});