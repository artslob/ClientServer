var serverAddress;

$(document).ready(function () {
    serverAddress = 'http://' + window.location.host;
    create_tree();
    $("#debugbtn").click(debug_btn);
    debug_btn();
});

var selectedNode;

function create_tree() {
    $.ajax({
        url: serverAddress + '/filetree',
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            $("#tree").dynatree({
                persist: true,
                autoCollapse: false,
                onClick: function (node, event) {
                    if(node.getEventTargetType(event) == "title"){
                        selectedNode = node;
                        node.expand(false);
                        var table = $("#filetable");
                        table.find("tr").remove();
                        for (var i in node.data.files) {
                            if (node.data.files.hasOwnProperty(i)) {
                                table.append('<tr><td>' + node.data.files[i].itemName + '</td></tr>');
                            }
                        }
                    }
                },
                onSelect: function (flag, node) {
                    selectedNode = node;
                },
                children: data
            });
        },
        error: function (xhr, status, error) {
            error_msg(xhr + ' ' + status + ' ' + ' ' + error);
        }
    });
}

function debug_btn() {
    $.ajax({
        url: serverAddress + '/delete_node',
        type: "POST",
        data: {node_name: "hello"},
        success: function (data, textStatus, jqXHR) {

            var tree = $("#tree").dynatree("getTree");
            var selected = tree.getActiveNode();
            var res = selected.data.title;
            selected.visitParents(function (node) {
                if (node.data.title == null)
                    return false;
                res = node.data.title + "\\" + res;
            }, false);
            debug_msg(res)
        },
        error: function (xhr, status, error) {
            error_msg(xhr + ' ' + status + ' ' + ' ' + error);
        }
    });
}

function debug_msg(e) {
    var msg = $("#debugmsg");
    msg.empty();
    msg.append(e);
}

function error_msg(e) {
    var msg = $("#errormsg");
    msg.empty();
    msg.append(e);
}

function showProps(obj, objName) {
    var result = "";
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            result += objName + "." + i + " = " + obj[i].itemName + "\n";
        }
    }
    return result;
}
