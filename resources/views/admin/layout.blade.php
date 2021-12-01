<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Tricks Of Trips - Admin Panel</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link type="text/css" rel="stylesheet" href="/css/admin.css">
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
    <header class="main-header">
        <a href="../../index.html" class="logo">
            <span class="logo-mini"><b>A</b>P</span>
            <span class="logo-lg"><b>Admin</b>Panel</span>
        </a>
        <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="{{Auth::user()->getImage()}}" class="user-image" alt="Аватар">
                            <span class="hidden-xs">{{Auth::user()->login}}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="user-header">
                                <img src="{{Auth::user()->getImage()}}" class="img-circle" alt="Аватар">
                                <p>
                                    {{Auth::user()->login}}
                                    <small>Tricks Of Trips. 2021.</small>
                                </p>
                            </li>
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="/blog/profile" class="btn btn-default btn-flat">Профиль</a>
                                </div>
                                <div class="pull-right">
                                    <a href="/auth/logout" class="btn btn-default btn-flat">Выход</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <aside class="main-sidebar">
        <section class="sidebar">
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="{{Auth::user()->getImage()}}" class="img-circle avatar" alt="Аватар"
                         style="object-fit: cover; width: 45px; height: 45px;">
                </div>
                <div class="pull-left info">
                    <p>{{Auth::user()->login}}</p>
                    <a href="#"><i class="fa fa-circle text-success"></i>Online</a>
                </div>
            </div>
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Поиск...">
                    <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
                </div>
            </form>
            @include('admin._sidebar')
        </section>
    </aside>
    @yield('content')
    <footer class="main-footer text-center">
        <div class="pull-right hidden-xs">
            <b>Версия</b> 0.1
        </div>
        <strong>Copyright &copy; 2021 <a href="{{route('posts.index')}}">Tricks Of Trips</a>.</strong> Все права
        защищены.
    </footer>
    <aside class="control-sidebar control-sidebar-dark">
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
            <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
            <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
        </ul>
    </aside>
    <div class="control-sidebar-bg"></div>
</div>
<script src="/js/admin.js"></script>
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
        height: 120,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });
</script>
</body>
</html>
