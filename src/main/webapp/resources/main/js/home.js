var serverAddress;

$(document).ready(function () {
    serverAddress = 'http://' + window.location.host;
    create_tree();
    $("#debugbtn").click(debug_btn);
    //debug_btn();
});

function isFile() {

}

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
        //url: 'http://gturnquist-quoters.cfapps.io/api/random',
        url: serverAddress + '/filetree',
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            var tree = JSON.parse(data);
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
