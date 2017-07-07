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
    <%--<script src="<c:url value="/resources/static/js/jquery-3.2.1.min.js" />"></script>--%>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="/resources/static/css/bootstrap.min.css">
    <!-- Latest compiled JavaScript -->
    <script src="<c:url value="/resources/static/js/bootstrap.min.js" />"></script>
    <!-- Dynatree -->
    <script type="text/javascript" src='/resources/dynatree/js/jquery.js'></script>
    <script type="text/javascript" src='/resources/dynatree/js/jquery-ui.custom.js'></script>
    <script type="text/javascript" src='/resources/dynatree/js/jquery.cookie.js'></script>
    <script type="text/javascript" src='/resources/dynatree/js/jquery.dynatree.js'></script>
    <link rel='stylesheet' type='text/css' href='/resources/dynatree/css/ui.dynatree.css'>
    <!-- Local dev JS and CSS defined  -->
    <script src="<c:url value="/resources/main/js/home.js" />"></script>
    <link rel="stylesheet" href="<c:url value="/resources/main/css/style.css" />">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-5" id="tree">.col-sm-4</div>
            <div class="col-sm-7">.col-sm-8</div>
        </div>
    </div>

</body>
</html>
