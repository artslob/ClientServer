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
                        var content = '<tr>';
                        content += '<td>' + node.data.files[i].itemName + '</td>';
                        content += '<td>' + node.data.files[i].lastAccessTime + '</td>';
                        content += '<td>' + node.data.files[i].lastModifiedTime + '</td>';
                        content += '<td>' + node.data.files[i].size + '</td>';
                        content += '</tr>';
                        table.append(content);
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
        dnd: {
            onDragStart: function (node) {
                /** This function MUST be defined to enable dragging for the tree.
                 *  Return false to cancel dragging of node.
                 */
                return true;
            },
            onDragStop: function (node) {
                // This function is optional.
            },
            autoExpandMS: 300,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            onDragEnter: function (node, sourceNode) {
                /** sourceNode may be null for non-dynatree droppables.
                 *  Return false to disallow dropping on node. In this case
                 *  onDragOver and onDragLeave are not called.
                 *  Return 'over', 'before, or 'after' to force a hitMode.
                 *  Return ['before', 'after'] to restrict available hitModes.
                 *  Any other return value will calc the hitMode from the cursor position.
                 */
                return true;
            },
            onDragOver: function (node, sourceNode, hitMode) {
                // Return false to disallow dropping this node.
                // Prevent dropping a parent below it's own child
                if (node.isDescendantOf(sourceNode)) {
                    return false;
                }
                // Prohibit creating childs in non-folders (only sorting allowed)
                if (!node.data.isFolder && hitMode === "over") {
                    return "after";
                }
            },
            onDrop: function (node, sourceNode, hitMode, ui, draggable) {
                //This function MUST be defined to enable dropping of items on the tree.
                var source = get_full_path(sourceNode),
                    target;
                switch (hitMode) {
                    case "before":
                    case "after":
                        target = get_full_path(node.parent) + "\\" + sourceNode.data.title;
                        if (get_full_path(sourceNode.parent) == target){
                            // in same folder, ajax not required
                            sourceNode.move(node, hitMode);
                            return true;
                        }
                        break;
                    case "over":
                        target = get_full_path(node) + "\\" + sourceNode.data.title;
                        break;
                }
                $.ajax({
                    url: serverAddress + '/replace_node',
                    type: "POST",
                    data: {source: source, target: target},
                    success: function (data, textStatus, jqXHR) {
                        sourceNode.move(node, hitMode);
                    },
                    error: function (xhr, status, error) {
                        alert('Failed to replace folder');
                        error_msg(xhr + ' ' + status + ' ' + ' ' + error);
                    }
                });
                // expand the drop target
                sourceNode.expand(true);
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
