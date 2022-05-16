// Function to retrieve all component data
const getComponents = (() => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3501/api/v1/component/all/",

        success(data) {
           return data;
        }
    });
});

const getBuilds = (() => {

});

// jQuery to control form submission
$(document).ready(function() {
    const SECTION_TITLE = {
        "caseColors": "Case Color",
        "powerDraws": "Power Draw",
        "gpus": "GPU",
        "cpus": "CPU",
        "motherboard": "Motherboard",
        "ram": "RAM",
        "storage": "Storage",
    }

    // Get the select that will house the build IDs and update it with the build IDs from AJAX
    const buildSelect = $("#build-name-select");
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3501/api/v1/build/all/",

        success(builds) {
            builds ? builds.map((build) => {
                buildSelect.append(`<option value="${build._id}">${build.name}</option>`);
            }) : null;
        }
    });

    // Get the div that will house the component selects and update it with the data from AJAX
    const componentSelectDeck = $("#association-select-deck");
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3501/api/v1/component/all/",

        success(components) {
            components ? Object.keys(components).forEach((group) => {
                // Create the initial select for the component group
                componentSelectDeck.append(
                    `<label>${SECTION_TITLE[group]}: </label>`,
                    `<select id="${group}-select"><option value="">Select</option></select>`,
                    '<br />',
                    '<br />'
                )

                // for each component group, append the proper options to the select
                components[group].map((component) => {
                    $("#" + group + "-select").append(`<option value="${component._id}">${component.value}</option>`);
                });
            }) : null;
        }
    });

    // Capture form submission and send data to the server for creating a new build
    $("#create-association").on("submit", (e) => {
        e.preventDefault();
        const build = $("#build-name-select").val();
        const caseColor = {"Case Color": $("#caseColors-select").val()};
        const powerDraw = {"Power Draw": $("#powerDraws-select").val()};
        const gpu = {"GPU": $("#gpus-select").val()};
        const cpu = {"CPU": $("#cpus-select").val()};
        const motherboard = {"Motherboard": $("#motherboard-select").val()};
        const ram = {"RAM": $("#ram-select").val()};
        const storage = {"Storage": $("#storage-select").val()};

        if (build) {
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: `http://localhost:3501/api/v1/build/update/associate-component/${build}`,
                dataType: "JSON",
                data: JSON.stringify([caseColor, powerDraw, gpu, cpu, motherboard, ram, storage]),

                success(data) {
                    // Reset the form after a successful submission
                    alert("Successfully associated components to build!");
                    $("#create-association").trigger("reset");
                }
            });
        } else {
            alert("Please choose a build");
        }
    });
});
