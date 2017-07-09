var serverAddress;

$(document).ready(function () {
    serverAddress = 'http://' + window.location.host;
    ajax_to_create_tree();
    $("#debugbtn").click(debug_btn);
    $("#delete_node_btn").click(delete_node);
    $("#create_node_btn").click(create_node);
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

function create_node() {
    var parent = get_active_node();
    if (!parent)
        return;
    var child = parent.addChild({
        title: "new_folder",
        isFolder: true
    });
    parent.expand(true);
    editNode(child, function () {
        if (!is_correct_name(child)) {
            alert('Folder already exist or name isn`t appropriate');
            child.remove();
            return;
        }
        $.ajax({
            url: serverAddress + '/create_node',
            type: "POST",
            data: {node_name: get_full_path(child)},
            success: function (data, textStatus, jqXHR) {
                child.activate();
            },
            error: function (xhr, status, error) {
                child.remove();
                alert('Failed to create folder');
                error_msg(xhr + ' ' + status + ' ' + ' ' + error);
            }
        });
    });
}

function is_correct_name(node) {
    var title = node.data.title;
    if (!title || !title.trim() || title.length === 0) {
        return false;
    }
    var children = node.parent.getChildren();
    for (var i = 0; i < children.length; i++) {
        if (node.data.key != children[i].data.key &&
            node.data.title == children[i].data.title) {
            return false;
        }
    }
    return true;
}

function editNode(node, afterInput) {
    var prevTitle = node.data.title,
        tree = node.tree;
    // Disable dynatree mouse- and key handling
    tree.$widget.unbind();
    // Replace node with <input>
    $(node.span).html("<input id='editNode' value='" + prevTitle + "'>");
    // Focus <input> and bind keyboard handler
    $("input#editNode")
        .focus()
        .keydown(function (event) {
            switch (event.keyCode || event.which) {
                case 13: // [enter]
                    // simulate blur to accept new value
                    $(this).blur();
                    break;
                case 27: // [esc]
                    // discard changes on [esc]
                    $("input#editNode").val(prevTitle);
                    $(this).blur();
                    break;
            }
        }).blur(function (event) {
        // Accept new value, when user leaves <input>
        var input = $("input#editNode");
        var title = input.val();
        node.setTitle(title);
        input.remove();
        // Re-enable mouse and keyboard handlling
        tree.$widget.bind();
        node.focus();
        afterInput();
    });
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
            if (node.getEventTargetType(event) == "title") {
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
        onKeydown: function (node, event) {
            if (event.which == 113) { //[F2]
                var old_path = get_full_path(node);
                var old_title = node.data.title;
                editNode(node, function () {
                    if (node.data.title == old_title)
                        return;
                    if (!is_correct_name(node)) {
                        alert('Folder already exist');
                        node.setTitle(old_title);
                        return;
                    }
                    var new_path = get_full_path(node);
                    $.ajax({
                        url: serverAddress + '/rename_node',
                        type: "POST",
                        data: {from: old_path, to: new_path},
                        success: function (data, textStatus, jqXHR) {
                        },
                        error: function (xhr, status, error) {
                            node.setTitle(old_title);
                            alert('Failed to rename folder');
                            error_msg(xhr + ' ' + status + ' ' + ' ' + error);
                        }
                    });
                });
                return false;
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
