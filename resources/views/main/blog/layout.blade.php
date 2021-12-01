<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Блог - Redjee Trips</title>
    <link rel="stylesheet" type="text/css" href="/css/mainpage/main.css"/>
    <link rel="stylesheet" href="/css/front.css">
    <link rel="icon" type="image/png" href="/favicon.ico">
</head>

<body class="container-fluid">
<div class="wrapppire">
    <nav class="navbar main-menu navbar-default">
        <div class="container">
            <div class="menu-content">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    {{--                Логотип--}}
                    {{--                <a class="navbar-brand" href="/blog"><img src="" alt=""></a>--}}
                </div>


                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                    <ul class="nav navbar-nav text-uppercase">
                        <li><a href="/blog">Главная</a></li>
                        <li><a href="#">О нас </a></li>
                        <li><a href="#">Контакты</a></li>
                    </ul>

                    <ul class="nav navbar-nav text-uppercase pull-right">
                        @if(Auth::check())
                            @if(Auth::user()->id == 1)
                                <li><a href="/admin">Администрирование</a></li>
                            @endif
                            <li id="addPost"><a href="/blog/posts/create">Добавить пост</a></li>
                            <li><a href="/blog/profile">Мой профиль</a></li>
                            <li><a href="/auth/logout">Выход</a></li>
                        @else
                            <li><a href="/auth/register">Регистрация</a></li>
                            <li><a href="/auth/login">Вход</a></li>
                        @endif
                    </ul>

                </div>
            </div>
        </div>

    </nav>
    <div class="container">
        <div class="row">
            <div class="col-md-12" style="margin-bottom: -50px;">
                @include('admin.errors')
            </div>
        </div>
    </div>
@yield('content')
@include('insta')
    <div style="margin-bottom: 143px">
        @include('footer')
    </div>
    <script src="/js/front.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
    <script src="/plugins/summernote/lang/summernote-ru-RU.js"></script>
    <script>
        $(document).ready(function () {
            $('#summernote').summernote({
                lang: 'ru-RU' // default: 'en-US'
            });
        });
        $('#summernote').summernote({
            placeholder: 'Ваш пост',
            tabsize: 2,
            height: 720,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview']]
            ]
        });
    </script>
</div>
</body>
</html>
