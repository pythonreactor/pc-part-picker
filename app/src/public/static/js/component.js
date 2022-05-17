const updateComponentData = (() => {
    const componentContainer = $("#component-list");
    componentContainer.empty();

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:3501/api/v1/component/all/",

        success(data) {
            componentContainer.append("<h4>Case Colors</h4>");
            data.caseColors.length > 0 ? data.caseColors.map((colors) => {
                componentContainer.append(
                    `<span>${colors.value}</span>`,
                    ` <button name="component-deletion" type="submit" value=${colors._id}>Delete Component</button>`,
                    '<br />'
                );
            }) : componentContainer.append('<p>No Case Colors available</p>');

            componentContainer.append("<h4>Power Levels</h4>");
            data.powerDraws.length > 0 ? data.powerDraws.map((power) => {
                componentContainer.append(
                    `<span>${power.value}</span>`,
                    ` <button name="component-deletion" type="submit" value=${power._id}>Delete Component</button>`,
                    '<br />'
                );
            }) : componentContainer.append('<p>No Power Levels available</p>');

            componentContainer.append("<h4>GPUs</h4>");
            data.gpus.length > 0 ? data.gpus.map((gpu) => {
                componentContainer.append(
                    `<span>${gpu.value}</span>`,
                    ` <button name="component-deletion" type="submit" value=${gpu._id}>Delete Component</button>`,
                    '<br />'
                );
            }) : componentContainer.append('<p>No GPUs available</p>');

            componentContainer.append("<h4>CPUs</h4>");
            data.cpus.length > 0 ? data.cpus.map((cpu) => {
                componentContainer.append(
                    `<span>${cpu.value}</span>`,
                    ` <button name="component-deletion" type="submit" value=${cpu._id}>Delete Component</button>`,
                    '<br />'
                );
            }) : componentContainer.append('<p>No CPUs available</p>');

            componentContainer.append("<h4>Motherboards</h4>");
            data.motherboard.length > 0 ? data.motherboard.map((board) => {
                componentContainer.append(
                    `<span>${board.value}</span>`,
                    ` <button name="component-deletion" type="submit" value=${board._id}>Delete Component</button>`,
                    '<br />'
                );
            }) : componentContainer.append('<p>No Motherboards available</p>');

            componentContainer.append("<h4>RAM Sizes</h4>");
            data.ram.length > 0 ? data.ram.map((ram) => {
                componentContainer.append(
                    `<span>${ram.value}</span>`,
                    ` <button name="component-deletion" type="submit" value=${ram._id}>Delete Component</button>`,
                    '<br />'
                );
            }) : componentContainer.append('<p>No RAM sizes available</p>');

            componentContainer.append("<h4>Storage Sizes</h4>");
            data.storage.length > 0 ? data.storage.map((size) => {
                componentContainer.append(
                    `<span>${size.value}</span>`,
                    ` <button name="component-deletion" type="submit" value=${size._id}>Delete Component</button>`,
                    '<br />'
                );
            }) : componentContainer.append('<p>No Storage sizes available</p>');
        },
    });
});

$(document).ready(function() {
    // Append available component data to the corresponding container
    updateComponentData();

    // Capture form submission and send data to the server for creating a new component
    $("#create-component").on("submit", (e) => {
       e.preventDefault();
       const name = $("#component-name").val();
       const value = $("#component-value").val();

       if (name && value) {
           $.ajax({
               type: "POST",
               contentType: "application/json",
               url: "http://localhost:3501/api/v1/component/create/",
               dataType: "JSON",
               data: JSON.stringify({name: name, value: value}),

               success(data) {
                   updateComponentData();
                   $("#create-component").trigger("reset");
                   alert("Component created successfully");
               }
           });
       } else {
           alert("Please fill out all fields");
       }
    });
});

// Capture delete button click and send the appropriate request to the server
$(document).on("click", "button[name='component-deletion']", function() {
    const componentId = $(this).val();

    if (componentId) {
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: `http://localhost:3501/api/v1/component/delete/${componentId}`,

            success(data) {
                updateComponentData();
                alert("Component deleted successfully");
            }
        });
    }
});
