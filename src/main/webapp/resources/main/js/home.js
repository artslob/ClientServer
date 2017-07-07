$(document).ready(function () {
    $("#tree").dynatree({
        persist: true,
        children: [ // Pass an array of nodes.
            {title: "Item 1"},
            {title: "Folder 2", isFolder: true,
                children: [
                    {title: "Sub-item 2.1",
                        children: [
                            {title: "Sub-item 2.1",
                                children: [
                                    {title: "Sub-item 2.1"},
                                    {title: "Sub-item 2.2"}
                                ]
                            },
                            {title: "Sub-item 2.2"}
                        ]
                    },
                    {title: "Sub-item 2.2"}
                ]
            },
            {title: "Item 3"}
        ]
    });
});
