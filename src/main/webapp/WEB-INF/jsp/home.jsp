<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML  PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <title>Home</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <%--
    <!-- jQuery library -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    --%>
    <!-- jQuery library -->
    <script type="text/javascript" src="<c:url value="/resources/static/js/jquery-3.2.1.min.js" />"></script>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/resources/static/css/bootstrap.min.css">
    <!-- Bootstrap JavaScript -->
    <script type="text/javascript" src="<c:url value="/resources/static/js/bootstrap.min.js" />"></script>
    <!-- Dynatree -->
    <script type="text/javascript" src='/resources/dynatree/js/jquery.js'></script>
    <script type="text/javascript" src='/resources/dynatree/js/jquery-ui.custom.js'></script>
    <script type="text/javascript" src='/resources/dynatree/js/jquery.cookie.js'></script>
    <script type="text/javascript" src='/resources/dynatree/js/jquery.dynatree.js'></script>
    <link rel='stylesheet' type='text/css' href='/resources/dynatree/css/ui.dynatree.css'>
    <!-- Local dev JS and CSS defined  -->
    <script type="text/javascript" src="<c:url value="/resources/main/js/home.js" />"></script>
    <link rel="stylesheet" href="<c:url value="/resources/main/css/style.css" />">
</head>
<body>
    <div class="container-fluid">
        <br/>
        <div class="row">
            <div class="col-lg-12">
                <div class="btn-group">
                    <button type="button" class="btn btn-primary">
                        <span class="glyphicon glyphicon-plus"></span> Create
                    </button>
                    <button type="button" class="btn btn-primary">
                        <span class="glyphicon glyphicon-remove"></span> Delete
                    </button>
                </div>
            </div>
        </div>
        <br/>
        <div class="row">
            <div class="col-sm-5" id="tree"></div>

            <div class="col-sm-7">
                <button id="debugbtn">click</button>
                <div id="debugmsg">debug</div>
                <div id="errormsg">error_msg</div>
                <table class="table table-condensed">
                    <thead>
                    <tr>
                        <th>Filename</th>
                    </tr>
                    </thead>
                    <tbody id="filetable">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</body>
</html>
