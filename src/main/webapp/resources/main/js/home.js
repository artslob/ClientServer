var serverAddress;

$(document).ready(function () {
    serverAddress = 'http://' + window.location.host;
    create_tree();
    $("#debugbtn").click(debug_btn);
    //debug_btn();
});

function create_tree() {
    /*$.ajax({
        url: serverAddress + '/filetree',
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            tree = JSON.parse(data)
        },
        error: function (xhr, status, error) {
            error_msg(xhr + ' ' + status + ' ' + ' ' + error);
        }
    });*/
    /*var str = '[{"title": "Item 1"}]';
    var tree = JSON.parse(str);
    //alert(tree.title);
    $("#tree").dynatree({
        persist: true,
        children: tree

    });*/
    $.ajax({
        //url: 'http://gturnquist-quoters.cfapps.io/api/random',
        url: serverAddress + '/filetree',
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            //alert(JSON.parse(data));
            alert(data);
            var tree = JSON.parse(data);
            //alert(tree.title);
            $("#tree").dynatree({
                persist: true,
                children: tree

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
            //alert(JSON.parse(data));
            alert(data);
            var str = '[{"title": "Item 1"}]';
            debug_msg(data)
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
