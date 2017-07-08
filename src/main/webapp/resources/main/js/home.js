var serverAddress;

$(document).ready(function () {
    serverAddress = 'http://' + window.location.host;
    ajax_to_create_tree();
    $("#debugbtn").click(debug_btn);
    $("#delete_node_btn").click(delete_node);
    debug_btn();
});

function get_active_node() {
    return $("#tree").dynatree("getTree").getActiveNode();
}

function get_full_path(el) {
    var res = el.data.title;
    el.visitParents(function (node) {
        if (node.data.title == null)
            return false;
        res = node.data.title + "\\" + res;
    }, false);
    return res;
}

function delete_node() {
    var selected = get_active_node();
    var path = get_full_path(selected);
    $.ajax({
        url: serverAddress + '/delete_node',
        type: "POST",
        data: {node_name: path},
        success: function (data, textStatus, jqXHR) {
            get_active_node().remove();
        },
        error: function (xhr, status, error) {
            error_msg(xhr + ' ' + status + ' ' + ' ' + error);
        }
    });
}

function create_tree(tree_structure) {
    $("#tree").dynatree({
        persist: true,
        autoCollapse: false,
        onClick: function (node, event) {
            if(node.getEventTargetType(event) == "title"){
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
        children: tree_structure
    });
}

function ajax_to_create_tree() {
    $.ajax({
        url: serverAddress + '/filetree',
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            create_tree(data)
        },
        error: function (xhr, status, error) {
            error_msg(xhr + ' ' + status + ' ' + ' ' + error);
        }
    });
}

function debug_btn() {

}

function debug_msg(e) {
    $("#debugmsg").text(e)
}

function error_msg(e) {
    $("#errormsg").text(e)
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
