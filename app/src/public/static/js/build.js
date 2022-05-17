const updateBuildData = (() => {
    const TYPE_MAP = {
        "caseColors": "Case Color",
        "powerDraws": "Power Draw",
        "gpus": "GPU",
        "cpus": "CPU",
        "motherboard": "Motherboard",
        "ram": "RAM",
        "storage": "Storage",
    }
    const componentMap = {};

    const buildContainer = $("#build-list");
    buildContainer.empty();

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3501/api/v1/component/all/",

        success(data) {
            data ? Object.keys(data).forEach((key) => {
                componentMap[data[key][0]._id] = TYPE_MAP[key] + ' - ' + data[key][0].value;
            }) : null;

            return componentMap;
        }
    });

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3501/api/v1/build/all/",

        success(data) {
            data.map((buildData) => {
                buildContainer.append("<h4>Build Name</h4>");
                buildData.name != null
                    ? buildContainer.append(`<p>${buildData.name}</p>`)
                    : buildContainer.append('<p>No build name provided</p>');

                buildContainer.append("<h4>Build Description</h4>");
                buildData.description != null
                    ? buildContainer.append(`<p>${buildData.description}</p>`)
                    : buildContainer.append('<p>No build description provided</p>');

                buildContainer.append("<h4>Components</h4>");
                buildData.components
                    ? buildData.components.map((componentData) => {
                        var key = Object.keys(componentData)[0];
                        var value = componentData[key];

                        componentMap[value]
                            ? buildContainer.append(`<p>${componentMap[value]}</p>`)
                            : null;
                    })
                    : buildContainer.append('<p>No components associated</p>');

                // Add a delete button for each available build
                buildContainer.append(
                    `<button name="build-deletion" type="submit" value=${buildData._id}>Delete Build</button>`,
                );
                buildContainer.append('<hr />');
            });
        },
    });
});

// jQuery to control form submission
$(document).ready(function() {
    // Append available build data to the corresponding container
    updateBuildData();

    // Capture form submission and send data to the server for creating a new build
    $("#create-build").on("submit", (e) => {
        e.preventDefault();
        const name = $("#build-name").val();
        const description = $("#build-description").val();

        if (name && description) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:3501/api/v1/build/create/",
                dataType: "JSON",
                data: JSON.stringify({name: name, description: description}),

                success(data) {
                    updateBuildData();
                    $("#create-build").trigger("reset");
                    alert("Build created successfully");
                }
            });
        } else {
            alert("Please fill out all fields");
        }
    });
});

// Capture delete button click and send the appropriate request to the server
$(document).on("click", "button[name='build-deletion']", function() {
    const buildId = $(this).val();

    if (buildId) {
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: `http://localhost:3501/api/v1/build/delete/${buildId}`,

            success(data) {
                updateBuildData();
                alert("Build deleted successfully");
            }
        });
    }
});
