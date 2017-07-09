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
        debug_msg(child.data.title);
        var children = parent.getChildren();
        for (var i = 0; i < children.length; i++){
            if(child.data.key != children[i].data.key &&
                child.data.title == children[i].data.title){
                //TODO: create error panel
                alert('This folder already exists');
                child.remove();
                return;
            }
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

function editNode(node, afterInput){
    var prevTitle = node.data.title,
        tree = node.tree;
    // Disable dynatree mouse- and key handling
    tree.$widget.unbind();
    // Replace node with <input>
    $(node.span).html("<input id='editNode' value='" + prevTitle + "'>");
    // Focus <input> and bind keyboard handler
    $("input#editNode")
        .focus()
        .keydown(function(event){
            switch( event.keyCode || event.which ) {
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
        }).blur(function(event){
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
