<%@ page contentType="text/html;charset=CP1251" pageEncoding="CP1251" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML  PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <title>Домашняя страница</title>
    <meta http-equiv="Content-Type" content="text/html; charset=CP1251">
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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/static/css/bootstrap.min.css">
    <!-- Bootstrap JavaScript -->
    <script type="text/javascript" src="<c:url value="/resources/static/js/bootstrap.min.js" />"></script>
    <!-- Dynatree -->
    <script type="text/javascript" src='${pageContext.request.contextPath}/resources/dynatree/js/jquery.js'></script>
    <script type="text/javascript" src='${pageContext.request.contextPath}/resources/dynatree/js/jquery-ui.custom.js'></script>
    <script type="text/javascript" src='${pageContext.request.contextPath}/resources/dynatree/js/jquery.cookie.js'></script>
    <script type="text/javascript" src='${pageContext.request.contextPath}/resources/dynatree/js/jquery.dynatree.js'></script>
    <link rel='stylesheet' type='text/css' href='${pageContext.request.contextPath}/resources/dynatree/css/ui.dynatree.css'>
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
                    <button type="button" class="btn btn-primary" id="create_node_btn">
                        <span class="glyphicon glyphicon-plus"></span> Create
                    </button>
                    <button type="button" class="btn btn-primary" id="delete_node_btn">
                        <span class="glyphicon glyphicon-remove"></span> Delete
                    </button>
                </div>
                <i class="glyphicon glyphicon-question-sign" style="margin-left: 30px"
                   id="tooltip" title="To rename folder:&#013;1. Click folder name.&#013;2. Press F2."></i>
            </div>
        </div>
        <br/>
        <div class="row">
            <div class="col-sm-5" id="tree"></div>
            <div class="col-sm-7">
                <table class="table table-condensed">
                    <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Last Access Time</th>
                        <th>Last Modified Time</th>
                        <th>Size</th>
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
